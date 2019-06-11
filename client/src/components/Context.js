import React, { Component } from "react";
import axios from 'axios';

export const Context = React.createContext();

export class Provider extends Component {
    state = {
        user: {}
    };

    signIn = (emailAddress, password) => {
        axios.get('http://localhost:5000/api/users', {
            auth: {
                username: emailAddress,
                password
            }
        }).then(res => {
            console.log(res)
            console.log(res.status)
        })
    };

    render() {
        return (
            <Context.Provider value={{
                user: this.state.user,
                actions: {
                    signIn: this.signIn
                }
            }}>
            {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;