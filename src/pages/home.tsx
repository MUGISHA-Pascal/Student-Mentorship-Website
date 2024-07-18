import { FaArrowRight } from "react-icons/fa"

const Home = () => {
  const stats = [
    { value: "1M+", description: "Customers visit Albino every month" },
    { value: "93%", description: "Satisfaction rate from our customers" },
    { value: "4.9", description: "Average customer ratings out of 5.0!" }
  ];

  const services = [
    { title: 'Digital Marketing', image: '/images/home2.png' },
    { title: 'Content Writing', image: '/images/home2.png' },
    { title: 'Graphic Design', image: '/images/home2.png' },
    { title: 'SEO for Business', image: '/images/home2.png' },
  ];

  const testimonials = [
    {
      company: 'Amazon',
      quote: 'You made it so simple. My new site is so much faster & easier to work with Albino.',
      name: 'Ilya Vasin',
      position: 'Software Engineer',
    },
    {
      company: 'Google',
      quote: 'Must have book for students, who want to be a great Product Designer.',
      name: 'Mariano Rosag',
      position: 'Software Engineer',
    },
    {
      company: 'Amazon',
      quote: 'You made it so simple. My new site is so much faster & easier to work with Albino.',
      name: 'Oka Tomoaki',
      position: 'Software Engineer',
    },
  ];

  return (
    <div >
      <div className="mb-10">
        <div className="w-full bg-cover bg-center h-[75vh] px-32 relative flex items-center justify-center text-center text-white bg-opacity-75" style={{ backgroundImage: `url('/images/home1.png')` }}>
          <div className="md:w-[30%] absolute px-7 md:left-24">
            <h1 className="text-4xl font-bold mb-4">Get skills from the expert mentors.</h1>
            <p className="mb-8">With lots of unique blocks, you can easily build a page without coding. Build your next consultancy website within few minutes.</p>
            <button className="flex items-center justify-center gap-x-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-md">
              Get started now
              <FaArrowRight className="" />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row md:justify-between items-center mt-8 md:text-center md:px-28 shadow">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-x-5 md:w-1/5 pb-10">
              <h2 className="text-4xl font-bold">{stat.value}</h2>
              <p>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-8">Services we offer for you</h2>
            <p className="mb-12 px-2 md:px-0 md:w-[40%] text-center">With lots of unique blocks, you can easily build a page without coding. Build your next landing page.</p>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-10 md:px-0 gap-x-8 gap-y-10">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 shadow-lg rounded-lg">
                <img src={service.image} alt={service.title} className="w-full mb-4" />
                <h3 className="text-xl font-bold flex justify-between px-3 pb-3">
                  {service.title}
                  <FaArrowRight className="" />
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="px-20">
          <h2 className="text-3xl font-bold mb-8">Why you should choose us?</h2>
          <p className="mb-12">
            With lots of unique blocks, you can easily build a page without coding. Build your next landing page.
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-x-12">
          <div className="flex md:w-1/2 justify-center mb-12">
            <img src="/images/home3.png" alt="Why Choose Us" className="h-full rounded-lg shadow-lg" />
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
          <span className="text-sm font-bold">NEW</span> We've added a new exciting feature in v3.0.
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center gap-5">
              <img src="/images/company.png" alt="" className="w-24" />
              <p className="w-[85%]">"{testimonial.quote}"</p>
              <div className="mt-4 flex w-full justify-center gap-x-3">
                <div>
                  <img src="/images/test.png" alt="" />
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

      <div className="w-full relative mt-16 flex flex-col md:flex-row items-center justify-between py-12">
        <div className="bg-gray-700 w-full h-full absolute opacity-60 z-0">h</div>
        <div className="w-full flex flex-col md:flex-row px-7 md:px-28 z-50">
          <div className="w-full md:w-1/2 py-10 px-10 md:px-36 flex flex-col gap-y-5">
            <img src="/images/chat.png" alt="chat" className="w-20" />
            <h2 className="text-2xl font-bold text-white">Get a free consultancy from our expert right now!</h2>
            <p className="text-white">
              With lots of unique blocks, you can easily build a page without coding. Build your next landing page so quickly with Albino.
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
                  <option>Select a service</option>
                  <option value="coaching">Coaching</option>
                  <option value="coaching">Mentoring</option>
                  <option value="coaching">Hiring workers</option>
                </select>
              </div>
              <button
                // type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg">Get Free Consultancy</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home