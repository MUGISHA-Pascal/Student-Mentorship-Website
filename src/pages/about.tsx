import { toast, ToastContainer } from 'react-toastify';
import FAQ from "../components/join/faq";
import { motion } from 'framer-motion';

interface Team {
  name: string;
  role: string;
  image: string;
}

const team: Team[] = [
  {
    name: "Alexis Murenzi",
    role: "CEO",
    image: '/images/1.jpg'
  },
  {
    name: "Marie Merci Uwimbabazi",
    role: "CMO",
    image: '/images/3.png'
  },
  {
    name: "Hyacinthe Nyirahabimana",
    role: "COO & Advisor",
    image: '/images/2.jpeg'
  },
  {
    name: "Myra Beck",
    role: "Mentor & advisor",
    image: '/images/5.jpeg'
  },
  {
    name: "Elisha Muhozi",
    role: "Advisor",
    image: '/images/4.jpg'
  },

];

const h2Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
};

const pVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0 } },
};

const typewriter = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    width: 'auto',
    transition: {
      duration: 2,
      staggerChildren: 0.05,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};


const About = () => {
  const handleHire = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.warn('Sorry, We have not yet started to hire.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };
  return (
    <div className="min-h-screen flex flex-col items-center py-12">
      <ToastContainer />
      <div className="w-full flex-col text-center mb-12 px-4">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={h2Variants}
        >
          Meet all Behind Our Success
        </motion.h1>
        <motion.p
          className="text-gray-600"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={pVariants}
        >
          Have questions or need assistance? <br />
          We're here to help! Reach out to us and let’s start shaping your future with GOYA. <br />
          Together, we can create impactful connections and unlock your full potential.
        </motion.p>
      </div>
      <div className="w-full flex items-center justify-center mb-20 px-0 md:px-44 ">
        <motion.div
          className="w-4/5"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <img
            className="w-full"
            src="/images/about1.png"
            alt="team"
          />
        </motion.div>
      </div>
      <div className="mb-10 md:px-64 grid grid-cols-1 sm:grid-cols-2 gap-x-2">
        <motion.div
          className="mb-8 md:mb-0 px-5 md:px-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-3xl font-bold">
            We are here to help <br /> you achieve your <br /> success.
          </h1>
        </motion.div>
        <motion.div
          className="px-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-gray-600">
            We understand the common challenges and offer tailored strategies <br /> to help you excel in your career journey. <br /><br />
            At GOYA, you can easily connect with mentors and career coaches <br /> who will guide you every step of the way. <br /><br />
            Contact us and take the first step towards a brighter future. Together, <br /> we will unlock your full potential and ensure your success.
          </p>
        </motion.div>
      </div>
      <div className="w-full bg-blue-50 grid grid-cols-1 sm:grid-cols-2 px-14 md:px-64 py-20">
        <motion.div
          className="w-4/5"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >

          <img
            className="w-full md:w-4/5 h-96"
            src="/images/about2.png" alt="team"
          />
        </motion.div>
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-3xl font-bold">
            Get in Touch with Us
          </h1>
          <p className="text-gray-600 mt-10">
            hether you're looking for guidance, mentorship, or career opportunities, <br /> our team of highly skilled professionals from around the globe is here to help. <br /><br />
            Reach out to us today and let's work together to build a brighter future. <br /> Your journey to success starts with a single step—contact us now.
          </p>
        </motion.div>
      </div>
      <div className="mt-10">
        <div className="w-full flex-col text-center mb-12 px-4">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={h2Variants}
          >Meet our team</motion.h1>
          <motion.p
            className="text-gray-600"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={pVariants}
          >
            Our team is composed of passionate and dedicated professionals <br /> who are committed to helping you achieve your goals. <br /><br />
          </motion.p>
        </div>
        <div>
          <div className="w-full grid grid-cols-1 md:grid-cols-4 px-[15%] md:px-0 gap-6">
            {team.map((member, index) => (
              // <div key={index} className=" w-64 md:w-52 flex flex-col items-center text-center bg-white rounded-lg">
              //   <img
              //     src={member.image}
              //     alt={member.name}
              //     className="w-full h-56 object-cover mb-4"
              //   />
              //   <h2 className="text-lg font-bold">{member.name}</h2>
              //   <p className="text-gray-400">{member.role}</p>
              // </div>
              <motion.div
                key={index}
                className="w-64 md:w-52 flex flex-col items-center text-center bg-white rounded-lg"
                variants={fadeIn}
                initial="hidden"
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1 }}
              >
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-56 object-cover mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                <motion.h2
                  className="text-lg font-bold"
                  initial="hidden"
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  variants={typewriter}
                  transition={{ duration: 2, delay: 0.5 }}
                >
                  {member.name}
                </motion.h2>
                <motion.p
                  className="text-gray-400"
                  initial="hidden"
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  variants={fadeIn}
                  transition={{ duration: 1 }}
                >
                  {member.role}
                </motion.p>
              </motion.div>
            ))}
            <div className="w-64 md:w-52 flex flex-col items-center justify-center mb-10 bg-white rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2">Interested to join <br />
                our team ?</h2>
              <form onSubmit={handleHire}>
                <button
                  type="submit"
                  className='text-blue-700 font-bold underline'
                >
                  Apply now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-3 md:px-48 md:mt-14">
        <FAQ />
      </div>
    </div>
  )
}

export default About