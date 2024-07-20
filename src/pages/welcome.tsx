import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">Welcome to Our Community!</h1>
        <p className="mb-4 text-center text-gray-700">
          Thank you for joining our waitlist. We're thrilled to have you on board!
        </p>
        <p className="mb-6 text-center text-gray-700">
          Please check your email for further instructions. Fill out the form we sent to elaborate the process!
        </p>
        <Link to="/">
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
