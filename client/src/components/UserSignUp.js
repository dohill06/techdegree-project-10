import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Consumer } from './Context';
import axios from 'axios';

class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: ''
    }

    signUp = (e, signIn) => {
        e.preventDefault();
        const { firstName,
                lastName,
                emailAddress,
                password 
        } = this.state;
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/users',
            data: {
                firstName,
                lastName,
                emailAddress,
                password
            }
        }).then(() => {
            signIn(emailAddress, password);
        }).then(() => {
            this.props.history.push('/');
        }).catch(err => {
            console.log(err.response);
        });
    }

    onChange = e => {
    const { name, value } = e.target;
    this.setState({
        [name]: value
    });
    console.log(name, value);
    };

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <Consumer>
                        {({ actions }) => (
                            <form onSubmit={e => this.signUp(e, actions.signIn)}>
                                <div>
                                    <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.onChange}/>
                                </div>
                                <div>
                                    <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.onChange}/>
                                </div>
                                <div>
                                    <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.onChange}/>
                                </div>
                                <div>
                                    <input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.onChange}/>
                                </div>
                                <div>
                                    <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.onChange}/>
                                </div>
                                <div className="grid-100 pad-bottom">
                                    <button className="button" type="submit">Sign Up</button>
                                    <Link className="button button-secondary" to='/'>Cancel</Link>
                                </div>
                            </form>
                        )}
                        </Consumer>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to='/signin'>Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    };
}

export default UserSignUp;