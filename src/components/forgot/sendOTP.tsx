import React from "react";
import TextInput from "../mini/textInput"
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Levels } from "react-activity";

interface SendOTPProps {
    handleSendOTP: () => void;
    email: string;
    setEmail: (email: string) => void;
    isSubmitting: boolean;
    onVerifyOtpClick: () => void;
}

const SendOtp: React.FC<SendOTPProps> = ({ handleSendOTP, email, setEmail, isSubmitting, onVerifyOtpClick }) => {
    const navigate = useNavigate();
    const isButtonDisabled = !email;

    return (
        <div className="relative overflow-hidden">
            <div className="relative h-screen w-full">
                <div className="absolute top-3 left-3">
                    <button onClick={() => navigate(-1)} className="flex items-center justify-center space-x-3 text-gray-600 font-semibold">
                        <FaArrowLeft />
                        <p>Back</p>
                    </button>
                </div>
                <div className="lg:px-[10%] -px-10 w-full h-full flex items-center justify-center">
                    <div className="lg:w-[70%] md:w-[75%] w-[85%] h-4/5 bg-white bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-5 border border-blue-300 shadow-sm shadow-blue-200 rounded-2xl lg:px-10 px-5 py-20">
                        <div className="flex flex-col items-center">
                            <div className="text-center mt-4 flex flex-col space-y-2">
                                <h2 className="text-2xl font-semibold">Recover password</h2>
                                <p>Opps. It happens to the best of us. Input your email address to fix the issue.</p>
                            </div>
                            <div className="w-full flex flex-col items-center mt-10">
                                <TextInput
                                    label="Email"
                                    placeholder="Email"
                                    width="100%"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                                <button
                                    className={`w-4/5 py-3 px-[10%] text-center rounded-xl mt-10 mb-4 ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-600 cursor-pointer'} text-white text-lg font-semibold`}
                                    onClick={handleSendOTP}
                                    disabled={isButtonDisabled || isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <Levels speed={0.5} />
                                    ) : (
                                        <span>Request</span>
                                    )}
                                </button>
                                <div className="flex justify-center items-center mb-8">
                                    <p className="text-gray-600 font-semibold">Already got an OTP?</p>
                                    <button onClick={onVerifyOtpClick}>
                                        <span className="text-blue-600 font-bold ml-1 cursor-pointer">
                                            Verify
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute lg:top-[7%] md:top-[7%] top-[7%] lg:left-[20%] md:left-[11%] left-[5%] -z-10">
                <img src="/svgs/forgot-circle.svg" alt="Forgot-1" className="lg:w-[70%] w-[60%]" />
            </div>
            <div className="bg-lue-400 absolute lg:bottom-0 md:bottom-0 bottom-10 lg:right-[8%] right-0 bg-bue-100 lg:w-[30vw] md:w-[30vw] w-[35vw] lg:h-[40vh]">
                <img src="/svgs/forgot1.svg" alt="Forgot-1" 
                // className="lg:w-[70%] w-full lg:h-[55vh] h-[30vh]" 
                className="w-full h-full"
                />
            </div>
        </div>
    )
}

export default SendOtp