import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useLoginMutation } from "../features/auth/authApi";


const SignIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const [login, { data, isLoading, error: responseError }] = useLoginMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (responseError?.data) {
            setError(responseError?.data?.message);
        }

        if (data?.accessToken && data?.user) {
            navigate("/");
        }
    }, [data, responseError, navigate]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        login({
            email,
            password,
        });
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type='email'
                    placeholder='email'
                    className='border p-3 rounded-lg'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='password'
                    className='border p-3 rounded-lg'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    disabled={isLoading}
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >
                    {isLoading ? 'Loading...' : 'Sign In'}
                </button>
                <OAuth />
            </form>
            <div className="text-center">
                {error && <p className='text-red-500 mt-5 font-semibold'>{error}</p>}
            </div>
            <div className='flex gap-2 mt-5'>
                <p>Don't have an account?</p>
                <Link to={'/registration'}>
                    <span className='text-blue-700'>Sign up</span>
                </Link>
            </div>

        </div>
    )
}

export default SignIn