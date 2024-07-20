import { FaArrowRight } from "react-icons/fa";

const facts = [
  {
    title: 'Personal growth',
    subtitle: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    svg: '/svgs/fact1.svg'
  },
  {
    title: 'Personal growth',
    subtitle: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    svg: '/svgs/fact1.svg'
  },
  {
    title: 'Personal growth',
    subtitle: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    svg: '/svgs/fact1.svg'
  },
  {
    title: 'Personal growth',
    subtitle: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    svg: '/svgs/fact1.svg'
  },
  {
    title: 'Personal growth',
    subtitle: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    svg: '/svgs/fact1.svg'
  },
  {
    title: 'Personal growth',
    subtitle: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    svg: '/svgs/fact1.svg'
  },
];

const jobs = [
  { title: 'Account Manager', type: 'Full Time', location: 'New York' },
  { title: 'Full Stack Developer', type: 'Full Time', location: 'Remote' },
  { title: 'Senior Project Manager', type: 'Full Time', location: 'New York' },
  { title: 'UX Designer', type: 'Full Time', location: 'Remote' },
  // { title: 'Software Engineer', type: 'Full Time', location: 'Remote' },
];

const Join = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-12">
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl font-bold mb-4">Join GOYA</h1>
        <p className="text-gray-600">
          By accessing and placing an order with UXTheme, you confirm that you are <br /> in agreement with and bound by the terms and conditions
        </p>
      </div>
      <div className="w-full my-10">
        <img src="/images/join1.png" className="w-full h-[70%]" />
        {/* <video src="/videos/video2.mp4" className="" autoPlay muted loop /> */}
      </div>
      <div className="text-center mt-5 mb-10 px-4">
        <h1 className="text-3xl font-semibold mb-4">Why you should join us?</h1>
        <p className="text-gray-600">With lots of unique blocks, you can easily build a page without coding. <br /> Build your next consultancy website within few minutes.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 pl-12 pr-28 md:px-36">
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
      <div className="bg-blue-50 h-96 w-full">
        <div className="text-center my-12 px-4">
          <h1 className="text-4xl font-bold mb-4">Current offers at GOYA</h1>
        </div>
      </div>

      <div className="w-full px-48 mt-14">
        <h2 className="text-3xl font-bold mb-8 text-center">Current job openings</h2>
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <button key={index} className="w-full bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-gray-600">{`${job.type}, ${job.location}`}</p>
              </div>
              <FaArrowRight />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Join