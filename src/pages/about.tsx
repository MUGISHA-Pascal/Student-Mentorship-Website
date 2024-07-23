import { toast, ToastContainer } from 'react-toastify';
import FAQ from "../components/join/faq";

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
        <h1 className="text-4xl font-bold mb-4">Meet all Behind Our Success</h1>
        <p className="text-gray-600">
          Have questions or need assistance? <br />
          We're here to help! Reach out to us and let’s start shaping your future with GOYA. <br />
          Together, we can create impactful connections and unlock your full potential.
        </p>
      </div>
      <div className="w-full flex items-center justify-center mb-20 px-0 md:px-44 ">
        <img
          className="w-4/5"
          src="/images/about1.png" alt="team"
        />
      </div>
      <div className="mb-10 md:px-44 grid grid-cols-1 sm:grid-cols-2 gap-x-2">
        <div className="mb-8 md:mb-0">
          <h1 className="text-3xl font-bold">
            We are here to help <br /> you achieve your <br /> success.
          </h1>
        </div>
        <div className="px-5">
          <p className="text-gray-600">
            We understand the common challenges and offer tailored strategies <br /> to help you excel in your career journey. <br /><br />
            At GOYA, you can easily connect with mentors and career coaches <br /> who will guide you every step of the way. <br /><br />
            Contact us and take the first step towards a brighter future. Together, <br /> we will unlock your full potential and ensure your success.
          </p>
        </div>
      </div>
      <div className="w-full bg-blue-50 grid grid-cols-1 sm:grid-cols-2 px-14 md:px-64 py-20">
        <div>
          <img
            className="w-4/5 md:w-3/5 h-96"
            src="/images/about2.png" alt="team"
          />
        </div>
        <div className="mt-14">
          <h1 className="text-3xl font-bold">
            Get in Touch with Us
          </h1>
          <p className="text-gray-600 mt-10">
            hether you're looking for guidance, mentorship, or career opportunities, <br /> our team of highly skilled professionals from around the globe is here to help. <br /><br />
            Reach out to us today and let's work together to build a brighter future. <br /> Your journey to success starts with a single step—contact us now.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <div className="w-full flex-col text-center mb-12 px-4">
          <h1 className="text-4xl font-bold mb-4">Meet our team</h1>
          <p className="text-gray-600 ">
            Our team is composed of passionate and dedicated professionals <br /> who are committed to helping you achieve your goals. <br /><br />
          </p>
        </div>
        <div>
          <div className="w-full grid grid-cols-1 md:grid-cols-4 px-32 md:px-0 gap-6">
            {team.map((member, index) => (
              <div key={index} className=" w-64 md:w-52 flex flex-col items-center bg-white rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-56 object-cover mb-4"
                />
                <h2 className="text-lg font-bold">{member.name}</h2>
                <p className="text-gray-400">{member.role}</p>
              </div>
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
      <div className="w-full px-48 mt-14">
        <FAQ />
      </div>
    </div>
  )
}

export default About