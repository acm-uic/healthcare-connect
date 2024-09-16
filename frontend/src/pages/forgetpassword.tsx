import React from 'react';
import { useRouter } from 'next/router';

const ForgetPassword: React.FC = () => {
    const router = useRouter();


const navigate2resetpassword = () => {
    router.push("/resetpassword"); // This navigates to the signup page
};

    return (
        <>
            <h1>
                Email
            </h1>
            <input>
            </input>
            <button onClick = {navigate2resetpassword}>
                Send Email
            </button>
        </>
    );
}

export default ForgetPassword;