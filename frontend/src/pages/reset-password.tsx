'use client'
import { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const ResetPassword: React.FC = () => {
    const searchParams = useSearchParams()

    const token = searchParams.get('token')

    console.log(token)

    // URL -> `/dashboard?search=my-project`
    // `search` -> 'my-project'


    interface Submit {
        text: string
    }

    const [pwdToCheck, setRealPWD] = useState<Submit | null>(null);
    const [confirmedPWD, setConfPWD] = useState<Submit | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [sentReq, setReq] = useState<boolean>(false)

    const handleUpper = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRealPWD({ text: e.target.value })
    }

    const handleLower = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfPWD({ text: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // check that pwd exists in inputs
        if (!pwdToCheck?.text && !confirmedPWD?.text) {
            setError("A password is needed!");
            return
        }

        if (pwdToCheck?.text !== confirmedPWD?.text) {
            setError("Passwords do not match!");
            return
        }

        if (!token) {
            setError("You do not have a token! Fill out the forgot password form to get one.")
            return
        }

        const apiURI = `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`;
        await axios.post(apiURI,
            //send email as JSON
            {
                password: pwdToCheck?.text,
                token: token
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
            <h2 className="mb-4 text-lg">Reset Password</h2>
            {!sentReq ? (
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                        onChange={handleUpper}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                        onChange={handleLower}
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Reset Password
                    </button>
                    <div className="mt-2 text-red-500 w-[-webkit-fill-available]">
                        {error && <p className='break-words'>{error}</p>}
                    </div>
                </div>) :
                <div>
                    <p className='mt-[-0.5rem] font-light'>Your password has been reset! Please login again.</p>
                </div>
            }
        </form>
    );
}

export default ResetPassword;