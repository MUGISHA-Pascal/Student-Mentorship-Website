import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaChalkboardTeacher, FaLaptopCode, FaBriefcase } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const services = [
    {
        id: 1,
        icon: FaChalkboardTeacher,
        title: 'Career Coaching',
        description: 'Personalized coaching sessions to help students and professionals achieve their career goals and excel in their fields.',
    },
    {
        id: 2,
        icon: FaLaptopCode,
        title: 'Technical Skills Training',
        description: 'In-depth training in various technical skills, including programming, web development, data analysis, and more.',
    },
    {
        id: 3,
        icon: FaBriefcase,
        title: 'Job Placement Assistance',
        description: 'Support and guidance to help job seekers find suitable employment opportunities and succeed in their job applications.',
    },
];

const Services = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const iconVariants = {
        hidden: { rotate: 0 },
        visible: { rotate: -360, transition: { delay: 0.5, duration: 1 } },
    };

    return (
        <motion.div
            ref={ref}
            className="relative w-full h-auto pt-20 pb-12 px-0 md:px-10 flex flex-col md:flex-row gap-y-20 gap-x-20 items-center"
            variants={container}
            initial="hidden"
            animate={controls}
        >
            {services.map((service) => (
                <motion.div
                    key={service.id}
                    className="group relative w-72 h-[335px] flex flex-col items-center"
                    variants={item}
                >
                    <div className="relative">
                        <div className="relative w-72 h-auto">
                            <div className="z-50 w-72 relative h-auto">
                                <motion.div
                                    className="relative bg-white w-72 h-[335px] rounded-xl shadow-lg hover:shadow-2xl"
                                    initial={{ top: 0 }}
                                    whileHover={{ top: '-2.5rem' }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeInOut' }}
                                >
                                    <motion.div
                                        className="absolute w-20 h-20 rounded-full flex items-center justify-center bg-blue-600 inset-x-0 -top-9 left-[35%] transform group-hover:rotate-[360deg] transition-all duration-1000 ease-in-out"
                                        variants={iconVariants}
                                    >
                                        <div className="bg-white w-14 h-14 rounded-full p-2 flex justify-center items-center transition-all duration-1000 group-hover:rotate-[360deg]">
                                            <service.icon className="text-blue-600" size={28} />
                                        </div>
                                    </motion.div>
                                    <div className="pt-24 px-10">
                                        <motion.h3
                                            className="text-center font-bold mb-4"
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                                        >
                                            {service.title}
                                        </motion.h3>
                                        <motion.p
                                            className="text-center text-gray-600"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }}
                                        >
                                            {service.description}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 w-[200px] h-full rounded-lg z-10 bg-white transition-all duration-300">yoo</div>
                    <div className="absolute top-0 w-[250px] h-[95%] rounded-lg z-10 bg-white transition-all duration-300">yoo</div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default Services;
