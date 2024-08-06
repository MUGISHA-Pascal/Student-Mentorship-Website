import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.8,
            delayChildren: 0.9,
        },
    },
};

const imageVariants = {
    hidden: { opacity: 0, y: 20, x: -30 },
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 1.5, delay: 0.5 } },
};

const textVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
        opacity: 1, x: 0, transition: {
            duration: 1.5, delay: 0.6, staggerChildren: 0.8,
            delayChildren: 0.9,
        }
    },
};

// const facts = [
//     {
//         number: '1',
//         title: 'Seamless Connection',
//         description: 'Easily connect with mentors, students, and employers through our platform.',
//     },
//     {
//         number: '2',
//         title: 'Expert Guidance',
//         description: 'Receive valuable insights and advice from experienced mentors in your field.',
//     },
//     {
//         number: '3',
//         title: 'Achieve Your Goals',
//         description: 'Track your progress and achieve your career goals with personalized coaching.',
//     },
// ];

const facts = [
    {
        number: '1',
        title: 'Passion-Fueled Learning',
        description: 'Discover what you love and immerse yourself in learning experiences that ignite your passion.',
    },
    {
        number: '2',
        title: 'Mastery and Expertise',
        description: 'Hone your skills and excel in what you’re good at with expert guidance and resources.',
    },
    {
        number: '3',
        title: 'Valuable Pursuits',
        description: 'Engage in meaningful work that you can be paid for, aligning your career with financial sustainability.',
    },
    {
        number: '4',
        title: 'Impactful Contributions',
        description: 'Contribute to the world’s needs, making a positive impact through your chosen career path.',
    },
];


const WhyUs = () => {
    return (
        <div className="w-full flex flex-col  md:flex-row gap-x-[3%]">
            <motion.div
                className="flex md:w-1/2 justify-center items-center mb-12 lg:ml-20 md:ml-[5%] ml-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={imageVariants}
            >
                {/* <img src="/images/what.png" alt="Why Choose Us" className="h-full rounded-lg" /> */}
                <img src="/images/ikigai.png" alt="Why Choose Us" className="h-full rounded-lg" />
            </motion.div>
            <motion.div
                className="md:w-1/2 lg:px-[5%] md:px-0 flex flex-col items-center justify-center py-10 gap-y-8 lg:mr-[5%]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={containerVariants}
            >
                {facts.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex bg-white items-center justify-center gap-x-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={textVariants}
                    >
                        <div className="text-blue-600 font-bold h-10 w-10 flex items-center justify-center p-2 bg-blue-100 rounded-full">
                            {item.number}
                        </div>
                        <div className="w-[70%] lg:w-[70%] md:w-[70%] gap-y-5 text-start">
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-500">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default WhyUs;
