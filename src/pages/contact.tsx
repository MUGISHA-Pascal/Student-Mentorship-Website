import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { motion } from 'framer-motion';


const h2Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
};

const pVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0 } },
};

const spin = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 360,
    transition: {
      duration: 1,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.3,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
      opacity: 1,
      transition: {
          duration: 0.8,
          staggerChildren: 0.3,
      },
  },
};

const contactMethods = [
  {
    title: "Call us",
    details: ["+250780513811"],
    icon: faPhone
  },
  {
    title: "Email us",
    details: ["goyoungafrica@gmail.com"],
    icon: faEnvelope
  },
  {
    title: "Visit us",
    details: ["KN 78 St, Kigali Norrsken House Kigali"],
    icon: faMapMarkerAlt
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/xnnajdlp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        toast.error('Failed to send message. Please try again later.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error('Network error. Please try again later.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col items-center justify-center py-12">
      <ToastContainer />
      <div className="text-center mb-12 px-4">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={h2Variants}
        >Get in Touch</motion.h1>
        <motion.p
          className="text-gray-600 px-5 md:px-[5%] lg:px-[10%]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={pVariants}
        >
          Connect with us to start your journey. Whether you're a student, a mentor or an employer, we're here to assist you every step of the way. Reach out today!
        </motion.p>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl mb-12 lg:px-[1%] md:px-[10%] "
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {contactMethods.map((method, index) => (
          <motion.div
            key={index}
            className="flex gap-x-3 text-center mb-8 w-full sm:w-auto ml-[15%] md:ml-0"
            variants={fadeIn}
          >
            <motion.div
              className="w-14 h-14 bg-white p-3 rounded-full shadow-md inline-block mb-2"
              variants={spin}
            >
              <FontAwesomeIcon icon={method.icon} className="w-6 h-6 text-blue-500" />
            </motion.div>
            <div className="flex-col items-center gap-x-2">
              <div>
                <h2 className="text-lg font-semibold">{method.title}</h2>
              </div>
              {method.details.map((detail, idx) => (
                <p key={idx} className='w-40'>{detail}</p>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full mx-4">
        <form className="grid grid-cols-1 gap-6 sm:grid-cols-2" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Full names</label>
            <input
              type="text"
              name="name"
              placeholder="i.e. John Doe"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="i.e. john@mail.com"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="i.e. +1-234-567-7890"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="i.e. Seeking mentorship"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              placeholder="Type your message"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="w-full mt-10 sm:col-span-2">
            <button
              type="submit"
              className="w-[20%] bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </form>
      </div> */}
      <motion.div
            className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full mx-4"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <form className="grid grid-cols-1 gap-6 sm:grid-cols-2" onSubmit={handleSubmit}>
                <motion.div
                    variants={fadeIn}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 1 }}
                >
                    <label className="block text-gray-700">Full names</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="i.e. John Doe"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </motion.div>
                <motion.div
                    variants={fadeIn}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 1 }}
                >
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="i.e. john@mail.com"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </motion.div>
                <motion.div
                    variants={fadeIn}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 1 }}
                >
                    <label className="block text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="i.e. +1-234-567-7890"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </motion.div>
                <motion.div
                    variants={fadeIn}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 1 }}
                >
                    <label className="block text-gray-700">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        placeholder="i.e. Seeking mentorship"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </motion.div>
                <motion.div
                    className="sm:col-span-2"
                    variants={fadeIn}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 1 }}
                >
                    <label className="block text-gray-700">Message</label>
                    <textarea
                        name="message"
                        placeholder="Type your message"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </motion.div>
                <motion.div
                    className="w-full mt-10 sm:col-span-2"
                    variants={fadeIn}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 1 }}
                >
                    <button
                        type="submit"
                        className="w-[20%] bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                    >
                        Send
                    </button>
                </motion.div>
            </form>
        </motion.div>
    </div>
  );
};

export default Contact;