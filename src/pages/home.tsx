import { FaArrowRight } from "react-icons/fa"
import Services from "../components/home/services";
import { useEffect, useState } from "react";
// import careersData from '../utils/json/careers.json';
const Home = () => {

  const [careers, setCareers] = useState([]);

  useEffect(() => {
    fetch('../utils/json/careers.json')
    // fetch(careersData)
      .then(response => response.json())
      .then(data => setCareers(data))
      .catch(error => console.error('Error fetching careers:', error));
  }, []);
  const stats = [
    { value: "100K+", description: "Targeted Students to enroll in courses" },
    { value: "10K+", description: "Expected Employers looking for skilled workers" },
    { value: "5K+", description: "Mentors will be providing expert guidance" }
  ];

  const testimonials = [
    {
      company: 'Amazon',
      quote: 'Partnering with this e-coaching platform was a game-changer. My new skills are sharper, and my career trajectory has skyrocketed!',
      name: 'Ilya Vasin',
      position: 'Software Engineer',
    },
    {
      company: 'Google',
      quote: 'An essential resource for students aiming to excel as Product Designers. The mentorship here is unparalleled.',
      name: 'Mariano Rosag',
      position: 'Software Engineer',
    },
    {
      company: 'Amazon',
      quote: 'This platform transformed my learning experience. It’s faster, more intuitive, and my progress is off the charts!',
      name: 'Oka Tomoaki',
      position: 'Software Engineer',
    },
  ];


  return (
    <div >
      <div className="relative">
        <div className="w-full bg-cover bg-center h-[40vh] md:h-[85vh] px-32 relative flex items-center justify-center text-center text-white bg-opacity-75"
        >
          <div className="absolute top-[3px] bg-white w-full text-black overflow-hidden h-full">
            <video src="/videos/video1.mp4" className="" autoPlay muted loop />
          </div>
          <div className="md:w-[30%] absolute px-7 md:left-24 b0 top-16 md:top-36">
            <h1 className="text-4xl font-bold mb-4 text-start mix-blend-difference">
              Master Your Skills with Expert Mentors
            </h1>
            <p className="mb-8 hidden md:block text-start mix-blend-difference">
              Unlock endless possibilities with our unique modules. Effortlessly create your next consultancy platform in minutes, no coding required. Elevate your career with top-notch guidance and support.
            </p>
            <button className="flex items-center justify-center gap-x-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-md">
              Get started now
              <FaArrowRight className="" />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row md:justify-between items-center mt-4 md:mt-8 md:text-center md:px-28 shadow">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-x-5 md:w-[25%] pb-10">
              <h2 className="text-4xl font-bold">{stat.value}</h2>
              <p>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-600 pt-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Services we offer for you</h2>
          <p className="mb-12 px-2 md:px-0 md:w-[40%] text-center font-semibold text-white">With lots of unique blocks, you can easily build a page without coding. Build your next landing page.</p>
        </div>
        <div className="px-[20%] md:px-40">
          <Services />
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="px-20 w-full">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us for Your E-Coaching Journey?</h2>
          <p className="mb-12 px-0 md:px-60 text-center font-semibold">
            Elevate your skills with personalized guidance from industry experts. Our platform offers unique, interactive sessions that are designed to transform your career.
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-x-12">
          <div className="flex md:w-1/2 justify-center mb-12">
            <img src="/svgs/what.svg" alt="Why Choose Us" className="h-full rounded-lg shadow-lg" />
          </div>
          <div className="md:w-1/2 px-20 flex flex-col py-10 gap-8">
            <div className="flex items-center gap-x-5">
              <div className="text-blue-600 font-bold h-10 w-10 flex items-center justify-center p-2 bg-blue-100  rounded-full">1</div>
              <div className="w-[70%] md:w-[55%] gap-y-5 text-start">
                <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
                <p className="text-gray-500">With lots of unique blocks, you can easily build a page without coding.</p>
              </div>
            </div>
            <div className="flex items-center gap-x-5">
              <div className="text-blue-600 font-bold h-10 w-10 flex items-center justify-center p-2 bg-blue-100  rounded-full">2</div>
              <div className="w-[70%] md:w-[55%] gap-y-5 text-start">
                <h3 className="text-xl font-bold mb-2">Free Expert Opinion</h3>
                <p className="text-gray-500">With lots of unique blocks, you can easily build a page without coding.</p>
              </div>
            </div>
            <div className="flex items-center gap-x-5">
              <div className="text-blue-600 font-bold h-10 w-10 flex items-center justify-center p-2 bg-blue-100  rounded-full">3</div>
              <div className="w-[70%] md:w-[55%] gap-y-5 text-start">
                <h3 className="text-xl font-bold mb-2">Get Your Results</h3>
                <p className="text-gray-500">With lots of unique blocks, you can easily build a page without coding.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-blue-600 text-white py-4 px-8 my-12">
          <span className="text-sm font-bold bg-white text-black px-3 py-1 rounded-2xl">HOT</span> Check out our personalized learning paths to reach your career goals faster!
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center gap-5">
              <img src="/images/company.png" alt="" className="w-24" />
              <p className="w-[85%]">"{testimonial.quote}"</p>
              <div className="mt-4 flex w-full justify-center gap-x-3">
                <div className="w-14 h-14 rounded-full">
                  <img src="/images/testimonial.png" alt="" />
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p>{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full relative mt-16 flex flex-col md:flex-row items-center justify-between py-12 bg-center bg-cover" style={{ backgroundImage: `url('/images/image1.png')` }}>
        <div className="bg-gray-700 w-full h-full absolute opacity-60 z-0"></div>
        <div className="w-full flex flex-col md:flex-row px-7 md:px-28 z-50">
          <div className="w-full md:w-1/2 py-10 px-10 md:px-36 flex flex-col gap-y-5">
            <img src="/images/chat.png" alt="chat" className="w-20" />
            <h2 className="text-2xl font-bold text-white">
              Unlock Expert Guidance for Your Reading Journey!
            </h2>
            <p className="text-white font-semibold">
              Dive into personalized book mentorship with our seasoned experts. Whether you're a student seeking knowledge, a mentor expanding your repertoire, or an employer enhancing team skills!
            </p>
          </div>
          <div className="w-full md:w-1/3 bg-white p-5 rounded-lg">
            <form className="flex flex-col gap-y-3">
              <div className="mb-4">
                <input type="text" placeholder="Name" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none" />
              </div>
              <div className="mb-4">
                <input type="email" placeholder="Email" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none" />
              </div>
              <div className="mb-4">
                <input type="text" placeholder="Phone" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none" />
              </div>
              <div className="mb-6">
                <select className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none">
                  <option value="">Select a Career</option>
                  {careers.map((career, index) => (
                    <option key={index} value={career}>
                      {career}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg">Get Free Consultancy</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home