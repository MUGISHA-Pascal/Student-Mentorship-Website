import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PasswordInput from '../mini/passwordInput';
import { Levels } from 'react-activity';

type NewPasswordProps = {
    handleNewPassword: (password: string) => void;
    isSubmitting: boolean;
    handleBack: () => void;
};

const NewPassword = ({ handleNewPassword, isSubmitting, handleBack }: NewPasswordProps) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isButtonDisabled = !password || !confirmPassword;

    const handleSubmit = () => {
        if (password.length < 8) {
            toast.error("Password must be at least 8 charachter long!");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords doesn't match!");
            return;
        }
        handleNewPassword(password);
    };

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
                                <h2 className="text-2xl font-semibold">Set new password</h2>
                                <p>Enter your new password below</p>
                            </div>
                            <div className="w-full flex flex-col items-center mt-10">
                                <PasswordInput
                                    label="Password"
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <PasswordInput
                                    label="Confirm password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                                <button
                                    className={`w-4/5 py-3 px-[10%] text-center rounded-xl mt-10 mb-4 ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-600 cursor-pointer'} text-white text-lg font-semibold`}
                                    onClick={handleSubmit}
                                    disabled={isButtonDisabled || isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <Levels speed={0.5} />
                                    ) : (
                                        <span>Submit</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute lg:top-[7%] md:top-[7%] top-[7%] lg:right-[17%] md:right-[4%] -right-10 -z-10">
                <img src="/svgs/forgot-circle.svg" alt="Forgot-1" className="lg:w-[70%] w-[60%]" />
            </div>
            <div className="bg-lue-400 absolute lg:bottom-0 md:bottom-0 bottom-10 lg:left-[5%] left-0 bg-bue-100 lg:w-[30vw] md:w-[30vw] w-[35vw] lg:h-[40vh]">
                <img src="/svgs/forgot2.svg" alt="Forgot-1"
                    className="w-full h-full"
                />
            </div>
        </div>
    )
}

export default NewPassword