import React from 'react';

interface BlogCardProps {
  title: string;
  content: string;
  categories: string[];
  date?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, content, categories, date }) => {
  return (
    <div className="border border-gray-300 rounded-xl p-4 mb-4 shadow-md bg-white cursor-pointer">
      <div>
        <img src='/images/blog.png' className='rounded-2xl h-64 w-full' />
      </div>
      <div className='my-3 grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-2 px-2'>
        {categories.map((category, index) => (
          <p key={index} className='bg-black text-white text-sm py-1 px-3 rounded-full text-nowrap text-center'>
            {category}
          </p>
        ))}
      </div>
      <div className='mt-5 flex flex-col items-center'>
        <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
        <p className="text-gray-400 px-5 text-center font-semibold">{content}</p>
      </div>
      <div className='mt-4 text-gray-500 font-bold px-5'>
        {date}
      </div>
    </div>
  );
};

export default BlogCard;
