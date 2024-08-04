/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import SendOTP from '../components/forgot/sendOTP';
import OTPVerification from '../components/forgot/OTPVerification';
import NewPassword from '../components/forgot/newPassword';
import BigLogo from '../components/mini/bigLogo';
import axios from 'axios';


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

const Forgot: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('sendOTP');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentScreen === 'sendOTP') {
      setCurrentSlideIndex(0);
    } else if (currentScreen === 'otpVerification') {
      setCurrentSlideIndex(1);
    } else if (currentScreen === 'newPassword') {
      setCurrentSlideIndex(2);
    }
  }, [currentScreen]);

  const handleSendOTP = async () => {
    setIsSubmitting(true);
    try {
      // const response =
      await axios.post('https://ge-iutg.onrender.com/api/v1/user/generate-otp', { email });
      toast.success('OTP sent successfully');
      setCurrentScreen('otpVerification');
    } catch (error) {
      toast.error('Failed to send OTP');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPVerification = async () => {
    setIsSubmitting(true);
    try {
      if (!otp) {
        toast.error('Please enter OTP');
        return;
      }
      const response = await axios.get(`https://ge-iutg.onrender.com/api/v1/user/verify-otp?otp=${otp}`);
      if (response.status === 200) {
        toast.success('OTP verified successfully');
        setCurrentScreen('newPassword');
      } else {
        toast.error('Failed to verify OTP');
      }
    } catch (error) {
      toast.error('Failed to verify OTP');
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleOTPResend = async () => {
    setIsSubmitting(true);
    try {
      // const response = 
      await axios.post('https://ge-iutg.onrender.com/api/v1/user/generate-otp', { email });
      toast.success('OTP resent successfully');
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewPassword = async (newPassword: string) => {
    setIsSubmitting(true);
    try {
      // const response = 
      await axios.patch('https://ge-iutg.onrender.com/api/v1/user/update-password', {
        email,
        password: newPassword
      });
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to reset password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtpClick = () => {
    setCurrentScreen('otpVerification');
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="flex">
      <ToastContainer />
      <div className="float-start w-full md:w-[45%] h-screen px-8 md:px-20 overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div>
          <BigLogo />
        </div>
        {currentScreen === 'sendOTP' ? (
          <SendOTP
            handleSendOTP={handleSendOTP}
            email={email}
            setEmail={setEmail}
            isSubmitting={isSubmitting}
            onVerifyOtpClick={handleVerifyOtpClick}
          />
        ) : currentScreen === 'otpVerification' ? (
          <OTPVerification
            handleOTPVerification={handleOTPVerification}
            handleOTPResend={handleOTPResend}
            otp={otp}
            setOtp={setOtp}
            isSubmitting={isSubmitting}
          />
        ) : (
          <NewPassword
            handleNewPassword={handleNewPassword}
            isSubmitting={isSubmitting
            } />
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

export default Forgot;
