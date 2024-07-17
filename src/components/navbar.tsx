import { Link } from 'react-router-dom';
import logo from '../assets/icons/logo.svg'

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <Link to="/">
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
                        <span className="font-bold text-xl">GOYA</span>
                    </div>
                </Link>
                <div className="flex space-x-4 font-bold">
                    <Link to="/" className="text-gray-600 hover:text-gray-900">
                        Home
                    </Link>
                    <Link to="/about" className="text-gray-600 hover:text-gray-900">
                        About
                    </Link>
                    <Link to="/join" className="text-gray-600 hover:text-gray-900">
                        Join
                    </Link>
                    <Link to="/contact" className="text-gray-600 hover:text-gray-900">
                        Contact
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-gray-600 hover:text-gray-900 hidden md:block">
                        Sign In
                    </Link>
                    <Link to="/register" className='hidden md:block'>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Sign Up
                        </button>
                    </Link>
                    <Link to="/register" className='block md:hidden'>
                        <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap">
                            Get started
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
