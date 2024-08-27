import { useState } from "react";
import PasswordInput from "../mini/passwordInput";
import { toast } from 'react-toastify';
import { Digital } from "react-activity";
import "react-activity/dist/library.css";

type NewPasswordProps = {
    handleNewPassword: (password: string) => void;
    isSubmitting: boolean;
};

const NewPassword = ({ handleNewPassword, isSubmitting }: NewPasswordProps) => {
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
        <div>
            <div className="text-center mt-4">
                <h2 className="text-2xl font-semibold">New Password</h2>
                <h2 className="text-xl text-gray-400">Enter your new password below</h2>
            </div>
            <PasswordInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <PasswordInput
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <button
                className={`w-4/5 py-4 px-[10%] text-center rounded-full mt-10 mb-4 ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-600 cursor-pointer'} text-white text-lg font-semibold`}
                onClick={handleSubmit}
                disabled={isButtonDisabled || isSubmitting}
            >
                {isSubmitting ? (
                    <span><Digital /></span>
                ) : (
                    <span>Verify</span>
                )}
            </button>
        </div>
    )
}

export default NewPassword;
