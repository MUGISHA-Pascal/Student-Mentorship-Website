import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { FaPlus, FaStar, FaTimes, FaUpload } from "react-icons/fa";

const StarRating: React.FC<{ rating: number; setRating: (rating: number) => void }> = ({ rating, setRating }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar
          key={i}
          className={`cursor-pointer ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => setRating(i + 1)}
        />
      ))}
    </div>
  );
};

const MentorExperience: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const stats = [
    {
      image: '/svgs/activities.svg',
      value: 12,
      color: 'text-orange-500',
      title: 'Activities',
      status: 'Last week',
    },
    {
      image: '/svgs/mentors.svg',
      value: `80%`,
      color: 'text-green-500',
      title: 'Mentor-rate',
      status: 'Last week',
    },
  ]

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-10 mt-10">
      <div className="flex flex-col-reverse lg:flex-row gap-5">
        <div className="flex flex-col">
          <h3 className="font-semibold mb-6">Experience Timeline</h3>
          <ul className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="bg-blue-500 w-7 h-7 rounded-full font-semibold flex items-center justify-center text-sm">{index + 1}</span>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">Musician Manager At Hope Music</span>
                  <span className="text-gray-500 text-sm">2018 - 2024</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="flex items-center justify-center px-8 py-4 gap-x-3 rounded-lg text-center">
              <CardContent className="flex items-center p-6">
                <div>
                  <img src={stat.image} alt={stat.title} className="" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">{stat.value}</div>
                  <div className="text-sm font-medium">{stat.title}</div>
                  <div className="text-xs text-muted-foreground">{stat.status}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 ml-10">
        <button
          onClick={openModal}
          className="w-[65%] flex items-center gap-2 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600"
        >
          <FaUpload />
          Download CV
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-3/5 h-3/5 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <button
                className="absolute top-5 right-5 text-red-600"
                title="cancel"
                onClick={closeModal}
              >
                <FaTimes />
              </button>
              <h2 className="text-2xl font-bold mb-4">Upload a Course</h2>
              <form className="flex flex-col gap-4 w-full px-4">
                <input
                  type="text"
                  placeholder="Course Title"
                  className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
                />
                <textarea
                  placeholder="Course Description"
                  className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
                />
                <div className="bg-blue-400 cursor-pointer rounded-md flex items-center">
                  <input type="file" className="border px-2 py-1 rounded-md opacity-0 cursor-pointer" />
                  <p className="text-white font-semibold">Choose a file</p>
                </div>
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
                  onClick={closeModal}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="">
          <div className="w-64 h-48 border border-blue-100 p-4 rounded-xl">
            <h4 className="font-semibold mb-3">Add a review</h4>
            <textarea
              placeholder="Write your review"
              className="w-full h-4/5 border p-2 rounded-md mb-4 focus:outline-none bg-transparent focus:border-blue-500"
            />
          </div>
          <div className="flex justify-between items-center mt-3">
            <button className="bg-blue-500 text-white px-6 py-1 rounded-lg hover:bg-blue-600">
              Post
            </button>
            <StarRating rating={rating} setRating={setRating} />
          </div>
        </div>
      </div>
      <button className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors" title='New Action'>
        <FaPlus size={20} />
      </button>
    </div>
  );
};

export default MentorExperience;
