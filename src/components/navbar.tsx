import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="fixed w-full z-50 flex justify-center">
            <div className='w-[95%] bg-white py-3 px-4 flex items-center justify-between border-2 border-blue-100 my-4 rounded-lg'>
                <div className="flex items-center">
                    <Link to="/" className="hover:text-blue-500">
                            <img src="/icons/logo-b.svg" alt="GOYoungAfrica" className="h-8 hidden lg:block" />
                            <img src="/icons/logo.svg" alt="GOYoungAfrica" className="h-8 block lg:hidden" />
                    </Link>
                </div>
                <nav className="hidden md:flex items-center space-x-6 font-semibold">
                    <Link to="/" className="hover:text-blue-500">Home</Link>
                    <Link to="#" className="hover:text-blue-500">Services</Link>
                    <Link to="#" className="hover:text-blue-500">Faqs</Link>
                    <Link to="#" className="hover:text-blue-500">Testimonials</Link>
                    <Link to="#" className="hover:text-blue-500">Consultancy</Link>
                    <Link to="/blogs" className="hover:text-blue-500">Blogs</Link>
                </nav>
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden focus:outline-none text-blue-600"
                >
                    {isMobileMenuOpen ? (
                        <FaTimes />
                    ) : (
                        <FaBars />
                    )}
                </button>
                {isMobileMenuOpen && (
                    <nav className="absolute top-12 -left-[1.5px] w-[100.6%] bg-white z-50 border-b-2 border-l-2 border-r-2 rounded-b-xl border-blue-100 py-4 md:hidden ease-in-out duration-500 ">
                        <div className="flex flex-col items-start px-6 space-y-4">
                            <Link to="/" className="font-semibold hover:text-blue-500" onClick={toggleMobileMenu}>Home</Link>
                            <Link to="#" className="font-semibold hover:text-blue-500" onClick={toggleMobileMenu}>Services</Link>
                            <Link to="#" className="font-semibold hover:text-blue-500" onClick={toggleMobileMenu}>Testimonials</Link>
                            <Link to="#" className="font-semibold hover:text-blue-500" onClick={toggleMobileMenu}>Faqs</Link>
                            <Link to="#" className="font-semibold hover:text-blue-500" onClick={toggleMobileMenu}>Consultancy</Link>
                            <Link to="/blogs" className="font-semibold hover:text-blue-500" onClick={toggleMobileMenu}>Blogs</Link>
                        </div>
                        <div className="flex items-center font-semibold mt-4 gap-x-5 px-5">
                            <button className="px-10 w-1/3 py-2 border border-blue-500 text-blue-600 rounded-xl hover:bg-blue-100">
                                <Link to="/login">
                                    Login
                                </Link>
                            </button>
                            <button className="px-10 w-1/3 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-700">
                                <Link to="/register">
                                    Join
                                </Link>
                            </button>
                            <button className="px-4 w-1/3 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-700">
                                <Link to="/donate">
                                    Donate
                                </Link>
                            </button>
                        </div>
                    </nav>
                )}
                <div className="hidden md:flex items-center space-x-4 font-semibold">
                    <Link to="/login">
                        <button className="px-10 py-2 border border-blue-500 text-blue-600 rounded-xl hover:bg-blue-100 duration-500">
                            Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="px-10 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-700 duration-500">
                            Join
                        </button>
                    </Link>
                    <Link to="/donate">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-700 duration-500">
                            Donate
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;