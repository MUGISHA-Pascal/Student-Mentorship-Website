import React from "react";
import { FaStar } from "react-icons/fa";

interface CoachIntroProps {
  image: string;
  name: string;
  fullName: string;
  email: string;
  specialization: string;
  bio: string;
  reviews: number;
}

const CoachIntro: React.FC<CoachIntroProps> = ({
  image,
  name,
  fullName,
  email,
  specialization,
  bio,
  reviews,
}) => {
  const renderStars = (reviews: number) => {
    const fullStars = Math.floor(reviews / 10);
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < fullStars ? "text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="w-full flex p-4 gap-x-5 rounded-lg">
      <div className="w-[35%] flex flex-col items-start">
        <img
          src={image || "/svgs/avatar1.svg?height=64&width=64"}
          alt={name}
          className="w-full rounded-lg object-cover border"
        />
        <p className="text-center mt-2 font-bold text-lg text-blue-600 px-3">
          {name}
        </p>
      </div>
      <div className="border border-blue-400 ml-10" />
      <div className="w-[65%] flex-grow">
        <div className="flex justify-between mb-4">
          <div className="space-y-2">
            <div className="flex">
              <span className="font-bold">Full Name</span>
              <span className="ml-2">:</span>
              <span className="ml-2 text-blue-600">{fullName}</span>
            </div>

            <div className="flex">
              <span className="font-bold">Email</span>
              <span className="ml-2">:</span>
              <span className="ml-2 text-blue-600">{email}</span>
            </div>

            {/* <div className="flex">
              <span className="font-bold">Specialisation</span>
              <span className="ml-2">:</span>
              <span className="ml-2 text-blue-600">{specialization}</span>
            </div> */}

            <div className="flex">
              <span className="font-bold">Bio</span>z
              <span className="ml-2 text-gray-500 max-w-sm">
                {bio ? bio : "no bio "}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <a href="#" className="text-blue-500 mr-2">
            {reviews} Reviews
          </a>
          <div className="flex">{renderStars(reviews)}</div>
        </div>
      </div>
    </div>
  );
};

export default CoachIntro;
