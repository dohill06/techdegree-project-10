import React from 'react';

const ValidationErrors = props => {
    let vals = props.errors;
    let errs = vals.split(',');

    return (
        <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
                <ul>
                    {errs.map((err, index) =>
                        <li key={index}>{err}</li>
                    )}    
                </ul>
            </div>
        </div>
    )
}

export default ValidationErrors;