"use client";

import { useState, useEffect, useCallback } from "react";
import CoachIntro from "@/components/dashboard/student/coachIntro";
import MentorExperience from "@/components/dashboard/student/mentorExperience";
import Reviews from "@/components/dashboard/student/reviews";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "../Admin/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Check,
  ChevronRight,
  ArrowLeft,
  Briefcase,
  Users,
  BookOpen,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

// Define interfaces for our data types
interface Career {
  id: string;
  title: string;
  description: string;
}

interface Cohort {
  id: string;
  name: string;
  careerId: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface Course {
  id: string;
  name: string;
  careerId: string;
  description: string;
}

interface Mentor {
  id: string;
  name: string;
  fullName: string;
  phoneNumber: string;
  specialization: string;
  bio: string;
  avatar: string;
  courseIds: string[];
  reviews: number;
  rating: number;
}

export default function StudentMentorProfile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for the selection process
  const [currentStep, setCurrentStep] = useState(1);
  const [careers, setCareers] = useState<Career[]>([]);
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);

  // Selected items
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [selectedCohort, setSelectedCohort] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedMentor, setSelectedMentor] = useState<string>("");

  // Function to refresh the page that works in both Next.js and React
  const refreshPage = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    // Get user from localStorage
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser.user);
      }
    } catch (err) {
      console.error("Error parsing user data:", err);
      setError("Failed to load user data");
    } finally {
      setLoading(false);
    }

    // Fetch careers on initial load
    fetchCareers();
  }, []);

  // Fetch careers from the backend
  const fetchCareers = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/coach/get-careers"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch careers");
      }
      const data = await response.json();
      setCareers(data);
    } catch (err) {
      console.error("Error fetching careers:", err);
      setError("Failed to load careers");
    }
  };

  // Fetch cohorts based on selected career
  const fetchCohorts = async (careerId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/coach/cohorts?careerId=${careerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cohorts");
      }
      const data = await response.json();
      setCohorts(data);
    } catch (err) {
      console.error("Error fetching cohorts:", err);
      setError("Failed to load cohorts");
    }
  };

  // Fetch courses based on selected career
  const fetchCourses = async (careerId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/coach/courses?careerId=${careerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses");
    }
  };

  // Fetch mentors based on selected course
  const fetchMentors = async (courseId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/coach/mentors?courseId=${courseId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch mentors");
      }
      const data = await response.json();
      setMentors(data);
    } catch (err) {
      console.error("Error fetching mentors:", err);
      setError("Failed to load mentors");
    }
  };

  // Handle career selection
  const handleCareerSelect = (careerId: string) => {
    setSelectedCareer(careerId);
    fetchCohorts(careerId);
    fetchCourses(careerId);
  };

  // Handle cohort selection
  const handleCohortSelect = (cohortId: string) => {
    setSelectedCohort(cohortId);
  };

  // Handle course selection
  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
    fetchMentors(courseId);
  };

  // Handle mentor selection
  const handleMentorSelect = (mentorId: string) => {
    setSelectedMentor(mentorId);
  };

  // Move to the next step
  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // Move to the previous step
  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Handle final submission
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/student/assign-mentor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: user?.id,
            mentorId: selectedMentor,
            cohortId: selectedCohort,
            courseId: selectedCourse,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to assign mentor");
      }

      // Update local storage with the new mentor
      const updatedUser = { ...user, coach: selectedMentor };
      localStorage.setItem("user", JSON.stringify({ user: updatedUser }));
      setUser(updatedUser);

      // Refresh the page to show the mentor profile
      refreshPage();
    } catch (err) {
      console.error("Error assigning mentor:", err);
      setError("Failed to assign mentor");
    }
  };

  // Calculate progress percentage
  const progressPercentage = (currentStep / 4) * 100;

  // If still loading, show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // If user has a mentor, show the mentor profile
  if (user?.coach && user.coach.length > 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <CoachIntro
          image="/images/mentor_profile.png"
          name="Dr. Marcus"
          fullName="Dr. John Doe"
          phoneNumber="+250 780 000 000"
          specialization="IT Monetization"
          bio="Bio info about the coach on his background and also some experience info to give the student more interest."
          reviews={31}
        />
        <MentorExperience />
        <Reviews />
      </div>
    );
  }

  // If user doesn't have a mentor, show the mentor selection process
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Find Your Mentor</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Step {currentStep} of 4</span>
          <span className="text-sm font-medium">
            {progressPercentage}% Complete
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Steps indicator */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= step
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {currentStep > step ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{step}</span>
              )}
            </div>
            <span
              className={`text-xs mt-2 ${
                currentStep >= step
                  ? "text-blue-500 font-medium"
                  : "text-gray-500"
              }`}
            >
              {step === 1
                ? "Career"
                : step === 2
                ? "Cohort"
                : step === 3
                ? "Course"
                : "Mentor"}
            </span>
          </div>
        ))}
      </div>

      <Card className="p-6">
        {/* Step 1: Choose Career */}
        {currentStep === 1 && (
          <div>
            <div className="flex items-center mb-4">
              <Briefcase className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">Select a Career Path</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Choose the career path you're interested in pursuing. This will
              help us match you with the right mentor.
            </p>

            <RadioGroup
              value={selectedCareer}
              onValueChange={handleCareerSelect}
              className="space-y-3"
            >
              {careers.map((career) => (
                <div
                  key={career.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedCareer === career.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200"
                  }`}
                >
                  <RadioGroupItem
                    value={career.id}
                    id={`career-${career.id}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`career-${career.id}`}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <div>
                      <div className="font-medium">{career.title}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {career.description}
                      </div>
                    </div>
                    {selectedCareer === career.id && (
                      <ChevronRight className="h-5 w-5 text-blue-500" />
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleNextStep}
                disabled={!selectedCareer}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Choose Cohort */}
        {currentStep === 2 && (
          <div>
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">Select a Cohort</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Choose the cohort you want to join. Cohorts are groups of students
              who learn together.
            </p>

            {cohorts.length > 0 ? (
              <RadioGroup
                value={selectedCohort}
                onValueChange={handleCohortSelect}
                className="space-y-3"
              >
                {cohorts.map((cohort) => (
                  <div
                    key={cohort.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedCohort === cohort.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-200"
                    }`}
                  >
                    <RadioGroupItem
                      value={cohort.id}
                      id={`cohort-${cohort.id}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`cohort-${cohort.id}`}
                      className="flex justify-between items-center cursor-pointer"
                    >
                      <div>
                        <div className="font-medium">{cohort.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {new Date(cohort.startDate).toLocaleDateString()} -{" "}
                          {new Date(cohort.endDate).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge
                        className={`${
                          cohort.status === "UPCOMING"
                            ? "bg-blue-100 text-blue-800"
                            : cohort.status === "ONGOING"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {cohort.status}
                      </Badge>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No cohorts available for this career. Please select a different
                career.
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={!selectedCohort}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Choose Course */}
        {currentStep === 3 && (
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">Select a Course</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Choose the course you want to take. This will help us match you
              with a mentor who specializes in this area.
            </p>

            {courses.length > 0 ? (
              <RadioGroup
                value={selectedCourse}
                onValueChange={handleCourseSelect}
                className="space-y-3"
              >
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedCourse === course.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-200"
                    }`}
                  >
                    <RadioGroupItem
                      value={course.id}
                      id={`course-${course.id}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`course-${course.id}`}
                      className="flex justify-between items-center cursor-pointer"
                    >
                      <div>
                        <div className="font-medium">{course.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {course.description}
                        </div>
                      </div>
                      {selectedCourse === course.id && (
                        <ChevronRight className="h-5 w-5 text-blue-500" />
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No courses available for this career. Please select a different
                career.
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={!selectedCourse}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Choose Mentor */}
        {currentStep === 4 && (
          <div>
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">Select a Mentor</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Choose a mentor who will guide you through your learning journey.
            </p>

            {mentors.length > 0 ? (
              <RadioGroup
                value={selectedMentor}
                onValueChange={handleMentorSelect}
                className="space-y-4"
              >
                {mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedMentor === mentor.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-200"
                    }`}
                  >
                    <RadioGroupItem
                      value={mentor.id}
                      id={`mentor-${mentor.id}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`mentor-${mentor.id}`}
                      className="cursor-pointer"
                    >
                      <div className="flex items-start">
                        <Avatar className="h-16 w-16 mr-4">
                          <img
                            src={
                              mentor.avatar ||
                              "/placeholder.svg?height=64&width=64"
                            }
                            alt={mentor.name}
                          />
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <div className="font-medium text-lg">
                                {mentor.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {mentor.specialization}
                              </div>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">
                              {mentor.reviews} Reviews
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {mentor.bio}
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No mentors available for this course. Please select a different
                course.
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!selectedMentor}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Confirm Selection
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
