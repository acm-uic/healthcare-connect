'use client'

import { useState, useEffect } from 'react';

const SignIn: React.FC = () => {
    interface Signin {
        email: string,
        password: string
    }

    const [signin, setSignin] = useState<Signin | null>(null)
    const [error, setError] = useState<Error | null>(null)

    const handleSignin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignin((prevFormData) => {
            const updatedFormData = prevFormData ?? { email: "", password: "" }

            return {
                ...updatedFormData,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const apiURI = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`

        //console.log(signin)


        try {
            const res = await fetch(apiURI, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signin)
            })

            const json = await res.json()

            if (!res.ok) {
                setError(json.message)
            }

            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(json))
            }
        } catch (err) {
            console.log(err)
            setError()
        }


    }

    return (
        <form className="flex flex-col items-start p-4 max-w-sm mx-auto" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                className="mb-2 p-2 border border-gray-300 rounded"
                onChange={handleSignin}
                name="email"
            />
            <input
                type="password"
                placeholder="Password"
                className="mb-4 p-2 border border-gray-300 rounded"
                onChange={handleSignin}
                name="password"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Sign In
            </button>

            <div>
                {error && <p>ERROR: {error}</p>}
            </div>
        </form>
    );
}

export default SignIn;
