import { FaCopyright, FaFacebookMessenger, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="bg-gray-800  pt-16 pb-2">
            <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-1 px-24 gap-y-7 gap-x-32">
                <div className="flex flex-col text-white">
                    <h1 className="mb-3 font-bold text-xl">Learn more</h1>
                    <Link to="/" className="font-semibold hover:text-blue-900">
                        Home
                    </Link>
                    <Link to="/about" className="font-semibold hover:text-blue-900">
                        About
                    </Link>
                    <Link to="/join" className="font-semibold hover:text-blue-900">
                        Join
                    </Link>
                    <Link to="/contact" className="font-semibold hover:text-blue-900">
                        Contact
                    </Link>
                </div>
                <div className="flex flex-col text-white">
                    <h1 className="mb-3 font-bold text-xl">Get in touch</h1>
                    <p className="mb-1">
                        KN 78 St, Kigali <br />
                        Norrsken House Kigali
                    </p>
                </div>
                <div className="flex flex-col text-white">
                    <h1 className="mb-3 font-bold text-xl">Our newsletter</h1>
                    <div className="my-1">Subscribe to our newsletter to get our news <br /> & deals delivered to you.</div>
                    <div className="flex">
                        <input type="email" placeholder="Email address" className="py-2 px-5 mt-3" />
                        <button className="bg-blue-700 py-2 px-5 mt-3">Submit</button>
                    </div>
                </div>
                <div className="flex flex-col text-white">
                    <h1 className="mb-3 font-bold text-xl">Social links</h1>
                    <div className="flex gap-x-4">
                        <Link to='#'>
                            <FaLinkedinIn size={24} />
                        </Link>
                        <Link to='#'>
                            <FaTwitter size={24} />
                        </Link>
                        <Link to='#'>
                            <FaFacebookMessenger size={24} />
                        </Link>
                        <Link to='#'>
                            <FaInstagram size={24} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mx-5 mt-5 mb-2 border"></div>
            <p className="flex text-white items-center gap-x-4 px-24">
                <FaCopyright color="white"/>
                2024 Copyright, All Right Reserved
            </p>
        </div>
    )
}

export default Footer