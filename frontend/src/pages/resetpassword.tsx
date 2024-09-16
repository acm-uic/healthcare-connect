import React from 'react';

const ResetPassword: React.FC = () => {

    const handleRefresh = () => {
        // Perform any actions like sending an email here
        window.location.reload(); // Refresh the page
    }

    return (
        <>
            <h1>
                Reset Password
            </h1>
            <p>Password
            </p>
            <input>
            </input>
            <p>Confirm Password
            </p>
            <input>
            </input>
            <button onClick = {handleRefresh}>
                Reset
            </button>
        
        </>
    );
}

export default ResetPassword;