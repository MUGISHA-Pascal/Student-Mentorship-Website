/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Search, Star, ArrowLeft, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import SelectStudentPhoto from "@/components/dashboard/student/selectStudentPhoto";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  avatar: string;
  rating: number;
  reviews: number;
  price: string;
  color: string;
  description: string;
}

interface Coach {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  oldPrice: string;
  newPrice: string;
  bio: string;
  experience: { role: string; period: string }[];
}

const NewProfileSetupPopup: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { user, role, fetchUser, loading, error } = useUserStore();
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse,
    // setSelectedCourse
  ] = useState<Course | null>(null);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    educationLevel: "",
    bio: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [courses, setCourses] = useState<Course[] | null>([]);
  const [loadingState, setLoadingState] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showCourseDetails, setShowCourseDetails] = useState<string | null>(
    null
  );
  // const [showCoachDetails, setShowCoachDetails] = useState<string | null>(null);
  const [mentors, setMentors] = useState<Coach[] | null>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingState(true);
      try {
        const response = await axios.get(
          "https://api.goyoungafrica.org/api/v1/student/careers"
        );
        setCourses(response.data);
        setLoadingState(false);
      } catch (err) {
        setErrorMsg("Failed to fetch courses. Please try again.");
        console.log(err);

        setLoadingState(false);
      }
    };

    fetchCourses();
  }, []);

  const handleBack = () => {
    if (step > 1) {
      if (step == 2) {
        setSelectedCoach(null);
        setMentors(null);
      }
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleUpdateProfile = async () => {
    // setStep(2);
    const formData = new FormData();

    formData.append("bio", personalDetails.bio);
    formData.append("educationLevel", personalDetails.educationLevel);

    if (image) {
      formData.append("image", image);
    }
    try {
      await axios.put(
        `https://api.goyoungafrica.org/api/v1/student/update/${user!.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //   // console.log("Profile setup completed", {
      //   //   selectedCourse,
      //   //   selectedCoach,
      //   //   personalDetails,
      //   // });
      //   // onClose();
      toast.success("Profile updated successfully");
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Checking the user data:", user);

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
        />
      ));
  };

  // const fetchMentors = async (careerId: string) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.goyoungafrica.org/api/v1/student/careers/mentors/${careerId}`
  //     );
  //     const data = await response.data.data;
  //     const formatYearPeriod = (startDate: string, endDate: string | null) => {
  //       const startYear = new Date(startDate).getFullYear();
  //       const currentYear = new Date().getFullYear();

  //       const endYear = endDate ? new Date(endDate).getFullYear() : currentYear;

  //       return endYear === currentYear
  //         ? `${startYear} - Present`
  //         : `${startYear} - ${endYear}`;
  //     };

  //     const mentorsData: Coach[] = data.map((mentor: any) => ({
  //       id: mentor.id,
  //       name: `${mentor.user.firstName} ${mentor.user.lastName}`,
  //       image: "https://i.pravatar.cc/150?img=10?height=64&width=64",
  //       rating: mentor.ratings?.length ? mentor.ratings[0].rating : 0,
  //       reviews: mentor.ratings?.length || 0,
  //       oldPrice: mentor.courses?.[0]?.price.oldPrice || "N/A",
  //       newPrice: mentor.courses?.[0]?.price.newPrice || "N/A",
  //       bio: mentor.bio || "",
  //       experience: mentor.workExperience.map((exp: any) => ({
  //         role: exp.position,
  //         period: formatYearPeriod(exp.startDate, exp.endDate),
  //       })),
  //     }));

  //     setMentors(mentorsData);
  //   } catch (error: unknown) {
  //     if (axios.isAxiosError(error)) {
  //       if (error.response) {
  //         switch (error.response.status) {
  //           case 400:
  //             console.error("Bad Request:", error.response.data.message);
  //             toast.error("Bad Request: " + error.response.data.message);
  //             break;
  //           case 404:
  //             console.error("Not Found:", error.response.data.message);
  //             toast.warning("No mentors found for this career.");
  //             break;
  //           case 500:
  //             console.error("Server Error:", error.response.data.message);
  //             toast.error(
  //               "An error occurred while fetching mentors. Please try again later."
  //             );
  //             break;
  //           default:
  //             console.error("Error:", error.response.data.message);
  //             toast.error("An unexpected error occurred. Please try again.");
  //             break;
  //         }
  //       } else if (error.request) {
  //         console.error("No response received:", error.request);
  //         toast.error(
  //           "Network error. Please check your internet connection and try again."
  //         );
  //       } else {
  //         console.error("Error setting up the request:", error.message);
  //         toast.error("Error setting up the request. Please try again.");
  //       }
  //     } else {
  //       // For non-Axios errors
  //       console.error("Unexpected Error:", error);
  //       toast.error("An unexpected error occurred. Please try again.");
  //     }
  //   }
  // };

  // const handleCourseSelect = (course: Course) => {
  //   setSelectedCourse(course);
  //   // fetchMentors(course.id);
  //   navigate('/student/welcome')
  // };

  const sendRequest = async (studentId: string, coachId: string) => {
    try {
      const response = await axios.put(
        "https://api.goyoungafrica.org/api/v1/student/sendRequest",
        {
          studentId: studentId,
          coachId: coachId,
        }
      );

      if (response.status === 200) {
        toast.success("Request sent to the mentor");
      } else {
        toast.success("Error sending request to the mentor");
        console.error("Error sending request:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const enrollStudent = async (careerId: string) => {
    if (!role) {
      toast.error("Student not found.");
      return;
    }

    try {
      const response = await axios.post("https://api.goyoungafrica.org/api/v1/student/enroll", {
        studentId: role.id,
        careerId: careerId,
      });
      toast.success(`${response.data.message}!`);
      // Navigate to a dashboard or welcome page after enrollment
      // toast.success("You've successfully enrolled in ");
      navigate("/student/welcome");
    } catch (error) {
      console.error("Enrollment failed:", error);
      toast.error("Enrollment failed. Please try again later.");
    }
  };

  const handleSendRequest = (studentId: string, coachId: string) => {
    console.log("handleSendRequest called with:", { studentId, coachId });
    sendRequest(studentId, coachId);
    handleNext();
  };

  const renderCourseCard = (
    course: Course,
    loading: boolean,
    error: string | null
  ) => {
    if (loading) {
      return (
        <div
          key={course.id}
          className="p-4 rounded-lg shadow bg-gray-100 flex items-center justify-center"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-800"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div key={course.id} className="p-4 rounded-lg shadow bg-red-100">
          <p className="text-sm text-red-600">Error: {error}</p>
        </div>
      );
    }

    return (
      <div key={course.id} className={`${course.color} p-4 rounded-lg border border-gray-500 mr-1`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#132F43] rounded-full flex items-center justify-center p-2">
                <File color="white" />
              </div>
              <h3 className="font-semibold text-gray-800">{course.title}</h3>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end items-center">
          <div className="flex space-x-2">
            <Button
              onClick={() => setShowCourseDetails(course.id)}
              className="w-1/2 bg-[#132F43] hover:bg-[#204b69] text-white"
            >
              Details
            </Button>
            <Button
              className="w-1/2 bg-white border border-[#132F43] text-[#132F43] hover:bg-[#132F43] hover:text-white transition-all duration-300"
              // onClick={() => {
              //   setSelectedCourse(course);
              //   handleCourseSelect(course);
              // }}
              onClick={() => enrollStudent(course.id)}
            >
              Enroll
            </Button>
          </div>
        </div>
        {showCourseDetails === course.id && (
          <div className="block lg:hidden md:hidden mt-4 p-3 bg-white rounded-lg">
            <div className="flex items-center justify-between space-x-2">
              <div className="w-8 h-8 bg-[#132F43] rounded-full flex items-center justify-center">
                <File color="white" />
              </div>
              <button title="Hide details" className="rounded-full w-8 h-8 p-0 flex items-center justify-center bg-gray-100 hover:bg-gray-200" onClick={() => setShowCourseDetails(null)}>
                <X size={16} />
              </button>
            </div>

            <div className="mt-2">
              <div className="w-full border border-blue-200 shadow-sm shadow-blue-200 rounded-lg py-4 px-2 flex">
                <div className="">
                  <p className="font-semibold mb-2">Course description</p>
                  <p className="text-sm text-gray-600">
                    {course.description}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-2 gap-x-3">
                <Button
                  size="sm"
                  className="w-1/2 bg-[#132F43] hover:bg-[#204b69] text-white"
                  // onClick={() => {
                  //   setSelectedCourse(course);
                  //   handleCourseSelect(course);
                  // }}
                  onClick={() => enrollStudent(course.id)}
                >
                  Enroll
                </Button>
                {/* <Button
                  size="sm"
                  className="w-1/2 bg-white border border-[#132F43] text-[#132F43] hover:bg-[#132F43] hover:text-white transition-all duration-300"
                >
                  Enquiry
                </Button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderStep = () => {
    const filteredCourses = courses?.filter((course) =>
      course?.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Enter Your Personal details
              </h2>
              <p className="text-sm text-gray-600">
                NB: This will appear on your profile
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <SelectStudentPhoto setImage={setImage} />
                </div>

                <Input
                  placeholder="Enter Your Highest Education Level"
                  className="bg-white text-gray-800"
                  value={personalDetails.educationLevel}
                  onChange={(e) =>
                    setPersonalDetails({
                      ...personalDetails,
                      educationLevel: e.target.value,
                    })
                  }
                />
                <Textarea
                  placeholder="Enter Your Bio"
                  className="bg-white text-gray-800"
                  value={personalDetails.bio}
                  onChange={(e) =>
                    setPersonalDetails({
                      ...personalDetails,
                      bio: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex gap-3 justify-center mt-6">
                <Button
                  onClick={handleUpdateProfile}
                  className="bg-[#132F43] hover:bg-[#204b69] text-white"
                >
                  Update profile
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-[#132F43] hover:bg-[#204b69] text-white"
                >
                  Skip
                </Button>
              </div>
            </div>

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
                    "People work better when they know what the goal is and why.
                    It is important that people look forward to coming to work
                    in the morning and enjoy working"
                  </p>
                  <p className="text-sm text-blue-500">- Elon Musk</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Select the course To continue
            </h2>
            <p className="text-sm text-gray-600">
              NB: This will determine the whole learning process within this
              platform
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 bg-white text-gray-800"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 gap-4 p-1 h-[60vh]">
              <div className="col-span-4 md:col-span-2 lg:col-span-2 space-y-4 overflow-y-scroll no-scrollbar">
                {filteredCourses?.map((course) =>
                  renderCourseCard(course, loadingState, errorMsg)
                )}
              </div>
              <div className="col-span-2">
                <div className="col-span-2 px-2">
                  {showCourseDetails && (
                    <div className="hidden lg:block md:block px-4 py-3 bg-white rounded-lg">
                      <div className="flex items-center justify-between space-x-2">
                        <div className="w-8 h-8 bg-[#132F43] rounded-full flex items-center justify-center p-2">
                          <File color="white" />
                        </div>
                        <button title="Hide details" className="rounded-full w-8 h-8 p-0 flex items-center justify-center bg-gray-100 hover:bg-gray-200" onClick={() => setShowCourseDetails(null)}>
                          <X size={16} />
                        </button>
                      </div>
                      <div className="my-5">
                        <h3 className="font-semibold text-xl text-gray-800">
                          {
                            courses?.find(
                              (course) => course.id === showCourseDetails
                            )?.title
                          }
                        </h3>
                      </div>
                      <div className="">
                        <div className="w-full border border-blue-200 shadow-sm shadow-blue-200 rounded-lg py-4 px-2 flex">
                          <div className="w-2/5">
                            <img
                              src="/images/course-description.png"
                              alt="GOYoungAfrica Logo"
                              width={400}
                              height={200}
                            />
                          </div>
                          <div className="w-3/5">
                            <p className="font-semibold mb-2">Course description</p>
                            <p className="text-sm text-gray-600">
                              {
                                courses?.find(
                                  (course) => course.id === showCourseDetails
                                )?.description
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-3 gap-x-3">
                          <Button
                            className="w-1/2 bg-[#132F43] hover:bg-[#204b69] text-white"
                            onClick={() => {
                              const selected = courses?.find(
                                (course) => course.id === showCourseDetails
                              );
                              if (selected) {
                                // setSelectedCourse(selected);
                                // handleCourseSelect(selected);
                                enrollStudent(selected.id)
                              }
                            }}
                          >
                            Enroll
                          </Button>
                          {/* <Button
                            className="w-1/2 bg-white border border-[#132F43] text-[#132F43] hover:bg-[#132F43] hover:text-white transition-all duration-300"
                          >
                            Enquiry
                          </Button> */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-800">
              Select Coach For: {selectedCourse?.title}
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 bg-white text-gray-800"
                placeholder="Search a coach By Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4 p-1 overflow-y-scroll h-[60vh]">
              <div className="space-y-4">
                {mentors ? (
                  mentors
                    .filter((coach) =>
                      coach.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((coach) => (
                      <div
                        key={coach.id}
                        className={`bg-white p-4 rounded-lg shadow ${selectedCoach?.id === coach.id
                          ? "border border-blue-500 bg-zinc-200"
                          : ""
                          }`}
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={coach.image}
                            alt={coach.name}
                            className="w-16 h-16 rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {coach.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              <span className="line-through">
                                {coach.oldPrice}
                              </span>{" "}
                              <span className="text-green-500">
                                {coach.newPrice}
                              </span>
                            </p>
                            <div className="flex items-center">
                              {renderStars(coach.rating)}
                              <span className="text-sm text-gray-600 ml-1">
                                ({coach.reviews} Reviews)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedCoach(coach)}
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <p>No mentors found for the selected career</p>
                )}
              </div>
              {selectedCoach && (
                <div className="h-[60vh] hidden lg:block md:block">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Coach {selectedCoach.name}
                    </h3>
                    <h3 className="font-semibold text-gray-800 mb-4">
                      About Coach
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {selectedCoach.bio}
                    </p>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Experience Timeline
                    </h4>
                    <div className="space-y-2">
                      {selectedCoach.experience.map((exp, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-black rounded-full"></div>
                          <p className="text-sm text-gray-600">
                            {exp.role}
                            <span className="text-gray-400 ml-2">
                              {exp.period}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    {selectedCoach && (
                      <div className="w-full mt-4">
                        <Button
                          onClick={() =>
                            handleSendRequest(user!.id, selectedCoach.id)
                          }
                          className="w-1/3 bg-blue-500 hover:bg-blue-600 text-white float-end"
                        >
                          Continue
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return <div>Loading student information...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[1200px] h-[95vh] p-0 overflow-hidden backdrop-blur-sm bg-blue-100 bg-opacity-60" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <div className="relative h-full flex flex-col">
          <div className="p-4 flex items-center justify-center shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4"
              onClick={handleBack}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">
              Setup Your Profile
            </h1>
          </div>
          <ScrollArea className="flex-grow">
            <div className="p-6">{renderStep()}</div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewProfileSetupPopup;
