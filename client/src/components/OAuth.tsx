import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLoginMutation } from "../features/auth/authApi";
import { app } from "../firebase";

const OAuth = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [googleLogin, { data, isLoading, error: responseError }] = useGoogleLoginMutation();

    const navigate = useNavigate();


    const handleGoogleClick = async () => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const { user: { email, displayName: name, photoURL: avatar } } = result;
            setError("");
            googleLogin({ name, email, avatar })
        } catch (error) {
            console.log('could not sign in with google', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (responseError?.data) {
            setError(responseError.data.message);
        }
        if (data?.accessToken && data?.user) {
            navigate("/");
        }
    }, [data, responseError, navigate]);

    return (
        <div>
            <button
                disabled={loading || isLoading}
                onClick={handleGoogleClick}
                type='button'
                className='bg-red-700 w-full text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-80'
            >
                {loading || isLoading ? 'Loading ......' : 'Continue with google'}
            </button>

            {error && <p className='text-red-500 mt-5 font-semibold text-center'>{error}</p>}
        </div>
    )
}

export default OAuth