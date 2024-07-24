import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';

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
    <div className="bg-blue-50 min-h-screen flex flex-col items-center py-12">
      <ToastContainer />
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-600 px-5 md:px-64">
          Connect with us to start your journey. Whether you're a student, a mentor or an employer, we're here to assist you every step of the way. Reach out today!
        </p>
      </div>
      <div className="flex flex-wrap justify-around w-full max-w-4xl mb-12 px-4 ">
        {contactMethods.map((method, index) => (
          <div key={index} className="flex gap-x-3 text-center mb-8 w-full sm:w-auto ml-[15%] md:ml-0">
            <div className="w-14 h-14 bg-white p-3 rounded-full shadow-md inline-block mb-2">
              <FontAwesomeIcon icon={method.icon} className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-col items-center gap-x-2">
              <div>
                <h2 className="text-lg font-semibold">{method.title}</h2>
              </div>
              {method.details.map((detail, idx) => (
                <p key={idx} className='w-40'>{detail}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full mx-4">
        {/* <form className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          action="https://formspree.io/f/xnnajdlp"
          method="POST">
          <div>
            <label className="block text-gray-700">Full names</label>
            <input type="text" name="name" placeholder="i.e. John Doe" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" placeholder="i.e. john@mail.com" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input type="text" name="phone" placeholder="i.e. +1-234-567-7890" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-gray-700">Subject</label>
            <input type="text" name="subject" placeholder="i.e. Seeking mentorship" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-700">Message</label>
            <textarea name="message" placeholder="Type your message" className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32" required></textarea>
          </div>
          <div className="w-full mt-10 sm:col-span-2">
            <button type="submit" className="w-[20%] bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Send
            </button>
          </div>
        </form> */}

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
      </div>
    </div>
  );
};

export default Contact;