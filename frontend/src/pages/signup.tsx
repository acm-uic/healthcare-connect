'use client'
import React from 'react';

const SignUp: React.FC = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    
    return  (
        <form className="flex flex-col items-start p-4 max-w-sm mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Sign Up
          </button>
        </form>
    );

}

export default SignUp;