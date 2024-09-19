/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import TextInput from "../components/mini/textInput"
import { format } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datepicker.css';
import PasswordInput from "../components/mini/passwordInput";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import SlideShow from "../components/auth/slideShow";
import axios from "axios";
import { Levels } from "react-activity";
import "react-activity/dist/library.css";


const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


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

    setIsSubmitting(true);

    try {
      const payload = { firstName, lastName, email, dob, gender, password };
      // await axios.post('http://146.190.40.172:5000//api/v1/auth/register', payload);
      const response = await axios.post('https://api.goyoungafrica.org/api/v1/auth/register', payload);
      // const { user } = response.data;

      console.log(response.data);
      navigate('/');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Error during registration. Please try again.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // const handleGoogleRegister = () => {

  // }

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

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const isButtonDisabled = !firstName || !lastName || !email || !dob || !gender || !password || !confirmPassword || (calculateAge(dob) < 14);

  return (
    <div className="h-screen p-3 md:p-7 lg:p-10 lg:overflow-y-hidden overflow-y-scroll bg-blue-50">
      <div className="w-full lg:h-full md:h-auto h-auto lg:flex bg-white border border-blue-100 p-3 rounded-lg">
        <div className="w-full lg:w-1/2 px-2 lg:px-10 overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex flex-col items-center">
            <div className="flex items-center flex-col gap-y-2">
              <Link to='/'>
                <img src="/icons/logo.svg" />
              </Link>
              {/* <h2 className="text-2xl font-bold">Join us</h2> */}
              <h2 className="text-2xl text-blue-500 font-bold">Sign In</h2>
              <h2 className="text-gray-500 font-semibold">Long waiting is over for you!</h2>
            </div>
            <div className="w-full flex gap-x-3">
              <TextInput
                label="First name"
                placeholder="First name"
                width="50%"
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                label="Last name"
                placeholder="Last name"
                width="50%"
                value={lastName}
                onChangeText={setLastName}
              />
            </div>
            <TextInput
              label="Email"
              placeholder="Email"
              width="100%"
              value={email}
              onChangeText={setEmail}
            />
            <div className={`w-full flex flex-col lg:flex-row md:flex-row gap-x-3 ${error ? 'mb-2' : 'mb-0'}`}>
              <div className={`lg:w-1/2 md:w-1/2 w-full h-[7.5vh] cursor-pointer ${error ? 'mt-3 mb-2' : 'mt-3'}`}>
                <label className='font-bold text-gray-500'>DOB</label>
                <div className="custom-datepicker w-full h-[55px] border border-gray-400 rounded-lg">
                  <FaCalendarAlt className="custom-datepicker-icon" />
                  <DatePicker
                    selected={dob ? new Date(dob) : null}
                    onChange={handleDateChange}
                    placeholderText="DOB"
                    dateFormat="yyyy/MM/dd"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    className="custom-datepicker-input cursor-pointer w-full"
                  />
                </div>
                {error && <div className="error-message text-red-500 text-sm  font-semibold">{error}</div>}
              </div>
              <div className={`block lg:w-1/2 md:w-1/2 w-full ${error ? 'mt-9 lg:mt-3 md:mt-3':'lg:mt-3 md:mt-3 mt-10'}`}>
                <label className='font-bold text-gray-500'>Gender</label>
                <select
                  className={`block  w-full h-[55px] border border-gray-400 text-gray-400 font-semibold rounded-md px-3 cursor-pointer`}
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
            </div>
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
              className={`w-full py-3 px-[10 text-center rounded-2xl mt-10 mb-4 ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-600 cursor-pointer'} text-white text-lg font-semibold`}
              onClick={handleRegister}
              disabled={isButtonDisabled}
            >
              {!isSubmitting ? (
                <>Sign Up</>
              ) : (
                <Levels speed={0.5} />
              )}
            </button>
            {/* <button
              className={`w-full py-3 px-10 flex items-center justify-center gap-x-5 border border-gray-400 rounded-2xl mt-10 mb-4 text-lg font-semibold`}
              onClick={handleGoogleRegister}
            >
              <img src="/svgs/google.svg" />
              <p className="text-black">Sign Up With Google</p>
            </button> */}
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
        <SlideShow />
      </div>
    </div>
  )
}

export default Register