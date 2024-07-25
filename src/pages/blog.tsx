import React, { useState } from 'react';
import BlogCard from '../components/blogs/blogCard';
import { blogs } from '../utils/data/blogData';

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

const Blog: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  const filteredBlogs = blogs.filter(blog => blog.categories.includes(activeTab));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl font-bold text-black mb-8">Insights & Stories</h1>
        <p className="text-gray-600 px-5 md:px-64 mb-8">
          Dive into our curated collection of articles and insights from industry experts and passionate learners. Whether you're looking for career advice, the latest trends, or inspiring success stories!
        </p>
      </div>
      <div className="flex overflow-scroll mb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 m-2 rounded-md font-bold text-nowrap ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-20 md:px-20'>
        {filteredBlogs.map(blog => (
          <BlogCard key={blog.id} title={blog.title} content={blog.content} categories={blog.categories} date={blog.date} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
