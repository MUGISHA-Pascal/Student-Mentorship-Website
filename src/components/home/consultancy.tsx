import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify"
import careersData from '../../utils/json/careers.json';
import { motion } from 'framer-motion';

const Consultancy = () => {
    const [careers, setCareers] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        career: '',
    });

    useEffect(() => {
        setCareers(careersData);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('https://formspree.io/f/xnnajdlp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    career: '',
                });
                toast.success('email sent!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                console.error('Form submission error:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div
            className="w-full relative flex flex-col md:flex-row items-center justify-between py-12 bg-center bg-cover"
            style={{ backgroundImage: `url('/images/image1.png')` }}
        >
            <ToastContainer />
            <div className="bg-gray-700 w-full h-full absolute opacity-60 z-0"></div>
            <div className="w-full flex flex-col md:flex-row px-7 lg:px-[10%] md:px-[8%] z-50 items-center justify-center">
                <motion.div
                    className="w-4/5 md:w-1/2 py-10 px-10 lg:px-[8%] md:px-[5%] flex flex-col gap-y-5"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <img src="/images/chat.png" alt="chat" className="w-20" />
                    <h2 className="text-2xl font-bold text-white">
                        Unlock Expert Guidance for Your Reading Journey!
                    </h2>
                    <p className="text-white font-semibold">
                        Dive into personalized book mentorship with our seasoned experts. Whether you're a student seeking knowledge, a mentor expanding your repertoire, or an employer enhancing team skills!
                    </p>
                </motion.div>
                <motion.div
                    className="w-4/5 md:w-1/2 p-5 rounded-lg"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <select
                                name="career"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none text-gray-400 cursor-pointer"
                                value={formData.career}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a Career</option>
                                {careers.map((career, index) => (
                                    <option key={index} value={career} className="!text-black !cursor-pointer">
                                        {career}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-center text-white py-3 px-9 rounded-lg cursor-pointer font-semibold"
                        >
                            Get Consultancy
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Consultancy;
