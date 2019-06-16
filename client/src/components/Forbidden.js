import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
    return (
        <div className='bounds'>
            <h1>Forbidden</h1>
            <h2>Only the course owner can update their course</h2>
            <p>&nbsp;</p>
            <Link className="button button-secondary" to='/'>Return to List</Link>
        </div>
    )
}

export default Forbidden;