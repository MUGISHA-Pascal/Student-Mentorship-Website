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
    visible: { opacity: 1, y: 0, x: 50, transition: { duration: 1.5, delay: 0.5 } },
};

const textVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5, delay: 0.6, staggerChildren: 0.8,
        delayChildren: 0.9, } },
};

const facts = [
    {
        number: '1',
        title: 'Seamless Connection',
        description: 'Easily connect with mentors, students, and employers through our platform.',
    },
    {
        number: '2',
        title: 'Expert Guidance',
        description: 'Receive valuable insights and advice from experienced mentors in your field.',
    },
    {
        number: '3',
        title: 'Achieve Your Goals',
        description: 'Track your progress and achieve your career goals with personalized coaching.',
    },
];

const WhyUs = () => {
    return (
        // <div className="w-full flex flex-col md:flex-row gap-x-12">
        //     <motion.div
        //         className="flex md:w-1/2 justify-center mb-12"
        //         initial="hidden"
        //         animate="visible"
        //         variants={imageVariants}
        //     >
        //         <img src="/images/what.png" alt="Why Choose Us" className="h-full rounded-lg shadow-lg" />
        //     </motion.div>
        //     <motion.div
        //         className="md:w-1/2 px-[5%] flex flex-col py-10 gap-8"
        //         initial="hidden"
        //         animate="visible"
        //         variants={containerVariants}
        //     >
        //         {facts.map((item, index) => (
        //             <motion.div
        //                 key={index}
        //                 className="flex items-center gap-x-5"
        //                 initial="hidden"
        //                 animate="visible"
        //                 variants={textVariants}
        //             >
        //                 <div className="text-blue-600 font-bold h-10 w-10 flex items-center justify-center p-2 bg-blue-100 rounded-full">
        //                     {item.number}
        //                 </div>
        //                 <div className="w-[70%] md:w-[55%] gap-y-5 text-start">
        //                     <h3 className="text-xl font-bold mb-2">{item.title}</h3>
        //                     <p className="text-gray-500">{item.description}</p>
        //                 </div>
        //             </motion.div>
        //         ))}
        //     </motion.div>
        // </div>
        <div className="w-full flex flex-col md:flex-row gap-x-12">
            <motion.div
                className="flex md:w-1/2 justify-center mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={imageVariants}
            >
                <img src="/images/what.png" alt="Why Choose Us" className="h-full rounded-lg shadow-lg" />
            </motion.div>
            <motion.div
                className="md:w-1/2 px-[5%] flex flex-col py-10 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={containerVariants}
            >
                {facts.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center gap-x-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.9 }}
                        variants={textVariants}
                    >
                        <div className="text-blue-600 font-bold h-10 w-10 flex items-center justify-center p-2 bg-blue-100 rounded-full">
                            {item.number}
                        </div>
                        <div className="w-[70%] md:w-[55%] gap-y-5 text-start">
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
