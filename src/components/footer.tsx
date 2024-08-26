import { useState } from 'react';
import { Digital } from "react-activity";
import "react-activity/dist/library.css";
import { FaCopyright, FaFacebookMessenger, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const Footer = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubscription = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setEmail('');  // Clear the input field
            toast.success('Subscription request sent!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }, 2000); // Simulate a 2-second API call delay
    };

    return (
        <div className="bg-gray-800 pt-16 pb-2 overflow-x-hidden">
            <ToastContainer />
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 px-10 lg:px-[5%] md:px-[8%] gap-y-10 gap-x-[2%]">
                <div className="flex flex-col text-white">
                    <h1 className="mb-3 font-bold text-xl">Learn more</h1>
                    <Link to="/" className="font-semibold hover:text-blue-900">Home</Link>
                    <Link to="/about" className="font-semibold hover:text-blue-900">About</Link>
                    <Link to="/join" className="font-semibold hover:text-blue-900">Join</Link>
                    <Link to="/contact" className="font-semibold hover:text-blue-900">Contact</Link>
                    <Link to="/blog" className="hover:text-blue-900 font-semibold">Blogs</Link>
                </div>
                <div className="flex flex-col text-white md:ml-[5%]">
                    <h1 className="mb-3 font-bold text-xl">Get in touch</h1>
                    <p className="mb-1">KN 78 St, Kigali <br /> Norrsken House Kigali</p>
                </div>
                <div className="flex flex-col text-white">
                    <h1 className="mb-3 font-bold text-xl">Our newsletter</h1>
                    <div className="my-1">Subscribe to our newsletter to get our news & deals delivered to you.</div>
                    <form onSubmit={handleSubscription}>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-[70%] py-2 px-5 mt-3 text-black focus:outline-none"
                                required
                            />
                            <button
                                type="submit"
                                className="w-[20%] bg-blue-700 py-2 px-5 mt-3 cursor-pointer text-center font-semibold"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <Digital size={18} speed={0.5} color="#fff" /> : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col text-white lg:ml-[15%] md:ml-[5%]">
                    <h1 className="mb-3 font-bold text-xl">Social links</h1>
                    <div className="flex gap-x-4">
                        <a href="https://www.linkedin.com/in/go-young-africa-x" target="_blank" rel="noreferrer">
                            <FaLinkedinIn size={24} />
                        </a>
                        <a href="https://x.com/GOYAFRICA" target="_blank" rel="noreferrer">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61563176430025" target="_blank" rel="noreferrer">
                            <FaFacebookMessenger size={24} />
                        </a>
                        <a href="https://www.instagram.com/goyoungafrica/" target="_blank" rel="noreferrer">
                            <FaInstagram size={24} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mx-5 mt-5 mb-2 border"></div>
            <p className="flex text-white items-center gap-x-4 px-10 md:px-24">
                <FaCopyright color="white" />
                2024 Copyright, All Right Reserved
            </p>
        </div>
    );
}

export default Footer;
