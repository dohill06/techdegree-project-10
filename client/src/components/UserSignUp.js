import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Consumer } from './Context';
import axios from 'axios';
import ValidationErrors from './ValidationErrors'

class UserSignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        validationErrors: []
    };
    
// method to sign new user up and then sign in
    signUp = (e, signIn) => {
        e.preventDefault();
        const { firstName,
                lastName,
                emailAddress,
                password,
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
            this.setState({
                validationErrors: err.response.data.message
            })
        });
    };

// method to take in user input
    onChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };
    
// render with conditional validation error handling
    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    {this.state.validationErrors.length === 0 ?
                        ('') :
                    (<ValidationErrors errors={this.state.validationErrors} />)
                    }
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
                                {this.state.password === this.state.confirmPassword ? 
                                (<>
                                    <button className="button" type="submit">Sign Up</button>
                                    <Link className="button button-secondary" to='/'>Cancel</Link>
                                </>)
                                    :
                                (<>                                     
                                    <Link className="button button-secondary" to='/'>Cancel</Link>
                                    <span><b>Confirm Password</b></span>
                                </>)
                                }
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