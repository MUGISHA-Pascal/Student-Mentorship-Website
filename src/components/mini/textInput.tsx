import React from 'react'

interface TextInputProps {
    label: string;
    placeholder: string;
    width: string | number;
    value: string;
    onChangeText: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, placeholder, width, value, onChangeText }) => {
    return (
        <div className="mt-3" style={{ width }}>
            <label className='font-bold text-gray-500'>{label}</label>
            <input
                className="w-full border border-gray-400 rounded-lg p-3 text-gray-400 font-semibold"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChangeText(e.target.value)}
                required
            />
        </div>
    )
}

export default TextInput