import React, { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Search, X, Upload, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface ProfileSetupPopupProps {
  isOpen: boolean;
  onClose: () => void;
  careersJsonUrl: string;
}


const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="w-full flex items-center justify-between">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <React.Fragment key={step}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step === currentStep ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
          }`}>
            {step}
          </div>
          {step < totalSteps && (
            <div className={`flex-1 h-1 ${
              step < currentStep ? 'bg-blue-500' : 'bg-white'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

interface Experience {
  career: string;
  from: string;
  to: string;
}

interface Career {
  id: string;
  name: string;
}

const ProfileSetupPopup: React.FC<ProfileSetupPopupProps> = ({ isOpen, onClose, careersJsonUrl }) => {
  const [step, setStep] = useState(1);
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: ''
  });
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [currentExperience, setCurrentExperience] = useState<Experience>({ career: '', from: '', to: '' });

  useEffect(() => {
    fetch(careersJsonUrl)
      .then(response => response.json())
      .then(data => setCareers(data))
      .catch(error => console.error('Error loading careers:', error));
  }, [careersJsonUrl]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log("Profile setup completed", { personalDetails, selectedCareers, experiences });
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  const handleAddCareer = (career: string) => {
    if (!selectedCareers.includes(career)) {
      setSelectedCareers([...selectedCareers, career]);
    }
    setSearchTerm('');
  };

  const handleRemoveCareer = (career: string) => {
    setSelectedCareers(selectedCareers.filter(c => c !== career));
  };

  const handleAddExperience = () => {
    if (currentExperience.career && currentExperience.from && currentExperience.to) {
      setExperiences([...experiences, currentExperience]);
      setCurrentExperience({ career: '', from: '', to: '' });
    }
  };

  const handleResetExperience = () => {
    setCurrentExperience({ career: '', from: '', to: '' });
  };

  const renderPersonalCareerCoach = () => (
    <div className="hidden md:block">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex justify-center items-center pt-12 text-gray-800">Personal Career Coach</h2>
        <img src="/images/test.png" alt="Career Coach Illustration" className="mx-auto" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-800">Almost there!</p>
          <p className="text-sm text-gray-600 mt-2">
            "People work better when they know what the goal is and why. It is important that people look forward to coming to work in the morning and enjoy working"
          </p>
          <p className="text-sm text-blue-500">- Elon Musk</p>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Enter Your Personal details</h2>
              <p className="text-sm text-gray-600">NB: This will appear on your profile</p>
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    placeholder="Enter First Name" 
                    className="bg-white text-gray-800" 
                    value={personalDetails.firstName}
                    onChange={(e) => setPersonalDetails({...personalDetails, firstName: e.target.value})}
                  />
                  <Input 
                    placeholder="Enter Last Name" 
                    className="bg-white text-gray-800" 
                    value={personalDetails.lastName}
                    onChange={(e) => setPersonalDetails({...personalDetails, lastName: e.target.value})}
                  />
                </div>
                <Input 
                  placeholder="Confirm Your Email Address" 
                  className="bg-white text-gray-800" 
                  value={personalDetails.email}
                  onChange={(e) => setPersonalDetails({...personalDetails, email: e.target.value})}
                />
                <Textarea 
                  placeholder="Enter Your Short Bio" 
                  className="bg-white text-gray-800" 
                  value={personalDetails.bio}
                  onChange={(e) => setPersonalDetails({...personalDetails, bio: e.target.value})}
                />
              </div>
              <Button onClick={handleNext} className="w-full bg-blue-500 text-white mt-4">
                Continue
              </Button>
            </div>
            {renderPersonalCareerCoach()}
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-500 text-center mb-8">
              2. Enter your working experience according to chronology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <Select onValueChange={(value) => setCurrentExperience({ ...currentExperience, career: value })}>
                    <SelectTrigger className="w-full bg-blue-500 text-white">
                      <SelectValue placeholder="Select Your Career" />
                    </SelectTrigger>
                    <SelectContent>
                      {careers.map((career) => (
                        <SelectItem key={career.id} value={career.name}>{career.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input 
                    placeholder="Or enter it manually" 
                    value={currentExperience.career}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, career: e.target.value })}
                    className="w-full dark:text-black"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-blue-500 font-medium">From</label>
                      <Input 
                        type="date" 
                        value={currentExperience.from}
                        onChange={(e) => setCurrentExperience({ ...currentExperience, from: e.target.value })}
                        className="w-full dark:text-black"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-blue-500 font-medium">To</label>
                      <Input 
                        type="date" 
                        value={currentExperience.to}
                        onChange={(e) => setCurrentExperience({ ...currentExperience, to: e.target.value })}
                        className="w-full dark:text-black"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddExperience} className="w-full bg-blue-500 text-white">Add</Button>
                  <Button onClick={handleResetExperience} variant="outline" className="w-full border-blue-500 text-blue-500 dark:bg-red-500 dark:text-white">Reset</Button>
                </CardContent>
              </Card>
              <div className="flex items-center justify-center h-full">
                <div className="h-px w-9/12 bg-black"></div>
              </div>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Experience Timeline</h3>
                  <div className="space-y-2">
                    {experiences.map((exp, index) => (
                      <div key={index} className="text-sm">
                        <p className="font-medium text-gray-800 dark:text-black">{exp.career}</p>
                        <p className="text-gray-500 dark:text-black">{exp.from} - {exp.to}</p>
                      </div>
                    ))}
                  </div>
                  <Button onClick={handleNext} className="w-full bg-blue-500 text-white">Continue</Button>
                </CardContent>
              </Card>
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold text-blue-500">Almost there!</p>
              <p className="text-sm text-gray-600">
                "Without commitment, you’ll never start, but more importantly, without consistency, you’ll never finish."
              </p>
              <p className="text-sm text-blue-500">- Denzel Washington</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-gray-800">Select the course To continue</h2>
              <p className="text-sm text-gray-600">NB: This will determine the whole learning process within this platform</p>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">Search and select the careers that you are fit to coach in</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    className="pl-10 bg-white text-gray-800"
                    placeholder="UI/UX Design"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {searchTerm && (
                  <div className="bg-white p-2 border rounded-md">
                    {careers
                      .filter(career => career.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map(career => (
                        <div 
                          key={career.id}
                          className="cursor-pointer hover:bg-gray-100 p-1 text-gray-800" 
                          onClick={() => handleAddCareer(career.name)}
                        >
                          {career.name} - Search suggestion on the possible occupations
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">Selected Careers:</label>
                <div className="flex flex-wrap gap-2">
                  {selectedCareers.map((career, index) => (
                    <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm flex items-center">
                      {career}
                      <X className="ml-1 w-4 h-4 cursor-pointer" onClick={() => handleRemoveCareer(career)} />
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-800">Upload a CV showing your proficiency</span>
                <Button variant="outline" size="sm" className="bg-blue-500 text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload a course
                </Button>
              </div>
              <Button onClick={handleNext} className="w-full bg-blue-500 text-white mt-4">
                Finish Setup
              </Button>
            </div>
            {renderPersonalCareerCoach()}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[1200px] h-[95vh] p-0 overflow-hidden backdrop-blur-sm bg-blue-100 bg-opacity-60">
        
        <div className="relative h-full flex flex-col">
        <div className="absolute top-0 left-0 right-0 p-4 z-10">
            <ProgressBar currentStep={step} totalSteps={3} />
          </div>
          <div className="mt-16 p-4 flex items-center justify-center shadow-sm">
            <Button variant="ghost" size="icon" onClick={handleBack} className="absolute left-4">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Setup Your Profile</h1>
          </div>
          <div className="flex-grow overflow-y-auto p-6">
            {renderStep()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileSetupPopup