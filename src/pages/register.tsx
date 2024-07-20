import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterScreen from '../components/auth/register';
import RoleSelection from '../components/roleSelection';
import CareerSelection from '../components/careerSelection';
import { useNavigate } from 'react-router-dom';

type Role = 'STUDENT' | 'COACH' | 'EMPLOYER' | 'ADMIN';

const roleMap: { [key: number]: Role } = {
  1: 'STUDENT',
  2: 'COACH',
  3: 'EMPLOYER',
  4: 'ADMIN'
};

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

const Register: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('register');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [registrationInfo, setRegistrationInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: '',
    password: ''
  });
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentScreen === 'register') {
      setCurrentSlideIndex(0);
    } else if (currentScreen === 'roleSelection') {
      setCurrentSlideIndex(1);
    } else if (currentScreen === 'careerSelection') {
      setCurrentSlideIndex(2);
    }
  }, [currentScreen]);

  const handleRegister = (info: typeof registrationInfo) => {
    setRegistrationInfo(info);
    setCurrentScreen('roleSelection');
  };

  const handleRoleSelection = (role: number) => {
    setSelectedRole(role);
    setCurrentScreen('careerSelection');
  };

  const handleCareerSelection = async (career: string) => {
    if (!selectedRole) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...registrationInfo,
        role: roleMap[selectedRole],
        career
      };
      await axios.post('https://ge-iutg.onrender.com/api/v1/auth/register', payload);
      toast.success('You have been registered successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate('/login');
      // Navigate to another page or reset state as needed
    } catch (error) {
      toast.error('Error during registration. Please try again.', {
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
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="flex">
      <ToastContainer />
      <div className="float-start w-full md:w-[45%] h-screen px-8 md:px-20 overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {currentScreen === 'register' ? (
          <RegisterScreen onRegister={handleRegister} />
        ) : currentScreen === 'roleSelection' ? (
          <RoleSelection onRoleSelect={handleRoleSelection} />
        ) : (
          <CareerSelection onCareerSelect={handleCareerSelection} isSubmitting={isSubmitting} />
        )}
      </div>
      <div className="relative float-end w-[55%] h-screen hidden md:block">
        <div className='absolute w-full h-full bg-blue-300 opacity-60'>
        </div>
        <img src="/images/auth.png" alt="auth" className="w-full h-full" />
        <div className='absolute top-1/2 left-1/4 flex-col text-center'>
          <h1 className='text-3xl text-white font-bold'>{currentSlide.title}</h1>
          <p className='w-96 text-white font-semibold mt-3'>{currentSlide.text}</p>
        </div>
        <div className="w-full absolute top-[85%] flex gap-x-7 items-center justify-center">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-14 h-2 rounded ${currentSlideIndex === index ? 'bg-blue-500' : 'bg-white'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;
