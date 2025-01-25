/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../components/mini/textInput";
import PasswordInput from "../components/mini/passwordInput";
import { toast } from "react-toastify";
import { Levels } from "react-activity";
import "react-activity/dist/library.css";
import SlideShow from "../components/auth/slideShow";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";

const Login = () => {
  const { email, password, isSubmitting, login, setEmail, setPassword } = useAuthStore();
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);

      const { user }: { user: { role: string; filledForm?: boolean; approved?: boolean } } = response;

      // console.log("The user role is", user.role);

      if (rememberMe == true) {
        localStorage.setItem("email", email);
        // console.log("Email is", email);

      } else {
        localStorage.removeItem("email");
      }
      if (user.role === 'ADMIN') {
        toast.success("Login successful!", { position: "top-right", autoClose: 5000 });
        navigate('/admin/dashboard');
      } else if (user.role === 'STUDENT') {
        toast.success("Login successful!", { position: "top-right", autoClose: 5000 });
        navigate('/student/dashboard');
      }
      else if (user.role === 'EMPLOYER') {
        toast.success("Login successful!", { position: "top-right", autoClose: 5000 });
        navigate('/employer/dashboard');
      }
      else if (user.role === 'FAMILY') {
        toast.success("Login successful!", { position: "top-right", autoClose: 5000 });
        navigate('/family/dashboard');
      }
      else if (user.role === 'MENTOR') {
        if (!user.filledForm) {
          toast.info("Please complete the mentor form.", { position: "top-right", autoClose: 5000 });
          navigate('/mentor/form');
        } else if (!user.approved) {
          toast.info("Your account is awaiting approval.", { position: "top-right", autoClose: 5000 });
          navigate('/mentor/waiting-approval');
        } else {
          toast.success("Login successful!", { position: "top-right", autoClose: 5000 });
          navigate('/mentor/dashboard');
        }
        // navigate('/mentor/dashboard');
      } else {
        toast.error("Login Failed!", { position: "top-right", autoClose: 5000 });
        navigate('/notfound');
      }
    } catch (error) {
      toast.error("Login failed. Incorrect email or password.", { position: "top-right", autoClose: 5000 });
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, [setEmail]);

  const isButtonDisabled = !email || !password || isSubmitting;

  return (
    <div className="h-screen p-3 md:p-7 lg:p-10 overflow-x-hidden bg-blue-50">
      <div className="w-full h-full lg:flex bg-white border border-blue-100 p-3 rounded-lg">
        <div className="w-full lg:w-1/2 px-2 lg:px-10">
          <div className="flex flex-col items-center">
            <div className="flex items-center flex-col gap-y-2">
              <Link to='/'>
                <img src="/icons/logo.svg" />
              </Link>
              <h2 className="text-2xl text-blue-500 font-bold">Sign In</h2>
              <h2 className="text-gray-500 font-semibold">Welcome back, You have been missed!</h2>
            </div>
            <TextInput
              label="Email"
              placeholder="Email"
              width="100%"
              value={email}
              onChangeText={setEmail}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
            <div className="w-full flex justify-between px-1 mt-1">
              <div className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-blue-100"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <p className="text-gray-500 font-semibold">Remember me</p>
              </div>
              <div>
                <Link to='/forgot' className="text-blue-600 font-semibold float-right text-end">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              className={`w-full py-3 px-[10 text-center rounded-2xl mt-10 mb-4 ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-600 cursor-pointer'} text-white text-lg font-semibold`}
              onClick={handleLogin}
              disabled={isButtonDisabled || isSubmitting}
            >
              {isSubmitting ? (
                <Levels speed={0.5} />
              ) : (
                <span>Sign In</span>
              )}
            </button>
            {/* <button
              className={`w-full py-3 px-10 flex items-center justify-center gap-x-5 border border-gray-400 rounded-2xl mt-10 mb-4 text-lg font-semibold`}
              onClick={handleGoogleLogin}
            >
              <img src="/svgs/google.svg" />
              <p className="text-black">Sign Up With Google</p>
            </button> */}
            <div className="flex justify-center items-center gap-x-3">
              <p className="text-gray-600 font-semibold">Don't have account?</p>
              <Link to="/register">
                <button className="px-10 py-2 border border-blue-500 text-blue-600 font-bold rounded-xl hover:bg-blue-100">
                  Join Now!
                </button>
              </Link>
            </div>
          </div>
        </div>
        <SlideShow />
      </div>
    </div>
  )
}

export default Login