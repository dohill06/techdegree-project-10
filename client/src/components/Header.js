import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';

const Header = () => {
    return (
        <Consumer>
            {({ user }) => (
                <>
                <div className="header">
                    <div className="bounds">
                        <h1 className="header--logo">Courses</h1>
                        <nav>
                        {user.id ? (
                            <>
                            <span>{`Welcome ${user.firstName} ${user.lastName}`}</span>
                            <Link className="signin" to='/signout'>Sign Out</Link>
                            </>
                        ) : (
                            <>
                            <Link className="signup" to='/signup'>Sign Up</Link>
                            <Link className="signin" to='/signin'>Sign In</Link>
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

export default Header;