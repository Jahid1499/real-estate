import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useUserUpdateMutation } from "../features/auth/authApi";
import { userLoggedOut } from "../features/auth/authSlice";
import { app } from "../firebase";
import { RootState } from "../types/rootState";

const Profile = () => {
    const [formData, setFormData] = useState<{ name?: string, email?: string, password?: string, avatar?: string }>({});
    const { user: { name, email, avatar } } = useSelector((state: RootState) => state.auth);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [userUpdate, { data, isLoading, isSuccess }] = useUserUpdateMutation();

    const [file, setFile] = useState<File | undefined>(undefined);
    const [filePercentage, setFilePercentage] = useState<number>(0);
    const [fileUploadError, setFileUploadError] = useState<boolean>(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(formData);

    /**
     * Firebase storage
      allow read;
      allow write: if 
      request.resource.size < 2 * 1024 * 1024 && 
      request.resource.contentType.matches('image/.*');
     *  
     */

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userUpdate({ ...formData, email })
    };

    const handleDeleteUser = async () => {

    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignOut = async () => {
        dispatch(userLoggedOut());
        localStorage.clear();
        navigate("/");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file: File) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePercentage(Math.round(progress));
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setFormData({ ...formData, avatar: downloadURL })
                );
            }
        );
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input onChange={handleFileChange} hidden accept="image/*" type="file" ref={fileRef} />
                <img
                    src={formData?.avatar || avatar}
                    alt='profile'
                    className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
                    onClick={() => fileRef.current?.click()}
                />
                <p className='text-sm self-center'>
                    {fileUploadError ? (
                        <span className='text-red-700'>
                            Error Image upload (image must be less than 2 mb)
                        </span>
                    ) : filePercentage > 0 && filePercentage < 100 ? (
                        <span className='text-slate-700'>{`Uploading ${filePercentage}%`}</span>
                    ) : filePercentage === 100 ? (
                        <span className='text-green-700'>Image successfully uploaded!</span>
                    ) : (
                        ''
                    )}
                </p>

                <input
                    type='text'
                    placeholder='name'
                    className='border p-3 rounded-lg'
                    name='name'
                    value={formData?.name || name}
                    onChange={handleChange}
                />

                <input
                    type='email'
                    placeholder='email'
                    defaultValue={email}
                    className='border p-3 rounded-lg'
                    disabled
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
                    {isLoading ? 'Loading...' : 'Update'}

                </button>
                {isSuccess && <p className="text-center text-green-500">Successfully updated</p>}
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