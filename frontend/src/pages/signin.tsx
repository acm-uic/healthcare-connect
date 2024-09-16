import { useRouter } from "next/router";

const SignIn: React.FC = () => {

    const router = useRouter();

    const navigate2signup = () => {
        router.push("/signup"); // This navigates to the signup page
    };
    const navigate2forgetpassword = () => {
        router.push("/forgetpassword"); // This navigates to the signup page
    };
    const handleRefresh = () => {
        // Perform any actions like sending an email here
        window.location.reload(); // Refresh the page
    }
    return (
        <>
            <h1>Sign In</h1>
            <p>Email</p>
            <input>
            </input>
            <p>Password</p>
            <input>
            </input>
            <p>

            </p>
            <button 
            onClick={navigate2forgetpassword}>
            Forget Password
            </button>
            <p>
            </p>
            <button 
            onClick={navigate2signup}>
                Sign up
            </button>
            <p>
            </p>
            <button 
            onClick={handleRefresh}>
                Sign in
            </button>

        </>
    );
}

export default SignIn;