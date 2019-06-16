import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Consumer } from './Context';
import ValidationErrors from './ValidationErrors'

class UserSignIn extends Component {

    state = {
        emailAddress: '',
        password: ''
    };

// method to take in user input
    onChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

// method to submit form
    onSubmit = (e, signIn) => {
        const { emailAddress, password } = this.state;
        e.preventDefault();
        signIn(emailAddress, password);
    };

// render with conditional validation error handling
    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        return (
            <Consumer>
                {({ actions, user, validationErrors }) => 
                    user.id ? (
                        <Redirect to={from} />
                    ) : (                    
                        <div className="bounds">
                            <div className="grid-33 centered signin">
                                <h1>Sign In</h1>
                                {validationErrors.length === 0 ?
                                    ('') :
                                (<ValidationErrors errors={validationErrors} />)
                                }
                                <div>
                                    <form onSubmit={e => {this.onSubmit(e, actions.signIn)}}>
                                        <div>
                                            <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" onChange={this.onChange} />
                                        </div>
                                        <div>
                                            <input id="password" name="password" type="password" placeholder="Password" onChange={this.onChange} />
                                        </div>
                                        <div className="grid-100 pad-bottom">
                                            <button className="button" type="submit">Sign In</button>
                                            <Link className="button button-secondary" to='/'>Cancel</Link>
                                        </div>
                                    </form> 
                                </div>
                                <p>&nbsp;</p>
                                <p>Don't have a user account? <Link to='/signup'>Click here</Link> to sign up!</p>
                            </div>
                        </div>
                )}
            </Consumer>
        )
    };
}

export default UserSignIn;