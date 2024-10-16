'use client'
import React from 'react';

import { useState } from 'react'

const SignUp: React.FC = () => {
    interface Signup {
        name: string,
        email: string,
        password: string,
        confirm_password: string,
        role: string
    }

    const [signup, setSignup] = useState<Signup | null>()
    const [error, setError] = useState<string| null>()

    const handleSignup = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignup((prevFormData) => {

            const updatedFormData = prevFormData ?? {
                name: "",
                email: "",
                password: "",
                confirm_password: "",
                role: "user"
            }

            // console.log(event.target.value)
            return {
                ...updatedFormData,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if signup is not null and the passwords are not empty
        if (signup && signup.password && signup.confirm_password) {
            if (signup.password !== signup.confirm_password) {
                setError("Passwords do not match");
                return
            } else {
                // Proceed with the rest of the signup logic
            }
        } else {
            setError("Password fields cannot be empty")
            return
        }

        const apiURI = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`
        try {
            const res = await fetch(apiURI, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signup)
            })

            const json = await res.json()

            if (!res.ok) {
                setError(json.message)
            }

            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(json))
                console.log("Worked")
            }
        } catch (err) {
            console.error(err)
        }

    }

    return (
        <form className="flex flex-col items-start p-4 max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h1 className="mb-4 text-2xl ">Sign Up</h1>
            <input
                type="text"
                placeholder="Name"
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                onChange={handleSignup}
                name="name"
            />
            <input
                type="email"
                placeholder="Email"
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                onChange={handleSignup}
                name="email"
            />
            <input
                type="password"
                placeholder="Password"
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                onChange={handleSignup}
                name="password"
            />
            <input
                type="password"
                placeholder="Confirm Password"
                className="mb-4 p-2 border border-gray-300 rounded w-full"
                onChange={handleSignup}
                name="confirm_password"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                Sign Up
            </button>

            <div className="mt-8 text-red-500">
                {error && <p>{error}</p>}
            </div>
        </form>
    );

}

export default SignUp;
