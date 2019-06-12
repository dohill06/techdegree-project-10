import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { Consumer } from './Context';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Consumer>
        {({ user }) => (
            <Route
                {...rest}
                render={props =>
                    user.id ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/signin',
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        )}
    </Consumer>
)

export default PrivateRoute;