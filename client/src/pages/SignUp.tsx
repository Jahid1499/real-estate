import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useRegisterMutation } from "../features/auth/authApi";


const SignUp = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState<string | null>(null);

    const [register, { data, isLoading, error: responseError }] = useRegisterMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (responseError?.data) {
            setError(responseError.data.message);
        }
        if (data?.accessToken && data?.user) {
            navigate("/");
        }
    }, [data, responseError, navigate]);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        register(formData);
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type='text'
                    placeholder='name'
                    className='border p-3 rounded-lg'
                    name='name'
                    onChange={handleChange}
                />
                <input
                    type='email'
                    placeholder='email'
                    className='border p-3 rounded-lg'
                    name='email'
                    onChange={handleChange}
                />
                <input
                    type='password'
                    placeholder='password'
                    className='border p-3 rounded-lg'
                    name='password'
                    onChange={handleChange}
                />

                <button
                    disabled={isLoading}
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >
                    {isLoading ? 'Loading...' : 'Sign Up'}
                </button>
                <OAuth />
            </form>
            <div className="text-center">
                {error && <p className='text-red-500 mt-5 font-semibold'>{error}</p>}
            </div>
            <div className='flex gap-2 mt-5'>
                <p className="font-semibold">Have an account?</p>
                <Link to={'/login'}>
                    <span className='text-blue-700'>Sign in</span>
                </Link>
            </div>
        </div>
    )
}

export default SignUp