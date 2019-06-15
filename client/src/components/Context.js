import React, { Component } from "react";
import axios from 'axios';

export const Context = React.createContext();

export class Provider extends Component {
    state = {
        user: {}
    };

    componentDidMount() {
        this.checkStorage();
    }

    checkStorage = () => {
        const storage = localStorage.getItem('user')
        if (storage !== null) {
            this.setState({
                user: JSON.parse(localStorage.getItem('user'))
            });
        } 
    };

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
            console.log(this.state)
            console.log(res.status)
            localStorage.setItem('user', JSON.stringify({
                ...res.data,
                password
            }))
        })
    };

    signOut = () => {
        this.setState({
            user: {}
        });
        localStorage.clear();
    };

    render() {
        return (
            <Context.Provider value={{
                user: this.state.user,
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