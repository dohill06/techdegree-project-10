import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Consumer } from './Context';

const Header = (props) => {
    return (
        <Consumer>
            {({ actions, user }) => (
                <>
                <div className="header">
                    <div className="bounds">
                        <h1 className="header--logo">Courses</h1>
                        <nav>
                        {user.id ? (
                            <>
                            <span>{`Welcome ${user.firstName} ${user.lastName}`}</span>
                            <Link className="signin" to='/signout' onClick={actions.signOut}>Sign Out</Link>
                            </>
                        ) : (
                            <>
                            <Link className="signup" to={{pathname: '/signup', state: { from: props.location }}}>Sign Up</Link>
                            <Link className="signin" to={{pathname: '/signin', state: { from: props.location }}}>Sign In</Link>
                            </>
                        )}
                        </nav>
                    </div>
                </div>
                <hr/>
                </>
            )}
        </Consumer>
    )
}

export default withRouter(Header);