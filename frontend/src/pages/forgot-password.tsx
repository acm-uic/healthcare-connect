'use client'
import { useState } from 'react';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
    interface Submit {
        text: string
    }

    const [text, setEmail] = useState<Submit | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [sentReq, setReq] = useState<boolean>(false)

    const handleSignin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({ text: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // check that email exists in input
        if (!text?.text) {
            setError("An email is needed!")
            return
        }

        const apiURI = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`;
        await axios.post(apiURI,
            //send email as JSON
            {
                email: text?.text
            }
        ).then((res) => {
            // upon success, change the text
            if (res.status == 200) {
                setReq(true)
            }
        }).catch((err) => {
            // show error upon getting one
            setError(err.response.data.message);
        });
    }

    return (
        <form className="flex flex-col items-start p-4 max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h2 className='mb-4 text-lg'>{!sentReq ? "Forgot Password" : "Forgot Password request sent!"}</h2>
            {/* main piece changes! */}
            {!sentReq ? (
                <div className='w-[-webkit-fill-available]'>
                    <input type="email" placeholder="Email"
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                        onChange={handleSignin}
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Submit</button>
                    <div className="mt-2 text-red-500 w-[-webkit-fill-available]">
                        {error && <p className='break-words'>{error}</p>}
                    </div>
                </div>) :
                <div>
                    <p className='mt-[-0.5rem] font-light'>Check your email to reset your password for further instructions.</p>
                </div>
            }
        </form>
    );
}

export default ForgotPassword;