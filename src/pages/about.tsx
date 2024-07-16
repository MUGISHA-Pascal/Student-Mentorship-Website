interface Team {
  name: string;
  role: string;
  image: string;
}

const team: Team[] = [
  {
    name: "Alice Johnson",
    role: "Frontend Developer",
    image: '/images/team1.png'
  },
  {
    name: "Bob Smith",
    role: "Backend Developer",
    image: '/images/team1.png'
  },
  {
    name: "Charlie Brown",
    role: "UI/UX Designer",
    image: '/images/team1.png'
  },
  {
    name: "Diana Prince",
    role: "Project Manager",
    image: '/images/team1.png'
  },
  {
    name: "Alice Johnson",
    role: "Frontend Developer",
    image: '/images/team1.png'
  },
  {
    name: "Bob Smith",
    role: "Backend Developer",
    image: '/images/team1.png'
  },
  {
    name: "Charlie Brown",
    role: "UI/UX Designer",
    image: '/images/team1.png'
  },
];
const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-12">
      <div className="w-full flex-col text-center mb-12 px-4">
        <h1 className="text-4xl font-bold mb-4">Contact us</h1>
        <p className="text-gray-600 ">
          With lots of unique blocks, you can easily build a page without coding <br />. Build your next consultancy website within few minutes.
        </p>
      </div>
      <div className="w-full flex items-center justify-center mb-20 px-0 md:px-44 ">
        <img
          className="w-4/5"
          src="/images/about1.png" alt="team"
        />
      </div>
      <div className="mb-10 md:px-24 grid grid-cols-1 sm:grid-cols-2 gap-x-2">
        <div className="mb-8 md:mb-0">
          <h1 className="text-3xl font-bold">
            We are here to help <br /> the customers to get <br /> their success.
          </h1>
        </div>
        <div className="px-5">
          <p className="text-gray-600">
            We share common trends and strategies for improving <br /> your rental income and making sure you stay in high <br /> demand of service. <br /><br />

            With lots of unique blocks, you can easily build a page <br /> without coding. Build your next landing page. With lots <br /> of unique blocks, you can easily build a page without <br /> coding any other page.
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
            High skilled coders <br />from worldwide.
          </h1>
          <p className="text-gray-600 mt-10">
            We share common trends and strategies for improving <br /> your rental income and making sure you stay in high <br /> demand of service. <br /><br />
            With lots of unique blocks, you can easily build a page <br /> without coding. Build your next landing page. With lots <br /> of unique blocks, you can easily build a page without <br /> coding any other page.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <div className="w-full flex-col text-center mb-12 px-4">
          <h1 className="text-4xl font-bold mb-4">Meet our team</h1>
          <p className="text-gray-600 ">
            With lots of unique blocks, you can easily build a page without coding <br />. Build your next consultancy website within few minutes.
          </p>
        </div>
        <div>
          <div className="w-full grid grid-cols-1 md:grid-cols-4 px-32 md:px-0 gap-6">
            {team.map((member, index) => (
              <div key={index} className=" w-64 md:w-52 flex flex-col items-center bg-white rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full object-cover mb-4"
                />
                <h2 className="text-lg font-bold">{member.name}</h2>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
            <div className="w-64 md:w-52 flex flex-col items-center justify-center mb-10 bg-white rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2">Interested to join 
              our team ?</h2>
              <a
                href="#"
                className="text-blue-500"
              >
                Apply now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About