import React, { useState } from "react";
import { Edit } from "lucide-react";
import Image from "/public/svgs/profile-avatar.svg";

const SelectStudentPhoto: React.FC<{ setImage: (imag: File) => void }> = ({
  setImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
      setImage(file);
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
          src={selectedImage || Image}
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
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default SelectStudentPhoto;
