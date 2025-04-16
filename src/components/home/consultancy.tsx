import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import careersData from '../../utils/json/careers.json';
import TextInput from '../mini/textInput';
import { Levels } from 'react-activity';

const Consultancy = () => {
    const [careers, setCareers] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        career: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load careers from careersData.json on component mount
    useEffect(() => {
        setCareers(careersData);
    }, []);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle the form submission logic
    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            // Send form data to the custom backend API
            const response = await fetch('http://localhost:3000/api/v1/subscription/consultancy-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitting(false);
                // console.log('Su submitted successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    career: '',
                });

                // Show success toast notification
                toast.success('Form submitted successfully!', {
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
                const errorData = await response.json();
                console.error('Form submission error:', errorData.message || response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="w-full relative flex flex-col md:flex-row items-center justify-between py-12 bg-center bg-cover"
            style={{ backgroundImage: `url('/images/image1.png')` }}
        >
            <div className="w-full h-full absolute opacity-60 z-0"></div>
            <div className="w-full flex flex-col md:flex-row px-7 lg:px-[10%] md:px-[8%] z-50 items-center justify-center">
                <div className="w-4/5 md:w-1/2 py-10 px-10 lg:px-[8%] md:px-[5%] flex flex-col gap-y-5">
                    <h2 className="text-2xl font-bold text-center">
                        Unlock Expert Guidance for Your Reading Journey!
                    </h2>
                    <img src="/svgs/consultancy.svg" alt="chat" />
                </div>
                <div className="w-4/5 md:w-1/2 p-5 rounded-lg">
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <TextInput
                                label="Name"
                                placeholder="Name"
                                width="100%"
                                value={formData.name}
                                onChangeText={(value) => setFormData({ ...formData, name: value })}
                            />
                        </div>
                        <div className="mb-4">
                            <TextInput
                                label="Email"
                                placeholder="Email"
                                width="100%"
                                value={formData.email}
                                onChangeText={(value) => setFormData({ ...formData, email: value })}
                            />
                        </div>
                        <div className="mb-4">
                            <TextInput
                                label="Phone No."
                                placeholder="Phone No."
                                width="100%"
                                value={formData.phone}
                                onChangeText={(value) => setFormData({ ...formData, phone: value })}
                            />
                        </div>
                        <div className="mt-3 mb-6">
                            <label className="font-bold text-gray-500">Career</label>
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
                            onClick={handleSubmit}
                            className="bg-blue-600 text-center text-white py-3 px-9 rounded-lg cursor-pointer font-semibold"
                        >
                            {isSubmitting ? <Levels speed={0.5} /> : ' Get Consultancy'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Consultancy;
