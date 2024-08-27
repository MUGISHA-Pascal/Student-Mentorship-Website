import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/icons/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // New state for admin check
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('userRole'); // Get user role from localStorage

        if (token) {
            setIsAuthenticated(true);
            if (role === 'ADMIN') { // Check if user role is ADMIN
                setIsAdmin(true);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        setIsAuthenticated(false);
        setIsAdmin(false);

        toast.success('Logout successful!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/">
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
                        <span className="font-bold text-2xl mt-2">GOYA</span>
                    </div>
                </Link>
                <div className="hidden md:flex space-x-4 font-bold">
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
                    <Link to="/blog" className="text-gray-600 hover:text-gray-900">
                        Blogs
                    </Link>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            {isAdmin && (
                                <Link to="/dashboard" className="text-gray-600 font-semibold hover:text-gray-900 cursor-pointer">
                                    Dashboard
                                </Link>
                            )}
                            <button 
                                onClick={handleLogout} 
                                className="text-gray-600 font-semibold hover:text-gray-900 cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 font-semibold hover:text-gray-900">
                                Sign In
                            </Link>
                            <Link to="/register">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Join Waitlist
                                </button>
                            </Link>
                        </>
                    )}
                </div>
                <div className="md:hidden cursor-pointer">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none">
                        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="h-6 w-6" />
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="absolute top-18 right-0 bg-white rounded-b-md z-50 md:hidden shadow-sm w-3/5 flex flex-col items-center">
                    <div className="w-4/5 rounded-md px-2 pt-2 pb-3 space-y-1 sm:px-3 font-bold flex flex-col items-center">
                        <Link to="/" className="block text-gray-600 hover:text-gray-900">
                            Home
                        </Link>
                        <Link to="/about" className="block text-gray-600 hover:text-gray-900">
                            About
                        </Link>
                        <Link to="/join" className="block text-gray-600 hover:text-gray-900">
                            Join
                        </Link>
                        <Link to="/contact" className="block text-gray-600 hover:text-gray-900">
                            Contact
                        </Link>
                        <Link to="/blog" className="block text-gray-600 hover:text-gray-900">
                            Blogs
                        </Link>
                        {isAuthenticated ? (
                            <>
                                {isAdmin && (
                                    <Link to="/dashboard" className="block text-gray-600 hover:text-gray-900">
                                        Dashboard
                                    </Link>
                                )}
                                <button 
                                    onClick={handleLogout} 
                                    className="block text-gray-600 hover:text-gray-900"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block text-gray-600 hover:text-gray-900">
                                    Sign In
                                </Link>
                                <Link to="/register">
                                    <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap">
                                        Join Waitlist
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

