/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import SendOTP from "../components/forgot/sendOTP";
import { useNavigate } from "react-router-dom";
import NewPassword from "../components/forgot/newPassword";
import OTPVerification from "../components/forgot/OTPVerification";
import axios from "axios";
import { toast } from "react-toastify";

const Forgot = () => {
  const [currentScreen, setCurrentScreen] = useState("sendOTP");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    setIsSubmitting(true);
    try {
      // const response =
      // await axios.post('https://api.goyoungafrica.org/api/v1/user/generate-otp', { email });
      await axios.post("http://localhost:3000/api/v1/user/generate-otp", {
        email,
      });
      toast.success("OTP sent successfully");
      setCurrentScreen("otpVerification");
    } catch (error) {
      toast.error("Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPVerification = async () => {
    setIsSubmitting(true);
    try {
      // console.log("The otp is ", otp);

      if (!otp) {
        toast.error("Please enter OTP");
        return;
      }
      const response = await axios.get(
        // `https://api.goyoungafrica.org/api/v1/user/verify-otp?otp=${otp}`
        `http://localhost:3000/api/v1/user/verify-otp?otp=${otp}`
      );
      if (response.status === 200) {
        toast.success("OTP verified successfully");
        setCurrentScreen("newPassword");
      } else {
        toast.error("Failed to verify OTP");
      }
    } catch (error) {
      toast.error("Failed to verify OTP error");
      // console.log("Error while verifying otp", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPResend = async () => {
    setIsSubmitting(true);
    try {
      // const response =
      await axios.post(
        // "https://api.goyoungafrica.org/api/v1/user/generate-otp",
        "http://localhost:3000/api/v1/user/generate-otp",
        { email }
      );
      toast.success("OTP resent successfully");
    } catch (error) {
      toast.error("Failed to resend OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtpClick = () => {
    setCurrentScreen("otpVerification");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleNewPassword = async (newPassword: string) => {
    setIsSubmitting(true);
    // console.log('Email:', email);
    try {
      // const response =
      await axios.patch(
        // "https://api.goyoungafrica.org/api/v1/user/update-password",
        "http://localhost:3000/api/v1/user/update-password",
        {
          email,
          password: newPassword,
        }
      );
      toast.success("Password reset successfully");
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Failed to reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {currentScreen === "sendOTP" ? (
        <SendOTP
          handleSendOTP={handleSendOTP}
          email={email}
          setEmail={setEmail}
          isSubmitting={isSubmitting}
          onVerifyOtpClick={handleVerifyOtpClick}
        />
      ) : currentScreen === "otpVerification" ? (
        <OTPVerification
          handleOTPVerification={handleOTPVerification}
          handleOTPResend={handleOTPResend}
          otp={otp}
          setOtp={setOtp}
          isSubmitting={isSubmitting}
          handleBack={() => {
            setCurrentScreen("sendOTP");
          }}
        />
      ) : (
        <NewPassword
          handleNewPassword={handleNewPassword}
          isSubmitting={isSubmitting}
          handleBack={() => {
            setCurrentScreen("otpVerification");
          }}
        />
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-3/5 h-3/5 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4">
              Password successfully recovered!
            </h2>
            <p className="font-semibold text-gray-500 mb-20">
              Return to the login page and use your new password.
            </p>
            <button
              className="w-3/5 bg-blue-500 text-white py-3 px-4 rounded-xl mt-4"
              onClick={handleCloseModal}
            >
              Return to login page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forgot;
