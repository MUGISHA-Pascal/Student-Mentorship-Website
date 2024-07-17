import React, { useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaBriefcase, FaUserShield } from 'react-icons/fa';

const roles = [
  {
    id: 1,
    label: "I'm a student",
    icon: <FaUserGraduate size={20} />
  },
  {
    id: 2,
    label: "I'm a career coach/mentor",
    icon: <FaChalkboardTeacher size={20} />
  },
  {
    id: 3,
    label: "I'm an employer",
    icon: <FaBriefcase size={20} />
  },
  {
    id: 4,
    label: "I'm a GCA admin",
    icon: <FaUserShield size={20} />
  },
];

interface RoleSelectionProps {
  onRoleSelect: (selectedRole: number) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const handleContinue = () => {
    if (selectedRole !== null) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="w-full flex flex-col items-start px-6 mt-14">
      <div className="w-full flex justify-center items-center mb-8">
        <div className="h-16 pt-3 px-4 flex flex-row items-center justify-center bg-blue-100 rounded-xl">
          <FaBriefcase className="w-12 h-12 mb-4 mr-2" />
          <span className="text-2xl font-bold">GOYA</span>
        </div>
      </div>
      <div className="w-full text-center justify-center mb-4">
        <p className="text-center text-lg font-normal text-gray-400 mx-10 mb-4">
          Choose a role to continue to <br />
          <span className="font-bold text-black">GOYA App</span>
        </p>
      </div>
      {roles.map(role => (
        <button
          key={role.id}
          onClick={() => setSelectedRole(role.id)}
          className={`w-full flex flex-row items-center p-3 mb-4 rounded-lg ${selectedRole === role.id ? 'bg-blue-600' : 'bg-blue-100'}`}
        >
          <div className="mr-4 bg-white rounded-md p-1">{role.icon}</div>
          <span className={`flex-1 font-semibold ${selectedRole === role.id ? 'text-white' : 'text-blue-600'}`}>{role.label}</span>
          <div className={`w-5 h-5 border-2 rounded-md ${selectedRole === role.id ? 'hidden' : 'border-blue-600'}`} />
          <div className={`bg-blue-300 rounded px-1 ${selectedRole === role.id ? '' : 'hidden'}`}>
            <span className="text-white font-semibold">Selected</span>
          </div>
        </button>
      ))}
      <button
        className={`mt-14 w-full p-4 rounded-full ${selectedRole ? 'bg-blue-600' : 'bg-gray-500 opacity-50'}`}
        disabled={!selectedRole}
        onClick={handleContinue}
      >
        <span className="text-center text-white font-semibold">Continue</span>
      </button>
    </div>
  );
};

export default RoleSelection;
