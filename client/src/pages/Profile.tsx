import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../types/rootState";

const Profile = () => {
    const [formData, setFormData] = useState({});
    const { user: { name, email, avatar } } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleDeleteUser = async () => {

    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSignOut = async () => {

    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <img
                    src={avatar}
                    alt='profile'
                    className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
                />

                <input
                    type='text'
                    placeholder='name'
                    defaultValue={name}
                    name='name'
                    className='border p-3 rounded-lg'
                    onChange={handleChange}
                />
                <input
                    type='email'
                    placeholder='email'
                    id='email'
                    defaultValue={email}
                    className='border p-3 rounded-lg'
                    onChange={handleChange}
                />
                <input
                    type='password'
                    placeholder='password'
                    onChange={handleChange}
                    name='password'
                    className='border p-3 rounded-lg'
                />
                <button

                    className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
                >
                    {/* {loading ? 'Loading...' : 'Update'} */}
                    Update
                </button>
                <Link
                    className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
                    to={'/create-listing'}
                >
                    Create Listing
                </Link>
            </form>
            <div className='flex justify-between mt-5'>
                <span
                    onClick={handleDeleteUser}
                    className='text-red-700 cursor-pointer'
                >
                    Delete account
                </span>
                <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
                    Sign out
                </span>
            </div>
        </div>
    )
}

export default Profile