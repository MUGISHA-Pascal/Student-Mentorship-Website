import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const contactMethods = [
  {
    title: "Call us",
    details: ["+250788833444", "+250788833444"],
    icon: faPhone
  },
  {
    title: "Email us",
    details: ["goya@gmail.com", "contact@goya.io"],
    icon: faEnvelope
  },
  {
    title: "Visit us",
    details: ["KN 78 St, Kigali Norrsken House Kigali"],
    icon: faMapMarkerAlt
  }
];

const Contact = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col items-center py-12">
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl font-bold mb-4">Contact us</h1>
        <p className="text-gray-600">
          With lots of unique blocks, you can easily build a page without coding. Build your next consultancy website within few minutes.
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
        <form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-gray-700">First & Last Name</label>
            <input type="text" placeholder="i.e. John Doe" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" placeholder="i.e. john@mail.com" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input type="text" placeholder="i.e. +1-234-567-7890" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-gray-700">Subject</label>
            <input type="text" placeholder="i.e. I need help" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-700">Message</label>
            <textarea placeholder="Type your message" className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32"></textarea>
          </div>
          <div className="w-full mt-10 sm:col-span-2">
            <button type="submit" className="w-[20%] bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;