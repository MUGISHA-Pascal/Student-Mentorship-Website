import React, { useState } from "react";
import { FaVideo, FaBell, FaMoon, FaSun } from "react-icons/fa";

interface HeaderProps {
  name: string;
}
const Header: React.FC<HeaderProps> = ({ name }) => {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  }
  return (
    <header className="flex justify-between items-center p-4 bg-white">
      <div className="text-xl font-bold text-gray-800">{name}</div>
      <div className="flex items-center gap-4">
        <button className="flex items-center justify-center bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors">
          <FaVideo size={16} />
        </button>
        <button className="flex items-center bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
          + New Action
        </button>
        <div className="relative">
          <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
            <FaBell size={16} />
          </button>
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            2
          </span>
        </div>
        <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg">
          <button onClick={darkModeHandler} className="">
            {dark ? (
              <FaSun />
            ) : (
              <FaMoon />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;