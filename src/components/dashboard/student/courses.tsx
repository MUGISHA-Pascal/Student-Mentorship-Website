import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';

interface Course {
    title: string;
    image: string;
    extension: string;
    downloadLink: string;
    courseType: string;
}

const courses: Course[] = [
    { title: 'Course 1', image: 'https://via.placeholder.com/150', extension: 'PDF', downloadLink: '#', courseType: 'file' },
    { title: 'Course 2', image: 'https://via.placeholder.com/150', extension: 'MP4', downloadLink: '#', courseType: 'video' },
    { title: 'Course 3', image: 'https://via.placeholder.com/150', extension: 'PDF', downloadLink: '#', courseType: 'file' },
    { title: 'Course 4', image: 'https://via.placeholder.com/150', extension: 'PDF', downloadLink: '#', courseType: 'video' },
    { title: 'Course 5', image: 'https://via.placeholder.com/150', extension: 'MP4', downloadLink: '#', courseType: 'file' },
    { title: 'Course 2', image: 'https://via.placeholder.com/150', extension: 'MP4', downloadLink: '#', courseType: 'video' },
    { title: 'Course 3', image: 'https://via.placeholder.com/150', extension: 'PDF', downloadLink: '#', courseType: 'file' },
    { title: 'Course 4', image: 'https://via.placeholder.com/150', extension: 'PDF', downloadLink: '#', courseType: 'video' },
];

const Courses: React.FC = () => {
    const [showAll, setShowAll] = useState(false);

    const handleSeeAllClick = () => {
        setShowAll(!showAll);
    };

    const handleMore = () => {

    }

    const visibleCourses = showAll ? courses : courses.slice(0, 5);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Courses Available For You</h2>
                <button
                    onClick={handleSeeAllClick}
                    className="text-blue-400 hover:text-blue-600 font-semibold transition duration-700"
                >
                    {showAll ? 'Show Less' : 'See All'}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {visibleCourses.map((course, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg py-4 px-2 cursor-pointer">
                        <img
                            src={course.courseType === 'video' ? '/svgs/video_course.svg' : '/svgs/file_course.svg'}
                            alt={course.title}
                            className="w-4/5 object-contain rounded-md mb-4"
                        />

                        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{course.extension}</p>
                        <div className="flex justify-between">
                            <button className="" onClick={handleMore}>
                                <FaEllipsisH />
                            </button>
                            <a
                                href={course.downloadLink}
                                // download
                                className="hover:text-blue-500"
                            >
                                <img src='/svgs/download.svg' />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
