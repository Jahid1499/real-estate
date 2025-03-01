
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../types/rootState";

const Header = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>Real</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link>
                <form
                    // onSubmit={handleSubmit}
                    className='bg-slate-100 p-3 rounded-lg flex items-center'
                >
                    <input
                        type='text'
                        placeholder='Search...'
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>
                        <FaSearch className='text-slate-600' />
                    </button>
                </form>
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline font-bold text-slate-700 hover:underline'>
                            Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline font-bold text-slate-700 hover:underline'>
                            About
                        </li>
                    </Link>
                    {user ? (
                        <Link to='/profile'>
                            <img
                                className='rounded-full h-7 w-7 object-cover'
                                src={user.avatar}
                                alt='profile'
                            />
                        </Link>
                    ) : (
                        <Link to='/login'>
                            <li className='text-slate-700 font-bold hover:underline'> Sign in</li>
                        </Link>
                    )}
                </ul>
            </div>
        </header>
    )
}

export default Header