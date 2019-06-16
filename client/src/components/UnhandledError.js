import React from 'react';
import { Link } from 'react-router-dom';

const UnhandledError = () => {
    return (
        <div className='bounds'>
            <h1>500 Internal Server Error</h1>
            <h2>There seems to be a problem</h2>
            <p>&nbsp;</p>
            <Link className="button button-secondary" to='/'>Return to List</Link>
        </div>
    )
}

export default UnhandledError;