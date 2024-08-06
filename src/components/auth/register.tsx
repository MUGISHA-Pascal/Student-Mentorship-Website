/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
// import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/toast.css';
import BigLogo from "../mini/bigLogo";
import AuthTextInput from "../mini/authTextInput";
import PasswordInput from "../mini/passwordInput";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import './datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";

interface RegisterScreenProps {
    onRegister: (info: any) => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

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
            dob,
            gender,
            password
        });
    }

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
    };

    const handleDateChange = (date: any) => {
        const formatted = format(date, 'yyyy-MM-dd');
        setDob(formatted);
        const age = calculateAge(date);
        if (age < 14) {
            setError("You must be at least 14 years!");
        } else {
            setError(null);
        }
    };

    const calculateAge = (dob: any) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const isButtonDisabled = !firstName || !lastName || !email || !dob || !gender || !password || !confirmPassword || (calculateAge(dob) < 14);

    return (
        <div className="flex">
            <ToastContainer />
            <div>
                <div className="flex flex-col items-center">
                    <BigLogo />
                    <div className="text-center mt-4">
                        <h2 className="text-2xl font-semibold">Register to</h2>
                        <h2 className="text-2xl font-bold">GOYA e-connects</h2>
                        <p className="text-gray-500 font-semibold mt-1">Long waiting is over for you!</p>
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
                <div className="w-full flex gap-x-3">
                    <div className={`w-1/2 h-[8vh] ${error ? 'mt-1' : 'mt-6'}`}>
                        {error && <div className="error-message text-red-500 text-sm font-semibold">{error}</div>}
                        <div className="custom-datepicker bg-gray-200 w-full h-full">
                            <FaCalendarAlt className="custom-datepicker-icon" />
                            <DatePicker
                                selected={dob ? new Date(dob) : null}
                                onChange={handleDateChange}
                                placeholderText="Select birth date"
                                dateFormat="yyyy/MM/dd"
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={100}
                                className="custom-datepicker-input bg-gray-200 cursor-pointer"
                            />
                        </div>
                    </div>
                    <select
                        className="block w-1/2 bg-gray-200 text-gray-400 font-semibold rounded-md px-2 p-4  mt-6 cursor-pointer"
                        value={gender}
                        onChange={handleGenderChange}
                    >
                        <option value="">
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
                    className={`w-4/5 py-4 px-[10%] text-center rounded-full mt-10 mb-4 ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-600'} text-white text-lg font-semibold`}
                    onClick={handleRegister}
                    disabled={isButtonDisabled}
                >
                    Continue
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