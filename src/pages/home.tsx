import { motion } from 'framer-motion';
import { FaArrowRight } from "react-icons/fa"
import Services from "../components/home/services";
import Partners from "../components/home/partners";
import Consultancy from "../components/home/consultancy";
import FAQ from "../components/join/faq";
import { Link } from "react-router-dom";
import Video from "../components/home/video";
import Statistics from "../components/home/statistics";
import WhyUs from '../components/home/whyUs';
import Testimonial from '../components/home/testimonial';
import { ToastContainer } from 'react-toastify';


const Home = () => {

  const h2Variants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
  };

  const pVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0 } },
  };

  return (
    <div className="overflow-hidden">
      <ToastContainer />
      <div className="relative">
        <div className="w-full bg-cover bg-center h-[35vh] lg:h-[120vh] md:h-[70vh] px-32 relative flex items-center justify-center text-center text-white bg-opacity-75">
          <div className="absolute top-[3px] bg-white w-full text-black overflow-hidden h-full">
            <video src="/videos/video11.mp4" className="" autoPlay loop muted />
          </div>
          <Video />
        </div>
        <div className="flex items-center justify-center sm:my-1 my-4 px-[20%] md:hidden">
          <Link to="/register" className="">
            <button className="flex items-center justify-center gap-x-2 md:gap-x-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm md:text-lg py-2 px-2 md:py-4 md:px-4 rounded-md text-nowrap">
              Join the waitlist
              <FaArrowRight className="-rotate-45" />
            </button>
          </Link>
          {/* <Link to="/login" className="">
            <button className="flex items-center justify-center gap-x-2 md:gap-x-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm md:text-lg py-2 px-2 md:py-4 md:px-4 rounded-md text-nowrap">
              Sign in
              <FaArrowRight className="-rotate-45" />
            </button>
          </Link> */}
        </div>
        <Statistics />
      </div>
      <div className="bg-blue-600 pt-10">
        <div className="flex flex-col items-center justify-center">
          <motion.h2
            className="text-3xl font-bold mb-8 text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={h2Variants}
          >
            Our Comprehensive Services
          </motion.h2>
          <motion.p
            className="mb-12 px-2 md:px-0 lg:w-[40%] md:w-[60%] text-center font-semibold text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={pVariants}
          >
            From personalized coaching sessions to industry-specific mentorship, we offer a wide range of services to support your career journey and help you thrive.
          </motion.p>
        </div>
        <div className="px-[10%] md:px-[15%] lg:px-[10%] overflow-x-hidden">
          <Services />
        </div>
      </div>
      <div className="text-center">
        <div className="px-[10%] mt-16 w-full">
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 1 }}
            variants={h2Variants}
          >
            Why Choose Us for Your E-Coaching Journey?
          </motion.h2>
          <motion.p
            className="mb-12 px-0 lg:px-[15%] md:px-[15%] text-center font-semibold"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 1 }}
            variants={pVariants}
          >
            {/* Elevate your skills with personalized guidance from industry experts. Our platform offers unique, interactive sessions that are designed to transform your career. */}
            Unlock your true potential by discovering what you love and excel at. Our platform connects you with expert mentors who guide you to achieve your career goals and make a meaningful impact in the world.
          </motion.p>
        </div>
        <div className="w-full">
          
        </div>
        <WhyUs />
        <div className="w-full bg-blue-600 text-white py-4 px-8 my-12">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="text-sm font-bold bg-white text-black px-3 py-1 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: [1, 1.2, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            >
              HOT
            </motion.span>
            {' '}
            Check out our personalized learning paths to reach your career goals faster!
          </motion.div>
        </div>
      </div>
      <Testimonial />
      <div className="bg-blue-50">
        <Partners />
      </div>
      <div>
        <FAQ />
      </div>
      <div>
        <Consultancy />
      </div>
    </div>
  )
}

export default Home;