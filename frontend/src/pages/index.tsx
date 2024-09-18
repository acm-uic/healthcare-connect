'use client'
import React from 'react';
import Link from "next/link";

const Home: React.FC = () => {

    return (
        <>
            <h1 className="text-2xl font-semibold text-center">Home Page</h1>
            <div className="flex flex-row items-center mt-4 justify-center">
              <Link href="/signin">
                  <div className="flex justify-center">
                      <button className="bg-black text-white p-2 rounded m-4">Sign In</button>
                  </div>
              </Link>
              <Link href="/signup">
                  <div className="flex justify-center">
                      <button className="bg-black text-white p-2 rounded m-4">Sign Up</button>
                  </div>
              </Link>
              <Link href="/reset-password">
                  <div className="flex justify-center">
                      <button className="bg-black text-white p-2 rounded m-4">Reset Password</button>
                  </div>
              </Link>
              <Link href="/forgot-password">
                  <div className="flex justify-center">
                      <button className="bg-black text-white p-2 rounded m-4">Forgot Password</button>
                  </div>
              </Link>
              <Link href="/users">
                  <div className="flex justify-center">
                      <button className="bg-black text-white p-2 rounded m-4">Users</button>
                  </div>
              </Link>
            </div>
        </>
    );
}

export default Home;