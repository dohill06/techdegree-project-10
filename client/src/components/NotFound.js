import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='bounds'>
            <h1>404 Not Found</h1>
            <h2>The page you are looking for could not be found</h2>
            <p>&nbsp;</p>
            <Link className="button button-secondary" to='/'>Return to List</Link>
        </div>
    )
}

export default NotFound;