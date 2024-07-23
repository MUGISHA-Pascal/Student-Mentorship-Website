/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/toast.css';
import BigLogo from "../mini/bigLogo";
import AuthTextInput from "../mini/authTextInput";
import PasswordInput from "../mini/passwordInput";

interface RegisterScreenProps {
    onRegister: (info: any) => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isButtonDisabled = !firstName || !lastName || !email || !age || !gender || !password || !confirmPassword;

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        onRegister({
            firstName,
            lastName,
            email,
            age,
            gender,
            password
        });
    }

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
      };

    return (
        <div className="flex">
            <ToastContainer />
            <div>
                <div className="flex flex-col items-center">
                    <BigLogo />
                    <div className="text-center mt-4">
                        <h2 className="text-2xl font-semibold">Register to</h2>
                        <h2 className="text-2xl font-bold">GOYA e-connects</h2>
                    </div>
                </div>
                <div className="w-full flex gap-x-3 mt-6">
                    <AuthTextInput
                        placeholder="First name"
                        width="50%"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <AuthTextInput
                        placeholder="Last name"
                        width="50%"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </div>
                <AuthTextInput
                    placeholder="Email address"
                    width="100%"
                    value={email}
                    onChangeText={setEmail}
                />
                <div className="w-full flex gap-x-3 mt-6">
                    <AuthTextInput
                        placeholder="Age"
                        width="50%"
                        value={age}
                        onChangeText={setAge}
                    />
                    {/* <AuthTextInput
                        placeholder="Gender"
                        width="50%"
                        value={gender}
                        onChangeText={setGender}
                    /> */}
                    <select
                        className="mt-6 block w-1/2 bg-gray-200 text-gray-400 font-semibold rounded-md px-2"
                        value={gender}
                        onChange={handleGenderChange}
                    >
                        <option value="" disabled>
                            Select your gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
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
                    className={`w-full p-4 text-center rounded-full mt-10 mb-4 ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-600'} text-white text-lg font-semibold`}
                    onClick={handleRegister}
                    disabled={isButtonDisabled}
                >
                    Register
                </button>
                <div className="flex justify-center items-center mb-8">
                    <p className="text-gray-600 font-semibold">Already have an account?</p>
                    <Link to="/login">
                        <a className="text-blue-600 font-bold ml-1">
                            Sign In
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen;