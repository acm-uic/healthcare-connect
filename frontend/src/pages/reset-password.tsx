'use client'
import React from 'react';

const ResetPassword: React.FC = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form className="flex flex-col items-start p-4 max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h2 className="mb-4 text-lg">Reset Password</h2>
            <input
                type="password"
                placeholder="Password"
                className="mb-2 p-2 border border-gray-300 rounded"
            />
            <input
                type="password"
                placeholder="Confirm Password"
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Reset Password
            </button>
        </form>
    );
}

export default ResetPassword;