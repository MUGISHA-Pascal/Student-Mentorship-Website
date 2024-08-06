import React, { useState } from 'react';
import BlogCard from '../components/blogs/blogCard';
import { blogs } from '../utils/data/blogData';
import { motion } from 'framer-motion'

const tabs: string[] = [
  'Web Development',
  'Graphic Design',
  'Data Science',
  'Digital Marketing',
  'Content Writing',
  'SEO',
  'Photography',
  'Project Management',
  'Cybersecurity',
  'Mobile Development',
  'UI/UX Design',
  'AI',
  'Social Media',
  'Finance',
  'Creative Writing',
  'Machine Learning',
  'Public Speaking',
  'E-commerce',
  'Video Editing',
  'Python'
];

const h2Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
};

const pVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0 } },
};

const tabVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const Blog: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  const filteredBlogs = blogs.filter(blog => blog.categories.includes(activeTab));

  return (
    <div className="mx-auto px-4 py-8">
      <div className="text-center mb-12 px-4">
        <motion.h1
          className="text-4xl font-bold text-black mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={h2Variants}
        >Insights & Stories</motion.h1>
        <motion.p
          className="text-gray-600 md:px-[5%] lg:px-[10%] mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={pVariants}
        >
          Dive into our curated collection of articles and insights from industry experts and passionate learners. Whether you're looking for career advice, the latest trends, or inspiring success stories!
        </motion.p>
      </div>
      {/* <div className="flex overflow-scroll mb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 m-2 rounded-md font-bold text-nowrap ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div> */}
      <motion.div
        className="flex overflow-scroll mb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 1 }}
      >
        {tabs.map(tab => (
          <motion.button
            key={tab}
            className={`px-4 py-2 m-2 rounded-md font-bold text-nowrap ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
            onClick={() => setActiveTab(tab)}
            variants={tabVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {tab}
          </motion.button>
        ))}
      </motion.div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[4%] px-[2%]'>
        {filteredBlogs.map(blog => (
          <BlogCard key={blog.id} title={blog.title} content={blog.content} categories={blog.categories} date={blog.date} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
