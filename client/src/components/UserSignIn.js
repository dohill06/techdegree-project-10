import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserSignIn extends Component {


    onChange = e => {
        console.log(e.target.value, e.target.name);
    }

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form>
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
        )
    };
}

export default UserSignIn;