import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Video = () => {

    const typewriter = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 2,
                staggerChildren: 0.05,
            },
        },
    };

    const charVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 2,
                staggerChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="md:w-[30%] absolute px-7 left-0 md:left-24 md:top-16 md:mt-64">
            <motion.h1
                className="text-xl md:text-4xl font-bold mb-1 md:mb-4 text-start mix-blend-difference"
                variants={typewriter}
                initial="hidden"
                animate="visible"
            >
                {"Master Your Skills \n with Expert Mentors".split("").map((char, index) => (
                    <motion.span key={index} variants={charVariants}>
                        {char}
                    </motion.span>
                ))}
            </motion.h1>
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <motion.p
                    className="mb-3 md:mb-8 text-sm md:text-lg font-semibold text-start mix-blend-difference"
                    variants={item}
                >
                    Connect with experienced professionals
                </motion.p>
                <motion.div variants={item}>
                    <Link to="/register" className="hidden md:block">
                        <button className="flex items-center justify-center gap-x-2 md:gap-x-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm md:text-lg py-2 px-2 md:py-4 md:px-4 rounded-md text-nowrap">
                            Get started now
                            <FaArrowRight className="" />
                        </button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Video