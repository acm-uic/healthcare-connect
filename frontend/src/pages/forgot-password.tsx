'use client'
import React from 'react';

const ForgotPassword: React.FC = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <h2>Forgot Password</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Email</label>
                                <input type='email' className='form-control' required />
                            </div>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;