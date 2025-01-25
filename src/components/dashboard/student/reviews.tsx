import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface Review {
  id: number;
  name: string;
  date: string;
  content: string;
  rating: number;
}

const reviewsData: Review[] = [
  { id: 1, name: 'John Doe', date: '2 days ago', content: 'I was really impressed by this mentor due to how caring he is', rating: 3 },
  { id: 2, name: 'John Doe', date: '3 days ago', content: 'This mentor was extremely helpful and attentive to details.', rating: 4 },
  { id: 3, name: 'John Doe', date: '5 days ago', content: 'I learned a lot, though there were some challenges.', rating: 3 },
  { id: 4, name: 'John Doe', date: '1 week ago', content: 'A wonderful experience, I feel much more confident now.', rating: 5 },
  { id: 5, name: 'John Doe', date: '2 weeks ago', content: 'Great mentorship, but it could have been more organized.', rating: 3 },
  { id: 6, name: 'John Doe', date: '3 weeks ago', content: 'Very detailed and professional. Highly recommend.', rating: 4 },
  { id: 7, name: 'John Doe', date: '1 month ago', content: 'Excellent, could not have asked for more.', rating: 5 },
  { id: 8, name: 'John Doe', date: '2 months ago', content: 'The mentor was good but the pace was a bit slow.', rating: 3 },
  { id: 9, name: 'John Doe', date: '2 months ago', content: 'Really amazing guidance. I feel ready to take on new challenges.', rating: 4 },
];

const Reviews: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const handleToggleClick = () => {
    setShowAll(!showAll);
  };

  const visibleReviews = showAll ? reviewsData : reviewsData.slice(0, 4);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold underline">
          {reviewsData.length} Reviews
        </h2>
        <button
          onClick={handleToggleClick}
          className="text-blue-500 hover:underline"
        >
          {showAll ? 'See Less' : 'See All'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-10">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="p-4 rounded-lg border shadow-md"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold">{review.name}</h3>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="text-gray-700 mb-2">{review.content}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`mr-1 ${
                    i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;