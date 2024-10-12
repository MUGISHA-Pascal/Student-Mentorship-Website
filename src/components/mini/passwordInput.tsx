import React, { useState } from 'react';

interface PasswordInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, placeholder, value, onChangeText }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="w-full mt-3">
            <label className='font-bold text-gray-500'>{label}</label>
            <div className="w-full flex items-center rounded-lg p-3 border border-gray-400  focus:border-blue-500 focus:shadow focus:shadow-blue-300">
                <input
                    className="flex-1 w-full text-gray-400 font-semibold focus:outline-none"
                    value={value}
                    onChange={(e) => onChangeText(e.target.value)}
                    placeholder={placeholder}
                    type={isPasswordVisible ? 'text' : 'password'}
                />
                <button onClick={togglePasswordVisibility} className="ml-2 cursor-pointer">
                    {isPasswordVisible ? (
                        <img src="/svgs/eye-off.svg" alt="Hide" width={24} height={24} />
                    ) : (
                        <img src="/svgs/eye.svg" alt="Show" width={24} height={24} />
                    )}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
