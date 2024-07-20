/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FaBriefcase } from 'react-icons/fa';

interface CareerSelectionProps {
  onCareerSelect: (career: string) => void;
  isSubmitting: boolean;
}

const CareerSelection: React.FC<CareerSelectionProps> = ({ onCareerSelect, isSubmitting }) => {
  const [career, setCareer] = useState('');
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [suggestions] = useState<string[]>([
    'Software engineer',
    'Football player',
    'Data scientist',
    'Product manager'
  ]);

  const handleCareerSelect = (career: string) => {
    setSelectedCareer(career);
    setCareer('');
    console.log(career);
  };

  const handleContinue = () => {
    if (selectedCareer) {
      onCareerSelect(selectedCareer);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 p-6 h-screen">
      <div className="w-full flex justify-center items-center mb-8">
        <div className="h-16 pt-3 px-4 flex flex-row items-center justify-center bg-blue-100 rounded-xl">
          <FaBriefcase className="w-12 h-12 mb-4 mr-2" />
          <span className="text-2xl font-bold">GOYA</span>
        </div>
      </div>
      <p className="text-center text-lg font-normal text-gray-400 mx-10 mb-4">
        Choose the career you want from <br />
        <span className="font-bold text-black">GOYA App</span>
      </p>
      <input
        type="text"
        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
        placeholder="Type in a career"
        value={career}
        onChange={(e) => setCareer(e.target.value)}
      />
      {career.length > 0 && (
        <ul className="w-full p-0 list-none">
          {suggestions
            .filter(s => s.toLowerCase().includes(career.toLowerCase()))
            .map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleCareerSelect(item)}
                  className="w-full p-4 border-b border-gray-200 text-left"
                >
                  {item}
                </button>
              </li>
            ))}
        </ul>
      )}
      {selectedCareer && (
        <div className="flex flex-row items-center mt-4">
          <span className="p-2 bg-blue-200 rounded-lg">{selectedCareer}</span>
          <button onClick={() => setSelectedCareer(null)} className="ml-2">
            <span className="text-red-500">X</span>
          </button>
        </div>
      )}
      <button
        className={`mt-14 w-full p-4 rounded-full ${selectedCareer ? 'bg-blue-600' : 'bg-gray-500 opacity-50'}`}
        disabled={!selectedCareer || isSubmitting}
        onClick={handleContinue}
      >
        {isSubmitting ? (
          <span className="text-center text-white font-semibold">Submitting ...</span>
        ) : (
          <span className="text-center text-white font-semibold">Continue</span>
        )}
      </button>
    </div>
  );
};

export default CareerSelection;
