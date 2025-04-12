// src/components/BlogCard.jsx
import { Blog } from "@/types/blog";
import React from "react";
import { useNavigate } from "react-router-dom";


interface BlogCardProps {
    blog: Blog;
}
const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    const navigate = useNavigate();

    const year = new Date(blog.dateCreated).getFullYear();

    return (
        <div className="group bg-white rounded-3xl overflow-hidden relative h-[430px]">
            <img src={blog.image} alt={blog.title} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300 rounded-tr-3xl rounded-tl-3xl" />
            <div className="w-full h-56 py-8 px-6 bg-gray-200 bottom-0 absolute rounded-3xl">
                {blog.isNew && (
                    <div className="absolute -top-3 py-1 px-4 rounded-full bg-blue-500 text-white font-medium z-10">
                        New
                    </div>
                )}
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">{blog.title}</h2>
                <div className="flex items-center space-x-5 text-sm text-gray-600 mb-2">
                    {blog.category && <span className="font-bold text-lg text-blue-500 group-hover:text-black transition-colors duration-300">{blog.category}</span>}
                    <span>-</span>
                    <span>{new Date(blog.dateCreated).toLocaleDateString()}</span>
                </div>
                <button
                    onClick={() => navigate(`/blogs/${year}/${blog.slug}`)}
                    className="absolute bottom-5 bg-blue-500 font-bold text-white px-5 py-2 rounded-full hover:bg-blue-700 duration-500"
                >
                    Read More
                </button>
            </div>
        </div>
    );
};

export default BlogCard;
