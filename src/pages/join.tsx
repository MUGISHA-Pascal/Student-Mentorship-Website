import FAQ from "../components/join/faq";

const facts = [
  {
    title: 'High-Class Mentorship',
    subtitle: 'Access to experienced mentors who will guide you through real-world projects and provide valuable industry insights.',
    svg: '/svgs/fact1.svg'
  },
  {
    title: 'Professional Development',
    subtitle: 'Workshops and training sessions to enhance your skills and prepare you for the job market.',
    svg: '/svgs/fact1.svg'
  },
  {
    title: 'Networking Opportunities',
    subtitle: 'Connect with industry professionals, potential employers, and like-minded peers through various networking events.',
    svg: '/svgs/fact1.svg'
  },
  {
    title: 'Project-Based Experience',
    subtitle: 'Engage in hands-on projects that allow you to apply your knowledge and gain practical experience.',
    svg: '/svgs/fact1.svg'
  },
  {
    title: 'Career Support',
    subtitle: 'Assistance with resume building, interview preparation, and job placement through our e-connects platform.',
    svg: '/svgs/fact1.svg'
  },
  {
    title: 'Investment Opportunities',
    subtitle: 'Potential for investment in your innovative ideas and projects, helping you bring them to fruition.',
    svg: '/svgs/fact1.svg'
  },
];

const Join = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-12">
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Become a Part of GOYA</h1>
        <p className="text-gray-600 text-center">
          Ready to unlock your potential and make a meaningful impact? <br />
          Join GOYA and embark on a journey filled with growth, mentorship, and endless opportunities. <br />
          Together, we’ll transform your aspirations into achievements and shape the future of Africa.
        </p>

      </div>
      <div className="w-full  my-10 bg-red-200">
        <img src="/images/join1.png" className="w-full h-[70%]" />
        {/* <video src="/videos/video2.mp4" className="h-full w-full" autoPlay muted loop /> */}
      </div>
      <div className="text-center mt-5 mb-16 px-4">
        <h1 className="text-3xl font-semibold mb-4">Why you should join us?</h1>
        <p className="text-gray-600 font-semibold">
          To gain access to unparalleled mentorship, professional development opportunities, and a network of industry professionals.
          <br /> Empower your future with real-world project experience and career support.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 pr-[20%] md:px-36">
        {facts.map((fact, index) => (
          <div key={index} className="flex gap-x-3 text-center mb-8 w-full sm:w-auto ml-[15%] md:ml-0">
            <div className="w-14 h-14 mb-2">
              <img src={fact.svg} alt={fact.svg} />
            </div>
            <div className="flex-col items-center gap-x-2">
              <div>
                <h2 className="text-lg font-semibold mb-3">{fact.title}</h2>
                <p>{fact.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full md:px-48 md:mt-14">
        <FAQ />
      </div>
    </div>
  )
}

export default Join