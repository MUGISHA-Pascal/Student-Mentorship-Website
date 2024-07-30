import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const testimonials = [
  {
    company: 'Amazon',
    quote: 'Partnering with this e-coaching platform was a game-changer. My new skills are sharper, and my career trajectory has skyrocketed!',
    name: 'Ilya Vasin',
    position: 'Software Engineer',
  },
  {
    company: 'Google',
    quote: 'An essential resource for students aiming to excel as Product Designers. The mentorship here is unparalleled.',
    name: 'Mariano Rosag',
    position: 'Software Engineer',
  },
  {
    company: 'Amazon',
    quote: 'This platform transformed my learning experience. It’s faster, more intuitive, and my progress is off the charts!',
    name: 'Oka Tomoaki',
    position: 'Software Engineer',
  },
];

const Testimonial = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="max-w-7xl mx-auto text-center">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center gap-5"
            variants={itemVariants}
          >
            <img src="/images/company.png" alt="" className="w-24" />
            <p className="w-[85%]">"{testimonial.quote}"</p>
            <div className="mt-4 flex w-full justify-center gap-x-3">
              <div className="w-14 h-14 rounded-full">
                <img src="/images/testimonial.png" alt="" />
              </div>
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p>{testimonial.position}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonial;

