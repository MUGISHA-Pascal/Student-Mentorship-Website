import FAQ from "../components/join/faq";
import { motion } from 'framer-motion';

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

const h2Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
};

const pVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0 } },
};

const fadeIn = {
  hidden: { scale: 0.8 },
  visible: { scale: 1, transition: { duration: 1.5 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const Join = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-12 overflow-x-hidden">
      <div className="text-center mb-12 px-4">
        <motion.h1
          className="text-4xl font-bold mb-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={h2Variants}
        >Become a Part of GOYA</motion.h1>
        <motion.p
          className="text-gray-600 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={pVariants}
        >
          Ready to unlock your potential and make a meaningful impact? <br />
          Join GOYA and embark on a journey filled with growth, mentorship, and endless opportunities. <br />
          Together, we’ll transform your aspirations into achievements and shape the future of Africa.
        </motion.p>

      </div>
      <div className="w-full  my-10">
        <motion.img
          src="/images/join1.png"
          className="w-full h-[70%]"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        />
        {/* <video src="/videos/video2.mp4" className="h-full w-full" autoPlay muted loop /> */}
      </div>
      <div className="text-center mt-5 mb-16 px-4">
        <motion.h1
          className="text-3xl font-semibold mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={h2Variants}
        >Why you should join us?</motion.h1>
        <motion.p
          className="text-gray-600 font-semibold"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={pVariants}
        >
          To gain access to unparalleled mentorship, professional development opportunities, and a network of industry professionals.
          <br /> Empower your future with real-world project experience and career support.
        </motion.p>
      </div>
      <motion.div
        className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2 pr-[20%] lg:px-[10%] md:px-[8%]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {facts.map((fact, index) => (
          <motion.div
            key={index}
            className="flex gap-x-3 text-center mb-8 w-full sm:w-auto ml-[15%] md:ml-0"
            variants={itemVariants}
          >
            <div className="w-14 h-14 mb-2">
              <img src={fact.svg} alt={fact.title} />
            </div>
            <div className="flex-col items-center gap-x-2">
              <div>
                <h2 className="text-lg font-semibold mb-3">{fact.title}</h2>
                <p>{fact.subtitle}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="w-full px-3 md:px-[6%] md:mt-14">
        <FAQ />
      </div>
    </div>
  )
}

export default Join