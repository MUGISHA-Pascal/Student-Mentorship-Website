/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { X, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SelectMentorPhoto from "@/components/dashboard/mentor/selectMentorPhoto";
import careersData from "@/utils/json/careers.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

interface ProfileSetupPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ExperienceEntry {
  career: string;
  company: string;
  startDate: string;
  endDate: string;
}

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void; // Callback function for step clicks
}

const ProgressBar = ({
  currentStep,
  totalSteps,
  onStepClick,
}: ProgressBarProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <React.Fragment key={step}>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${step === currentStep
                ? "bg-blue-500 text-white"
                : step < currentStep
                  ? "bg-blue-500 text-white cursor-pointer"
                  : "bg-gray-300 text-white cursor-not-allowed"
              }`}
            onClick={() => {
              if (step < currentStep) {
                onStepClick(step); // Only allow clicking steps before the current step
              }
            }}
          >
            {step}
          </div>
          {step < totalSteps && (
            <div
              className={`flex-1 h-1 ${step < currentStep ? "bg-blue-500" : "bg-gray-300"
                }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};


const ProfileSetupPopup: React.FC<ProfileSetupPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [careerCampany, setCareerCampany] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [experienceTimeline, setExperienceTimeline] = useState<
    ExperienceEntry[]
  >([]);
  const [bio, setBio] = useState<string>("");
  const [showSubmitted, setShowSubmitted] = useState(false);
  const navigate = useNavigate();

  const { user, fetchUser } = useUserStore();
  const userId = user?.id || null;

  useEffect(() => {
    if (!userId) {
      fetchUser(); // Fetch user data if not already available
    }
  }, [userId, fetchUser]);

  const handleAddCareer = (career: string) => {
    if (!selectedCareers.includes(career)) {
      setSelectedCareers([...selectedCareers, career]);
    }
    setSearchTerm("");
  };

  const handleRemoveCareer = (career: string) => {
    setSelectedCareers(selectedCareers.filter((c) => c !== career));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setShowSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedCareer("");
    setStartDate("");
    setEndDate("");
  };

  const handleComplete = () => {
    onClose();
    navigate("/waiting-approval");
  };

  const handleAddExperience = () => {
    if (selectedCareer && startDate && endDate && careerCampany) {
      setExperienceTimeline([
        ...experienceTimeline,
        { career: selectedCareer, startDate, endDate, company: careerCampany },
      ]);
      setSelectedCareer("");
      setCareerCampany("");
      setStartDate("");
      setEndDate("");
    }
  };

  const handleFileUpload = async (files: FileList, type: string) => {
    if (files.length > 1) {
      toast.error("Please upload only one file at a time.");
      return;
    }

    const file = files[0];
    if (type === "cv" && image && file.name === image.name) {
      toast.error("The image and CV cannot be the same file!");
      return;
    }
    if (type === "image" && selectedFile && file.name === selectedFile.name) {
      toast.error("The image and CV cannot be the same file!");
      return;
    }

    const newFile = {
      id: uuidv4(),
      name: file.name,
      inputFile: file,
      startTime: Date.now(),
      uploadedBytes: 0,
    };

    if (type === "cv") {
      setSelectedFile(file);
      setSelectedFileName(file.name);
    } else if (type === "image") {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("bio", bio);
    console.log(bio);

    if (image) formData.append("image", image);
    console.log(image);

    if (selectedCareers.length === 1)
      formData.append("career", selectedCareers[0]); // Changed from `careerIds` to `career`
    console.log("career", selectedCareers[0]);

    if (experienceTimeline.length)
      formData.append("workExperience", JSON.stringify(experienceTimeline));
    console.log("Timeline", experienceTimeline);

    if (selectedFile) formData.append("cv", selectedFile);
    console.log(image);

    try {
      console.log("Updating data: ", formData);

      await axios.put(
        `http://localhost:3000/api/v1/coach/coaches/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile updated successfully!");
      // setShowSubmitted(true);
      navigate("/mentor/waiting-approval")
    } catch (error) {
      toast.error("Failed to update profile.");
      console.log("Error while updating profile: ", error);
    }
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Enter Your Personal details
            </h2>
            <p className="text-sm text-gray-600">
              NB: This will appear on your profile
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <SelectMentorPhoto setImage={setImage} />
              </div>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter Your Short Bio"
                className="bg-white text-gray-800 h-40"
              />
              <Button
                className="w-full rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                size="sm"
                onClick={handleNext}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-800">
              Select the course To continue
            </h2>
            <p className="text-sm text-gray-600">
              NB: This will determine the whole learning process within this
              platform
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800">
                Search and select the careers that you are fit to coach in
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-10 bg-white text-gray-800"
                  placeholder="Search for a career"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {searchTerm && (
                <div className="bg-white p-2 border rounded-md max-h-40 overflow-y-auto">
                  {careersData
                    .filter((career) =>
                      career.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((career, index) => (
                      <div
                        key={index}
                        className="cursor-pointer hover:bg-gray-100 p-1 text-gray-800"
                        onClick={() => {
                          setSelectedCareer(career); // Update the selected career
                          setSearchTerm(""); // Clear the search term
                        }}
                      >
                        {career}
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="mt-4">
              <Button
                onClick={() => {
                  if (
                    selectedCareer &&
                    !selectedCareers.includes(selectedCareer)
                  ) {
                    setSelectedCareers((prev) => [...prev, selectedCareer]); // Add to selected careers
                    setSelectedCareer(""); // Reset the selected career
                  }
                }}
                disabled={!selectedCareer}
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
              >
                Add Career
              </Button>
            </div>
            <div className="mt-4">
              <h4 className="font-medium text-gray-800">Selected Careers:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCareers.map((career, index) => (
                  <span
                    key={index}
                    className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full"
                  >
                    {career}
                    <X
                      className="ml-2 cursor-pointer text-white"
                      onClick={() =>
                        setSelectedCareers(
                          selectedCareers.filter((c) => c !== career)
                        )
                      }
                    />
                  </span>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="relative flex w-4/5 items-center">
                <input
                  type="file"
                  id="cv-upload"
                  className="absolute left-20 opacity-0 bg-red-300 z-50 cursor-pointer"
                  onChange={(e) =>
                    e.target.files && handleFileUpload(e.target.files, "cv")
                  }
                />
                <label htmlFor="cv-upload">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-500 text-white ml-3"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {selectedFileName ? (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{selectedFileName}</span>
                      </p>
                    ) : (
                      <>Upload a CV</>
                    )}
                  </Button>
                </label>
              </div>
            </div>
            <Button
              className="w-full rounded-full bg-blue-500 hover:bg-blue-600"
              size="sm"
              onClick={handleNext}
            >
              Continue
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Enter your working experience
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <label className="block text-gray-700">
                  Select Your Career
                </label>
                <select
                  className="w-full p-2 border rounded bg-white text-gray-800"
                  value={selectedCareer}
                  onChange={(e) => setSelectedCareer(e.target.value)}
                >
                  <option value="">Select Your Career</option>
                  {careersData.map((career, index) => (
                    <option key={index} value={career}>
                      {career}
                    </option>
                  ))}
                </select>
                <label className="block text-gray-700">Company</label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="company name"
                  value={careerCampany}
                  onChange={(e) => setCareerCampany(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-gray-800 bg-white"
                />
                <label className="block text-gray-700">Start Date</label>

                <Input
                  type="date"
                  className="bg-white text-gray-800"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />

                <label className="block text-gray-700">End Date</label>
                <Input
                  type="date"
                  className="bg-white text-gray-800"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />

                <Button
                  className="w-full bg-blue-500 text-white my-2 rounded-full"
                  onClick={handleAddExperience}
                >
                  Add
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white text-blue-500 border-blue-500"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800">
                  Experience Timeline
                </h3>
                <div className="bg-white p-4 rounded-md space-y-4">
                  {experienceTimeline.length === 0 ? (
                    <p className="text-gray-500">No experience added yet.</p>
                  ) : (
                    experienceTimeline.map((exp, index) => (
                      <div key={index} className="relative">
                        <div className="text-sm pl-8">
                          <p className="font-medium text-gray-800">
                            {exp.career}
                          </p>
                          <p className="font-medium text-gray-700 text-[12px]">
                            {exp.company}
                          </p>
                          <p className="text-gray-500">
                            {new Date(exp.startDate).toLocaleDateString()} -{" "}
                            {new Date(exp.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="absolute left-0 top-2 flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div className="w-0.5 h-full bg-blue-500 ml-2"></div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              className="bg-blue-500 text-white rounded-full w-full mt-20"
            >
              Finish Setup
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={isOpen && !showSubmitted} onOpenChange={onClose}>
        <DialogContent className="max-w-[95vw] w-[1200px] h-[95vh] p-0 overflow-hidden backdrop-blur-sm bg-blue-100 bg-opacity-60" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
          <div className="relative h-full flex flex-col">
            <div className="absolute top-0 left-0 right-0 p-4 z-10">
              <ProgressBar
                currentStep={step}
                totalSteps={3}
                onStepClick={(clickedStep) => setStep(clickedStep)}
              />
            </div>
            <div className="flex-grow overflow-y-auto p-6 pt-20">
              <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Setup Your Profile
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="p-2 rounded-lg">{renderStep()}</div>
                <div className="hidden md:block">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex justify-center items-center pt-12 text-gray-800">
                      Personal Career Coach
                    </h2>
                    <img
                      src="/images/test.png"
                      alt="Career Coach Illustration"
                      className="mx-auto"
                    />
                    <div className="text-center">
                      <p className="text-lg font-medium text-gray-800">
                        Almost there!
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        "People work better when they know what the goal is and
                        why. It is important that people look forward to coming
                        to work in the morning and enjoy working"
                      </p>
                      <p className="text-sm text-blue-500">- Elon Musk</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileSetupPopup;
