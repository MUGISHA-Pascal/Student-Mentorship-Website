import React from 'react';
import AuthTextInput from '../mini/authTextInput';
import { Digital } from "react-activity";
import "react-activity/dist/library.css";

interface SendOTPProps {
    handleSendOTP: () => void;
    email: string;
    setEmail: (email: string) => void;
    isSubmitting: boolean;
    onVerifyOtpClick: () => void;
}

const SendOTP: React.FC<SendOTPProps> = ({ handleSendOTP, email, setEmail, isSubmitting, onVerifyOtpClick }) => {
    const isButtonDisabled = !email;

    return (
        <div>
            <div className="text-center mt-4">
                <h2 className="text-2xl font-semibold">Confirm your email to send an OTP.</h2>
            </div>
            <AuthTextInput
                placeholder="Email address"
                width="100%"
                value={email}
                onChangeText={setEmail}
            />
            <button
                className={`w-4/5 py-4 px-[10%] text-center rounded-full mt-10 mb-4 ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-600'} text-white text-lg font-semibold`}
                onClick={handleSendOTP}
                disabled={isButtonDisabled || isSubmitting}
            >
                {isSubmitting ? (
                    <span><Digital /></span>
                ) : (
                    <span>Send OTP</span>
                )}
            </button>
            <div className="flex justify-center items-center mb-8">
                <p className="text-gray-600 font-semibold">Already got an OTP?</p>
                <button onClick={onVerifyOtpClick}> {/* Update button to use new handler */}
                    <span className="text-blue-600 font-bold ml-1">
                        Verify
                    </span>
                </button>
            </div>
        </div>
    );
};

export default SendOTP;
