'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react';

const SignIn: React.FC = () => {
    interface Signin {
        email: string,
        password: string
    }
    const [signin, setSignin] = useState<Signin | null>(null)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

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
                const access_token = json.access_token
                localStorage.setItem('access_token', access_token)
            }
        } catch (err) {
            console.error(err)
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error has occurred");
            }
        }
        router.push("/")
    }

    return (
        <form className="flex flex-col items-start p-4 max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h1 className="mb-4 text-2xl ">Sign In</h1>
            <input
                type="email"
                placeholder="Email"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                onChange={handleSignin}
                name="email"
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                onChange={handleSignin}
                name="password"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded ">
                Sign In
            </button>

            <div className="mt-8 text-red-500">
                {error && <p>{error}</p>}
            </div>
        </form>
    );
}

export default SignIn;
