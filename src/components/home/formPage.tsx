import React from 'react';
import { useNavigate } from 'react-router-dom';

const FormPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <iframe
                src="https://form.jotform.com/242754750521556"
                title="JotForm"
                className="w-screen h-full border-none"
            ></iframe>
            <button
                className={`w-4/5 py-3 px-[10 text-center rounded-2xl mt-10 mb-4 bg-blue-600 text-white`}
                onClick={() => {
                    navigate('/mentor/waiting-approval')
                }}
            >
                Submit
            </button>
        </div>
    );
};

export default FormPage;
