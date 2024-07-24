// import { Link } from 'react-router-dom';
// import logo from '../assets/icons/logo.svg'

// const Navbar = () => {
//     return (
//         <nav className="bg-white shadow-sm">
//             <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//                 <Link to="/">
//                     <div className="flex items-center">
//                         <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
//                         <span className="font-bold text-2xl mt-2">GOYA</span>
//                     </div>
//                 </Link>
//                 <div className="flex space-x-4 font-bold">
//                     <Link to="/" className="text-gray-600 hover:text-gray-900">
//                         Home
//                     </Link>
//                     <Link to="/about" className="text-gray-600 hover:text-gray-900">
//                         About
//                     </Link>
//                     <Link to="/join" className="text-gray-600 hover:text-gray-900">
//                         Join
//                     </Link>
//                     <Link to="/contact" className="text-gray-600 hover:text-gray-900">
//                         Contact
//                     </Link>
//                     <Link to="/blog" className="text-gray-600 hover:text-gray-900">
//                         Blogs
//                     </Link>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                     <Link to="/login" className="text-gray-600 hover:text-gray-900 hidden md:block">
//                         Sign In
//                     </Link>
//                     <Link to="/register" className='hidden md:block'>
//                         <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//                             Sign Up
//                         </button>
//                     </Link>
//                     <Link to="/register" className='block md:hidden'>
//                         <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap">
//                             Get started
//                         </button>
//                     </Link>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../assets/icons/logo.svg';

// const Navbar = () => {
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     return (
//         <nav className="bg-white shadow-sm">
//             <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//                 <Link to="/">
//                     <div className="flex items-center">
//                         <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
//                         <span className="font-bold text-2xl mt-2">GOYA</span>
//                     </div>
//                 </Link>
//                 <div className="hidden md:flex space-x-4 font-bold">
//                     <Link to="/" className="text-gray-600 hover:text-gray-900">
//                         Home
//                     </Link>
//                     <Link to="/about" className="text-gray-600 hover:text-gray-900">
//                         About
//                     </Link>
//                     <Link to="/join" className="text-gray-600 hover:text-gray-900">
//                         Join
//                     </Link>
//                     <Link to="/contact" className="text-gray-600 hover:text-gray-900">
//                         Contact
//                     </Link>
//                     <Link to="/blog" className="text-gray-600 hover:text-gray-900">
//                         Blogs
//                     </Link>
//                 </div>
//                 <div className="hidden md:flex items-center space-x-4">
//                     <Link to="/login" className="text-gray-600 hover:text-gray-900">
//                         Sign In
//                     </Link>
//                     <Link to="/register">
//                         <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//                             Sign Up
//                         </button>
//                     </Link>
//                 </div>
//                 <div className="md:hidden">
//                     <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none">
//                         <svg className="h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//             {isMobileMenuOpen && (
//                 <div className="md:hidden bg-white shadow-sm w-full flex flex-col items-center">
//                     <div className="w-4/5 px-2 pt-2 pb-3 space-y-1 sm:px-3 font-bold flex flex-col items-center">
//                         <Link to="/" className="block text-gray-600 hover:text-gray-900">
//                             Home
//                         </Link>
//                         <Link to="/about" className="block text-gray-600 hover:text-gray-900">
//                             About
//                         </Link>
//                         <Link to="/join" className="block text-gray-600 hover:text-gray-900">
//                             Join
//                         </Link>
//                         <Link to="/contact" className="block text-gray-600 hover:text-gray-900">
//                             Contact
//                         </Link>
//                         <Link to="/blog" className="block text-gray-600 hover:text-gray-900">
//                             Blogs
//                         </Link>
//                         {/* <div className='flex gap-x-5'> */}
//                         <Link to="/login" className="block text-gray-600 hover:text-gray-900">
//                             Sign In
//                         </Link>
//                         <Link to="/register">
//                             <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap">
//                                 Signup
//                             </button>
//                         </Link>
//                         {/* </div> */}
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default Navbar;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icons/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                    {/* <Link to="/blog" className="text-gray-600 hover:text-gray-900">
                        Blogs
                    </Link> */}
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/login" className="text-gray-600 hover:text-gray-900">
                        Sign In
                    </Link>
                    <Link to="/register">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Sign Up
                        </button>
                    </Link>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none">
                        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="h-6 w-6" />
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="absolute top-18 right-0 bg-white rounded-b-md z-50 md:hidden  shadow-sm w-3/5 flex flex-col items-center">
                    <div className="w-4/5 rounded-md  px-2 pt-2 pb-3 space-y-1 sm:px-3 font-bold flex flex-col items-center">
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
                        {/* <Link to="/blog" className="block text-gray-600 hover:text-gray-900">
                            Blogs
                        </Link> */}
                        <Link to="/login" className="block text-gray-600 hover:text-gray-900">
                            Sign In
                        </Link>
                        <Link to="/register">
                            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap">
                                Signup
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

