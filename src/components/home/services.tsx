import { FaChalkboardTeacher, FaLaptopCode, FaBriefcase } from 'react-icons/fa';

const services = [
    {
        id: 1,
        icon: FaChalkboardTeacher,
        title: 'Career Coaching',
        description: 'Personalized coaching sessions to help students and professionals achieve their career goals and excel in their fields.'
    },
    {
        id: 2,
        icon: FaLaptopCode,
        title: 'Technical Skills Training',
        description: 'In-depth training in various technical skills, including programming, web development, data analysis, and more.'
    },
    {
        id: 3,
        icon: FaBriefcase,
        title: 'Job Placement Assistance',
        description: 'Support and guidance to help job seekers find suitable employment opportunities and succeed in their job applications.'
    }
];


const Services = () => {
    return (
        <div className='relative w-full h-auto py-12 px-0 md:px-10 flex flex-col md:flex-row gap-y-20 gap-x-20'>
            {services.map((service) => (
                <div key={service.id} className='group relative w-72 h-[335px] flex flex-col items-center'>
                    <div className='relative'>
                        <div className='relative w-72 h-auto'>
                            <div className='z-50 w-72 relative h-auto'>
                                <div className="relative bg-white w-72 h-[335px] rounded-xl shadow-lg hover:shadow-2xl group-hover:absolute group-hover:-top-10 transition-transform duration-1000 delay-900 ease-in-out">
                                    <div className="absolute w-20 h-20 rounded-full flex items-center justify-center bg-blue-600 inset-x-0 -top-9 left-[35%] transform group-hover:rotate-[360deg] transition-all duration-1000 ease-in-out">
                                        <div className="bg-white w-14 h-14 rounded-full p-2 flex justify-center items-center transition-all duration-1000">
                                            <service.icon className="text-blue-600" size={28} />
                                        </div>
                                    </div>
                                    <div className="pt-24 px-10">
                                        <h3 className="text-center font-bold mb-4">{service.title}</h3>
                                        <p className="text-center text-gray-600">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='absolute top-0 w-[200px] h-full rounded-lg z-10 bg-white transition-all duration-300'>yoo</div>
                    <div className='absolute top-0 w-[250px] h-[95%] rounded-lg z-10 bg-white  transition-all duration-300'>yoo</div>
                </div>
            ))}
        </div>
    );
};

export default Services;
