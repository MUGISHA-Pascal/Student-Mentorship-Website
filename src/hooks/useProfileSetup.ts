import { useState } from 'react';
import { useCoach } from '../context/CoachContext';

export const useProfileSetup = () => {
  const { coach, updateCoach } = useCoach();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    careers: [] as string[],
    experience: [] as { career: string; from: string; to: string; }[],
  });

  const handlePersonalDetails = (data: {
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
  }) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleCareerSelection = (careers: string[]) => {
    setFormData(prev => ({ ...prev, careers }));
    setStep(3);
  };

  const handleExperience = (experience: { career: string; from: string; to: string; }[]) => {
    setFormData(prev => ({ ...prev, experience }));
    
    // Update coach data in context and mark setup as completed
    updateCoach({
      ...formData,
      experience,
      setupCompleted: true,
      id: Date.now().toString(), // Temporary ID until backend integration
      rating: 0,
      reviewCount: 0,
      pricePerMonth: 0,
    });
  };

  return {
    step,
    formData,
    handlePersonalDetails,
    handleCareerSelection,
    handleExperience,
    isSetupComplete: coach?.setupCompleted,
  };
};