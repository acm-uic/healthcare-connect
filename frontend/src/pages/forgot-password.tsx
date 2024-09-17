'use client'
import React from 'react';

const ForgotPassword: React.FC = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form className="flex flex-col items-start p-4 max-w-sm mx-auto" onSubmit={handleSubmit}>
          <h2 className='mb-4 text-lg'>Forgot Password</h2>
          <input type="email" placeholder="Email" className="mb-4 p-2 border border-gray-300 rounded w-full" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Submit</button>
        </form>
    );
}

export default ForgotPassword;