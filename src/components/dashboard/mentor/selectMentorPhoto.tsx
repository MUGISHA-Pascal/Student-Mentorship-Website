import React, { useState } from "react";
import { Edit } from "lucide-react";
import Image from "/public/svgs/profile-avatar.svg";

// Add setImage as a prop to pass the image file to the parent component
const SelectMentorPhoto: React.FC<{ setImage: (image: File) => void }> = ({
  setImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Display the image preview
      setImage(file); // Pass the file object to the parent component
    }
  };

  return (
    <div className="relative w-36 h-36">
      <label
        htmlFor="photo-upload"
        className="cursor-pointer relative group"
        title="Select profile photo"
      >
        <img
          src={selectedImage || Image} // Show selected image or default placeholder
          alt="Profile"
          className="w-full h-full object-cover rounded-full border border-gray-200"
        />
        <div
          className="absolute bottom-4 right-0 flex items-center justify-center bg-blue-600 rounded-full p-2"
          title="Change photo"
        >
          <Edit className="text-white w-4 h-4" />
        </div>
      </label>
      <input
        type="file"
        id="photo-upload"
        accept="image/*"
        onChange={handleImageUpload} // Trigger file upload handler
        className="hidden"
      />
    </div>
  );
};

export default SelectMentorPhoto;
