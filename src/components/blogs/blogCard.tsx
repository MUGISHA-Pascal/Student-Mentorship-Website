import React from 'react';
import { motion } from 'framer-motion';

interface BlogCardProps {
  title: string;
  content: string;
  categories: string[];
  date?: string;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.3 } },
};

const BlogCard: React.FC<BlogCardProps> = ({ title, content, categories, date }) => {
  return (
    <motion.div
      className="border border-gray-300 rounded-xl p-4 mb-4 shadow-md bg-white cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div>
        <motion.img
          src='/images/blog.png'
          className='rounded-2xl h-64 w-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className='my-3 grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-2 px-2'>
        {categories.map((category, index) => (
          <motion.p
            key={index}
            className='bg-black text-white text-sm py-1 px-3 rounded-full text-nowrap text-center'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {category}
          </motion.p>
        ))}
      </div>
      <div className='mt-5 flex flex-col items-center'>
        <motion.h3
          className="text-xl font-bold text-black mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-gray-400 px-5 text-center font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {content}
        </motion.p>
      </div>
      <div className='mt-4 text-gray-500 font-bold px-5'>
        {date}
      </div>
    </motion.div>
  );
};

export default BlogCard;
