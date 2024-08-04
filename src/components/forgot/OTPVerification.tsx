import React from 'react';
import OtpInput from 'react-otp-input';
import { Digital } from "react-activity";
import "react-activity/dist/library.css";

type OTPVerificationProps = {
    handleOTPVerification: () => void;
    handleOTPResend: () => void;
    otp: string;
    setOtp: React.Dispatch<React.SetStateAction<string>>;
    isSubmitting: boolean;
};

const OTPVerification = ({ handleOTPVerification, handleOTPResend, otp, setOtp, isSubmitting }: OTPVerificationProps) => {
    const isButtonDisabled = otp.length !== 6;

    return (
        <div className="flex flex-col items-center">
            <div className="text-center mt-4">
                <h2 className="text-2xl font-semibold">Verify OTP</h2>
                <h2 className="text-xl text-gray-400">Enter the OTP sent to your email</h2>
            </div>
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="mx-2">-</span>}
                renderInput={(props) => (
                    <input
                        {...props}
                        className="!w-12 h-14 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}
                containerStyle="mt-6"
            />
            <button
                className={`w-4/5 py-4 px-[10%] text-center rounded-full mt-10 mb-4 ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-600'} text-white text-lg font-semibold`}
                onClick={handleOTPVerification}
                disabled={isButtonDisabled || isSubmitting}
            >
                {isSubmitting ? (
                    <span><Digital /></span>
                ) : (
                    <span>Verify</span>
                )}
            </button>
            <div className="flex justify-center items-center mb-8">
                <p className="text-gray-600 font-semibold">Didn't receive code?</p>
                <button onClick={handleOTPResend}>
                    <span className="text-blue-600 font-bold ml-1">
                        Resend
                    </span>
                </button>
            </div>
        </div>
    );
}

export default OTPVerification;

