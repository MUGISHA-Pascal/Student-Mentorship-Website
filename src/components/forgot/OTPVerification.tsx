import { Levels } from 'react-activity';
import { FaArrowLeft } from 'react-icons/fa';
import OtpInput from 'react-otp-input';

type OTPVerificationProps = {
    handleOTPVerification: () => void;
    handleOTPResend: () => void;
    otp: string;
    setOtp: React.Dispatch<React.SetStateAction<string>>;
    isSubmitting: boolean;
    handleBack: () => void;
};

const OTPVerification: React.FC<OTPVerificationProps> = ({ handleOTPVerification, handleOTPResend, otp, setOtp, isSubmitting, handleBack }: OTPVerificationProps) => {

    const isButtonDisabled = otp.length !== 6;

    return (
        <div className="relative overflow-hidden">
            <div className="relative h-screen w-full">
                <div className="absolute top-3 left-3">
                    <button onClick={handleBack} className="flex items-center justify-center space-x-3 text-gray-600 font-semibold">
                        <FaArrowLeft />
                        <p>Back</p>
                    </button>
                </div>
                <div className="lg:px-[10%] -px-10 w-full h-full flex items-center justify-center">
                    <div className="lg:w-[70%] md:w-[75%] w-[85%] h-4/5 bg-white bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-5 border border-blue-300 shadow-sm shadow-blue-200 rounded-2xl lg:px-10 px-5 py-20">
                        <div className="flex flex-col items-center">
                            <div className="text-center mt-4 flex flex-col space-y-2">
                                <h2 className="text-2xl font-semibold">OTP Verification</h2>
                                <p>We’ve sent an OTP code check your email (user@example.com) and fill it in. </p>
                            </div>
                            <div className="w-full flex flex-col items-center justify-center mt-10">
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span className="mx-1">-</span>}
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            className="lg:!w-14 !w-[12%] lg:h-14 h-10 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}
                                    containerStyle="mt-6 flex items-center justify-center"
                                />
                                <button
                                    className={`w-4/5 py-3 px-[10%] text-center rounded-xl mt-10 mb-4 ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-600 cursor-pointer'} text-white text-lg font-semibold`}
                                    onClick={handleOTPVerification}
                                    disabled={isButtonDisabled || isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <Levels speed={0.5} />
                                    ) : (
                                        <span>Verify</span>
                                    )}
                                </button>
                                <div className="flex justify-center items-center mb-8">
                                    <p className="text-gray-600 font-semibold">Didn't receive code?</p>
                                    <button onClick={handleOTPResend}>
                                        <span className="text-blue-600 font-bold ml-1 cursor-pointer">
                                            Resend
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute lg:top-[20%] md:top-[20%] top-[25%] lg:left-[40%] md:left-[40%] left-[40%] -z-10">
                <img src="/svgs/forgot-circle.svg" alt="Forgot-1" className="lg:w-[90%] w-[80%]" />
            </div>
            <div className="bg-lue-400 absolute lg:top-0 md:top-0 top-10 lg:right-[5%] right-0 bg-bue-100 lg:w-[30vw] md:w-[30vw] w-[35vw] lg:h-[40vh]">
                <img src="/svgs/forgot3.svg" alt="Forgot-3"
                    className="w-full h-full"
                />
            </div>
        </div>
    )
}

export default OTPVerification