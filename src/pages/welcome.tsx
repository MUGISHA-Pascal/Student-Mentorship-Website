import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-full max-w-md text-center relative">
        {/* Image at the top */}
        <img src='/images/waitlist.png' alt="Welcome Image" className="w-full h-auto mb-4" />
        <p className='absolute top-64 select-none font-semibold rotate-12'>Long waiting is over for you!</p>
        <p className='absolute top-[32%] right-[29%] select-none font-bold text-xl'>GOYA</p>
        <div className="bg-white p-8 rounded">
          <h1 className="text-2xl font-bold mb-4 text-black">Welcome to Our Community!</h1>
          <p className="mb-4 text-black">
            Thank you for joining our waitlist. We're thrilled to have you on board!
          </p>
          <p className="mb-6 text-black">
            Let us hope you checked your email for further instructions. If not, please consider doing it. Fill out the form we sent to elaborate the process!
          </p>
          <Link to="/">
            <button className="w-3/5 bg-black text-white py-2 rounded-full hover:bg-gray-800 transition duration-300">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
