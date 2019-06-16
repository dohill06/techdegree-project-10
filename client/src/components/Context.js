import React, { Component } from "react";
import axios from 'axios';

export const Context = React.createContext();

export class Provider extends Component {

    state = {
        user: {},
        validationErrors: []
    };

// fire off methods at mount
    componentDidMount() {
        this.checkStorage();
    }

// check to see if localStorage contains anything and if it does update state with contents
    checkStorage = () => {
        const storage = localStorage.getItem('user')
        if (storage !== null) {
            this.setState({
                user: JSON.parse(localStorage.getItem('user'))
            });
        } 
    };

// method to sign in user and put in localStorage
    signIn = (emailAddress, password) => {
        axios.get('http://localhost:5000/api/users', {
            auth: {
                username: emailAddress,
                password
            }
        }).then(res => {
            this.setState({
                user: {
                    ...res.data,
                    password
                }
            });

            localStorage.setItem('user', JSON.stringify({
                ...res.data,
                password
            }))
        }).catch(err => {
            this.setState({
                validationErrors: err.response.data.message
            })
        });
    };

// method to sign out user and remove from localStorage
    signOut = () => {
        this.setState({
            user: {}
        });
        localStorage.clear();
    };

    render() {
        const { user, validationErrors } = this.state;
        return (
            <Context.Provider value={{
                user: user,
                validationErrors: validationErrors,
                actions: {
                    signIn: this.signIn,
                    signOut: this.signOut
                }
            }}>
            {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;