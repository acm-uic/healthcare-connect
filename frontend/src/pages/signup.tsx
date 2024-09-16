import React from 'react';

const handleRefresh = () => {
    // Perform any actions like sending an email here
    window.location.reload(); // Refresh the page
}
const SignUp: React.FC = () => {
    return (
        <>
            <h1>Sign Up</h1>
            <p>Name</p>
            <input>
            </input>
            <p>Email</p>
            <input>
            </input>
            <p>Password</p>
            <input>
            </input>
            <p></p> 
            <button onClick = {handleRefresh}>
                Sign Up
            </button>
        </>
    );
}

export default SignUp;