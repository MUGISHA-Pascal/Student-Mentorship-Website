import React from 'react';

interface AuthTextInputProps {
    placeholder: string;
    width: string | number;
    value: string;
    onChangeText: (text: string) => void;
}

const AuthTextInput: React.FC<AuthTextInputProps> = ({ placeholder, width, value, onChangeText }) => {
    return (
        <div className="mt-6" style={{ width }}>
            <input
                className="w-full bg-gray-200 rounded-lg p-4 text-gray-400 font-semibold"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChangeText(e.target.value)}
            />
        </div>
    );
};

export default AuthTextInput;
