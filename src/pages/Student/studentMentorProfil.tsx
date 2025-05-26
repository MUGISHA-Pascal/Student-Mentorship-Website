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
import { Alert, AlertDescription } from "../Admin/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Check,
  ChevronRight,
  ArrowLeft,
  Briefcase,
  Users,
  BookOpen,
  User,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  firstName: string;
  lastName: string;
  specialization?: string;
  coach: {
    id: string;
    bio: string;
    image?: string;
  };
}

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  student?: {
    coachId?: string;
    addedMentor?: boolean;
    approved?: boolean;
    coach?: {
      id: string;
      bio: string;
      image?: string;
      user: {
        firstName: string;
        lastName: string;
        email: string;
      };
    };
  };
}

export default function StudentMentorProfile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [addedForm, setAddedForm] = useState(false);

  // State for the selection process
  const [currentStep, setCurrentStep] = useState(1);
  const [careers, setCareers] = useState<Career[]>([]);
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [hasMentor, setHasMentor] = useState(false);

  // Selected items
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [selectedCohort, setSelectedCohort] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedMentor, setSelectedMentor] = useState<string>("");

  // Loading states for each step
  const [loadingCohorts, setLoadingCohorts] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingMentors, setLoadingMentors] = useState(false);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Fetch user data by ID with improved error handling
  const fetchUserData = useCallback(async (userId: string) => {
    if (!userId) return null;

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/get-user/${userId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }

      const data = await response.json();
      console.log("Updated user data:", data);

      // Update user state with fresh data
      setUser(data);

      // Update addedForm boolean from backend data
      setAddedForm(!!data.student?.addedMentor);

      // Check if user has a mentor assigned and approved
      const hasAssignedMentor = !!(
        data.student?.coachId && data.student?.coach
      );
      const isApproved = !!data.student?.approved;
      setHasMentor(hasAssignedMentor && isApproved);

      // Update localStorage with fresh data
      localStorage.setItem("user", JSON.stringify({ user: data }));

      console.log("Updated states:", {
        addedForm: !!data.student?.addedMentor,
        hasMentor: hasAssignedMentor && isApproved,
        hasCoach: !!data.student?.coach,
        isApproved: isApproved,
      });

      return data;
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load user data. Please try refreshing the page.");
      throw err;
    }
  }, []);

  // Initialize component
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user from localStorage
        const userData = localStorage.getItem("user");
        if (!userData) {
          setError("No user data found. Please log in again.");
          return;
        }

        const parsedUser = JSON.parse(userData);
        if (!parsedUser.user?.id) {
          setError("Invalid user data. Please log in again.");
          return;
        }

        // Fetch fresh user data from server
        await fetchUserData(parsedUser.user.id);

        // Fetch careers for the selection process
        await fetchCareers();
      } catch (err) {
        console.error("Error initializing component:", err);
        setError("Failed to initialize. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    initializeComponent();
  }, [fetchUserData]);

  // Fetch careers from the backend
  const fetchCareers = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/coach/get-careers"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch careers: ${response.status}`);
      }
      const data = await response.json();
      setCareers(data);
    } catch (err) {
      console.error("Error fetching careers:", err);
      setError("Failed to load careers. Please try again.");
    }
  };

  // Fetch cohorts based on selected career
  const fetchCohorts = async (careerId: string) => {
    try {
      setLoadingCohorts(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3000/api/v1/coach/cohortByCareerId/${careerId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch cohorts: ${response.status}`);
      }
      const data = await response.json();
      setCohorts(data);
    } catch (err) {
      console.error("Error fetching cohorts:", err);
      setError(
        "Failed to load cohorts. Please try selecting a different career."
      );
    } finally {
      setLoadingCohorts(false);
    }
  };

  // Fetch courses based on selected career
  const fetchCourses = async (careerId: string) => {
    try {
      setLoadingCourses(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3000/api/v1/coach/coursesByCareerId/${careerId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.status}`);
      }
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(
        "Failed to load courses. Please try selecting a different career."
      );
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const fetchMentors = async () => {
    try {
      setLoadingMentors(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3000/api/v1/coach/get-mentors`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch mentors: ${response.status}`);
      }
      const data = await response.json();
      console.log("Mentors data:", data);
      setMentors(data);
    } catch (err) {
      console.error("Error fetching mentors:", err);
      setError("Failed to load mentors. Please try again.");
    } finally {
      setLoadingMentors(false);
    }
  };

  const handleCareerSelect = async (careerId: string) => {
    setSelectedCareer(careerId);
    // Reset dependent selections
    setSelectedCohort("");
    setSelectedCourse("");
    setSelectedMentor("");
    setCohorts([]);
    setCourses([]);
    setMentors([]);

    // Fetch cohorts and mentors in parallel
    await Promise.all([fetchCohorts(careerId), fetchMentors()]);
  };

  // Handle cohort selection
  const handleCohortSelect = (cohortId: string) => {
    setSelectedCohort(cohortId);
  };

  // Handle mentor selection
  const handleMentorSelect = async (mentorId: string) => {
    setSelectedMentor(mentorId);
    // Reset course selection
    setSelectedCourse("");
    setCourses([]);

    // Fetch courses after mentor selection
    if (selectedCareer) {
      await fetchCourses(selectedCareer);
    }
  };

  // Move to the next step
  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
    setError(null); // Clear any errors when moving to next step
  };

  // Move to the previous step
  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
    setError(null); // Clear any errors when moving back
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      setError("User data is missing. Please refresh and try again.");
      return;
    }
    if (!selectedCareer) {
      setError("Please select a career path.");
      return;
    }
    if (!selectedCohort) {
      setError("Please select a cohort.");
      return;
    }
    if (!selectedMentor) {
      setError("Please select a mentor.");
      return;
    }
    if (!selectedCourse) {
      setError("Please select a course.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch(
        "http://localhost:3000/api/v1/student/assign-mentor",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: user.id,
            mentorId: selectedMentor,
            cohortId: selectedCohort,
            courseId: selectedCourse,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Assignment failed: ${response.status}`
        );
      }

      setSuccess(
        "Mentor assigned successfully! Loading your updated profile..."
      );

      // Fetch updated user data to ensure everything is current
      await fetchUserData(user.id);

      // Small delay to show success message before transitioning
      setTimeout(() => {
        setSuccess(null);
      }, 1500);
    } catch (err) {
      console.error("Error assigning mentor:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to assign mentor. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate progress percentage
  const progressPercentage = (currentStep / 4) * 100;

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );

  // If still loading, show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  console.log("Current state check:", {
    hasMentor,
    hasCoach: !!user?.student?.coach,
    isApproved: !!user?.student?.approved,
    addedForm,
    fullCondition: hasMentor && user?.student?.coach && user?.student?.approved,
  });

  // If user has a mentor assigned and is approved, show the mentor profile
  if (hasMentor && user?.student?.coach && user?.student?.approved) {
    return (
      <div className="container mx-auto px-4 py-8">
        <CoachIntro
          image={user.student.coach.image}
          name={`${user.student.coach.user.firstName} ${user.student.coach.user.lastName}`}
          fullName={`${user.student.coach.user.firstName} ${user.student.coach.user.lastName}`}
          email={user.student.coach.user.email}
          specialization=""
          bio={user.student.coach.bio}
        />
        <MentorExperience />
        <Reviews />
      </div>
    );
  }

  // If user has submitted the form but is not yet approved, show waitlist
  if (addedForm && !user?.student?.approved) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          {/* Header Section */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              You're on the Waitlist! 🎉
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Great news! Your mentor selection has been submitted and is
              currently being reviewed. You're one step closer to starting your
              learning journey.
            </p>
          </div>

          {/* Status Card */}
          <Card className="max-w-2xl mx-auto mb-8">
            <div className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="ml-2 text-sm font-medium text-green-600">
                      Application Submitted
                    </span>
                  </div>
                  <div className="w-8 h-1 bg-gray-200 rounded">
                    <div className="w-4 h-1 bg-blue-500 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                      <Loader2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="ml-2 text-sm font-medium text-blue-600">
                      Under Review
                    </span>
                  </div>
                  <div className="w-8 h-1 bg-gray-200 rounded"></div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-400">
                      Mentor Assignment
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Your Application is Being Reviewed
                </h3>
                <p className="text-gray-600 mb-6">
                  Your selected mentor is reviewing your application. This
                  typically takes 1-3 business days.
                </p>

                {/* Refresh Button */}
                <Button
                  onClick={() => user?.id && fetchUserData(user.id)}
                  variant="outline"
                  className="mb-4"
                >
                  <Loader2 className="w-4 h-4 mr-2" />
                  Check Status
                </Button>
              </div>
            </div>
          </Card>

          {/* What's Next Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Review Process
              </h3>
              <p className="text-sm text-gray-600">
                Your mentor will review your background and learning goals to
                ensure a good match.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Approval</h3>
              <p className="text-sm text-gray-600">
                Once approved, you'll get access to your mentor's profile and
                can start your journey.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Start Learning
              </h3>
              <p className="text-sm text-gray-600">
                Begin your personalized learning experience with your assigned
                mentor.
              </p>
            </Card>
          </div>

          {/* Contact Support */}
          <Card className="max-w-lg mx-auto">
            <div className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Have questions about your application or the review process?
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </div>
          </Card>

          {/* Auto-refresh notice */}
          <p className="text-xs text-gray-500 mt-6">
            This page will automatically update when your application status
            changes.
          </p>
        </div>
      </div>
    );
  }

  // If user hasn't submitted the form yet, show the mentor selection process
  return (
    <div className="mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Find Your Mentor</h1>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Alert */}
      {success && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <Check className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Step {currentStep} of 4</span>
          <span className="text-sm font-medium">
            {Math.round(progressPercentage)}% Complete
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
                ? "Mentor"
                : "Course"}
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

            {careers.length > 0 ? (
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
            ) : (
              <LoadingSkeleton />
            )}

            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleNextStep}
                disabled={!selectedCareer || loadingCohorts || loadingCourses}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {loadingCohorts || loadingCourses ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
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

            {loadingCohorts ? (
              <LoadingSkeleton />
            ) : cohorts.length > 0 ? (
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
                        variant={
                          cohort.status === "UPCOMING"
                            ? "secondary"
                            : cohort.status === "ONGOING"
                            ? "default"
                            : "outline"
                        }
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

        {/* Step 3: Choose Mentor */}
        {currentStep === 3 && (
          <div>
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">Select a Mentor</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Choose a mentor who will guide you through your learning journey.
            </p>

            {loadingMentors ? (
              <LoadingSkeleton />
            ) : mentors.length > 0 ? (
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
                          <AvatarImage
                            src={
                              mentor.coach.image ||
                              "/placeholder.svg?height=64&width=64" ||
                              "/placeholder.svg"
                            }
                            alt={`${mentor.firstName} ${mentor.lastName}`}
                          />
                          <AvatarFallback>
                            {mentor.firstName.charAt(0)}
                            {mentor.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <div className="font-medium text-lg">
                                {mentor.firstName} {mentor.lastName}
                              </div>
                              {mentor.specialization && (
                                <div className="text-sm text-gray-500">
                                  {mentor.specialization}
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {mentor.coach.bio || "No bio available"}
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No mentors available. Please select a different career.
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={!selectedMentor || loadingCourses}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {loadingCourses ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Choose Course */}
        {currentStep === 4 && (
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">Select a Course</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Choose the course you want to take. This will complete your mentor
              assignment.
            </p>

            {loadingCourses ? (
              <LoadingSkeleton />
            ) : courses.length > 0 ? (
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
                onClick={handleSubmit}
                disabled={!selectedCourse || submitting}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Assigning Mentor...
                  </>
                ) : (
                  "Confirm Selection"
                )}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
