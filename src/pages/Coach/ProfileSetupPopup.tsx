import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Search, Upload, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ProfileSetupPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="w-full flex items-center justify-between">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <React.Fragment key={step}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            {step}
          </div>
          {step < totalSteps && (
            <div className={`flex-1 h-1 ${
              step < currentStep ? 'bg-blue-500' : 'bg-gray-300'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

const ProfileSetupPopup: React.FC<ProfileSetupPopupProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddCareer = (career: string) => {
    if (!selectedCareers.includes(career)) {
      setSelectedCareers([...selectedCareers, career]);
    }
    setSearchTerm('');
  };

  const handleRemoveCareer = (career: string) => {
    setSelectedCareers(selectedCareers.filter(c => c !== career));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Enter Your Personal details</h2>
            <p className="text-sm text-gray-600">NB: This will appear on your profile</p>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Enter First Name" className="bg-white" />
                <Input placeholder="Enter Last Name" className="bg-white" />
              </div>
              <Input placeholder="Confirm Your Email Address" className="bg-white" />
              <Textarea placeholder="Enter Your Short Bio" className="bg-white" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select the course To continue</h2>
            <p className="text-sm text-gray-600">NB: This will determine the whole learning process within this platform</p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Search and select the careers that you are fit to coach in</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-10 bg-white"
                  placeholder="UI/UX Design"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {searchTerm && (
                <div className="bg-white p-2 border rounded-md">
                  <div className="cursor-pointer hover:bg-gray-100 p-1" onClick={() => handleAddCareer(searchTerm)}>
                    {searchTerm} - Search suggestion on the possible occupations
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Selected Careers:</label>
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
              <span className="text-sm">Upload a CV showing your proficience</span>
              <Button variant="outline" size="sm" className="bg-blue-500 text-white">
                <Upload className="w-4 h-4 mr-2" />
                Upload a course
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Enter your working experience according to chlonogy</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <select className="w-full p-2 border rounded bg-white">
                  <option>Select Your Career</option>
                  {selectedCareers.map((career, index) => (
                    <option key={index}>{career}</option>
                  ))}
                </select>
                <Input type="date" placeholder="From" className="bg-white" />
                <Input type="date" placeholder="To" className="bg-white" />
                <Button className="w-full bg-blue-500 text-white">Add</Button>
                <Button variant="outline" className="w-full">Reset</Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Experience Timeline</h3>
                <div className="bg-white p-4 rounded-md space-y-2">
                  <div className="text-sm">
                    <p className="font-medium">Musician Manager At Hope Music</p>
                    <p className="text-gray-500">2018 - 2024</p>
                  </div>
                  {/* Add more experience items here */}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="max-w-[95vw] w-[1200px] h-[95vh] p-0 overflow-hidden backdrop-blur-sm bg-blue-100 bg-opacity-40 border-none	">
        <div className="relative h-full flex flex-col ">
          <div className="absolute top-0 left-0 right-0 p-4 z-10">
            <ProgressBar currentStep={step} totalSteps={3} />
          </div>
          <div className="flex-grow overflow-y-auto p-6 pt-20 ">
            <h1 className="text-2xl font-bold mb-6">Setup Your Profile</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-none bg-opacity-0 backdrop-blur-sm p-6 rounded-lg">
                {renderStep()}
              </div>
              <div className="hidden md:block">
                <div className="space-y-4 ">
                  <h2 className="text-xl font-semibold flex justify-center items-center pt-12">Personal Career Coach</h2>
                  <img src="/?height=200&width=300" alt="Career Coach Illustration" className="" />
                  <div className="text-center">
                    <p className="text-lg font-medium">Almost there!</p>
                    <p className="text-sm text-gray-600 mt-2">
                      "Some Quote to inspire the user on the progress and setup of the account"
                    </p>
                    <p className="text-sm text-blue-500">- Author</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t flex justify-between overflow-hidden backdrop-blur-sm bg-opacity-40 border-none">
            <Button onClick={() => setStep(Math.max(1, step - 1))} className="bg-blue-500 text-white" disabled={step === 1}>
              Back
            </Button>
            <Button onClick={() => setStep(Math.min(3, step + 1))} className="bg-blue-500 text-white">
              {step === 3 ? 'Finish Setup' : 'Continue'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileSetupPopup