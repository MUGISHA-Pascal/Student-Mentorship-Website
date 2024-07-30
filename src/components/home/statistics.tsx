import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
    { value: "100K+", description: "Targeted Students to enroll in courses" },
    { value: "10K+", description: "Expected Employers looking for skilled workers" },
    { value: "5K+", description: "Mentors will be providing expert guidance" }
];

const Statistics = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    React.useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
    };

    return (
        <motion.div
            ref={ref}
            className="w-full flex flex-col md:flex-row md:justify-between items-center mt-4 md:mt-8 md:text-center md:px-28 shadow"
            variants={container}
            initial="hidden"
            animate={controls}
        >
            {stats.map((stat, index) => (
                <motion.div key={index} className="flex flex-col md:flex-row items-center gap-x-5 md:w-[25%] pb-10" variants={item}>
                    <h2 className="text-4xl font-bold">{stat.value}</h2>
                    <p>{stat.description}</p>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default Statistics;
