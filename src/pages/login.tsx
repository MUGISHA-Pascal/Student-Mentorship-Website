import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import BigLogo from "../components/mini/bigLogo"
import AuthTextInput from "../components/mini/authTextInput"
import PasswordInput from "../components/mini/passwordInput"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Digital } from "react-activity";
import "react-activity/dist/library.css";

interface Slide {
  id: number;
  title: string;
  text: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Empower Your Career Journey',
    text: 'Connect with expert coaches to guide you through every step of your career path.'
  },
  {
    id: 2,
    title: 'Unlock Job Opportunities',
    text: 'Discover job openings and connect directly with employers looking for talent like you.',
  },
  {
    id: 3,
    title: 'Learn and Grow',
    text: 'Access resources and training to develop new skills and advance in your career.',
  },
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentSlideIndex];


  const isButtonDisabled = !email || !password;

  const handleLogin = async () => {
    setIsSubmitting(true)
    try {
      await axios.post('https://ge-iutg.onrender.com/api/v1/auth/login', { email, password });
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate('/welcome');
    } catch (error) {
      toast.error('Login failed. Incorrect email or password.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="flex">
      <ToastContainer />
      <div className="float-start w-full md:w-[45%] h-screen px-8 md:px-20 overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex flex-col items-center">
          <BigLogo />
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold">Log in to</h2>
            <h2 className="text-2xl font-bold">GOYA e-connects</h2>
            <p className="text-gray-500 font-semibold mt-1">You have been missed!</p>
          </div>
        </div>
        <div className="w-full flex-col mt-6">
          <AuthTextInput
            placeholder="Email address"
            width="100%"
            value={email}
            onChangeText={setEmail}
          />
          <PasswordInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <Link to='/forgot' className="text-blue-600 font-semibold float-right text-end">
          Forgot Password?
          </Link>
          <button
            className={`w-4/5 py-4 px-[10%] text-center rounded-full mt-10 mb-4 ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-600'} text-white text-lg font-semibold`}
            onClick={handleLogin}
            disabled={isButtonDisabled || isSubmitting}

          >
            {isSubmitting ? (
              <span><Digital /></span>
            ) : (
              <span>Login</span>
            )}
          </button>
          <div className="flex justify-center items-center mb-8">
            <p className="text-gray-600 font-semibold">Don't have an account?</p>
            <Link to="/register">
              <a className="text-blue-600 font-bold ml-1">
                Sign Up
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative float-end w-[55%] h-screen hidden md:block">
        <div className='absolute w-full h-full bg-blue-300 opacity-60'></div>
        <img src="/images/auth.png" alt="auth" className="w-full h-full" />
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 flex-col text-center transition-opacity duration-1000 ease-in-out opacity-100">
          <h1 className="text-3xl text-white font-bold">{currentSlide.title}</h1>
          <p className="w-96 text-white font-semibold mt-3">{currentSlide.text}</p>
        </div>
        <div className="w-full absolute top-[85%] flex gap-x-7 items-center justify-center">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-14 h-2 rounded ${currentSlideIndex === index ? 'bg-blue-500' : 'bg-gray-400'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Login