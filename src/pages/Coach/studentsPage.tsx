"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  Search,
  MoreVertical,
  Mail,
  Calendar,
  Clock,
  GraduationCap,
  BookOpen,
  AlertCircle,
  Plus,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "../Admin/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Environment configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

// Types based on Prisma models
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  gender: string;
  role: string;
  filledForm: boolean;
  approved: boolean;
  filledProfile: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Student {
  id: string;
  userId: string;
  coachId: string | null;
  status: "WAITLIST" | "APPROVED";
  bio: string | null;
  educationLevel: string | null;
  approved: boolean;
  image: string | null;
  addedMentor: boolean;
  currentEnrollmentId: string | null;
  user: User;
  assignedCourses?: Course[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  instructor: string;
  category: string;
  isActive: boolean;
  createdAt: string;
}

interface CourseAssignment {
  studentId: string;
  courseId: string;
  message?: string;
}

interface AuthUser {
  user: {
    coach: {
      id: string;
    };
  };
  token?: string;
}

// Validation utilities
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, "");
};

// Custom hook for authentication
const useAuth = () => {
  const [authData, setAuthData] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        throw new Error("No authentication data found");
      }

      const parsedData: AuthUser = JSON.parse(userData);
      console.log("🔐 Auth Data Parsed:", parsedData);

      // More robust validation of the auth data structure
      if (!parsedData || typeof parsedData !== "object") {
        throw new Error("Invalid authentication data format");
      }

      if (!parsedData.user || typeof parsedData.user !== "object") {
        throw new Error("Invalid user data structure");
      }

      if (!parsedData.user.coach || !parsedData.user.coach.id) {
        console.error("❌ Invalid user data structure:", parsedData);
        throw new Error("Coach ID not found in user data");
      }

      console.log("✅ Coach ID found:", parsedData.user.coach.id);
      setAuthData(parsedData);
    } catch (err) {
      console.error("🔐 Authentication error:", err);
      setError(err instanceof Error ? err.message : "Authentication error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { authData, isLoading, error };
};

interface CourseAssignmentDialogProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (courseId: string, message?: string) => void;
}

const CourseAssignmentDialog: React.FC<CourseAssignmentDialogProps> = ({
  student,
  isOpen,
  onClose,
  onAssign,
}) => {
  const { authData } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && authData?.user?.coach?.id) {
      fetchCourses();
    }
  }, [isOpen, authData?.user?.coach?.id]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!authData?.user?.coach?.id) {
        throw new Error(
          "Coach ID not found. Please refresh the page or log in again."
        );
      }

      const coachId = authData.user.coach.id;
      console.log("✅ Fetching courses for coach ID:", coachId);

      const response = await fetch(
        `${API_BASE_URL}/api/v1/coach/get-courses/${coachId}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(authData.token && {
              Authorization: `Bearer ${authData.token}`,
            }),
          },
          cache: "no-cache",
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      const coursesData = data.data || data || [];

      if (!Array.isArray(coursesData)) {
        console.error(
          "❌ Invalid response format - expected array:",
          coursesData
        );
        throw new Error("Invalid response format from server");
      }

      setCourses(coursesData); // ✅ Set the courses state here
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch courses";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ New effect to confirm updated state
  useEffect(() => {
    console.log("📦 Updated courses state:", courses);
  }, [courses]);

  const handleAssign = () => {
    if (!selectedCourseId) {
      toast({
        title: "Error",
        description: "Please select a course",
        variant: "destructive",
      });
      return;
    }

    onAssign(selectedCourseId, message);
    setSelectedCourseId("");
    setMessage("");
    onClose();
  };
  function getFileExtension(mimeType: string): string {
    if (!mimeType || typeof mimeType !== "string") return "";
    const parts = mimeType.split("/");
    return parts.length === 2 ? parts[1] : "";
  }

  const selectedCourse = courses.find(
    (course) => course.id === selectedCourseId
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Course to Student</DialogTitle>
          <DialogDescription>
            Assign a course to {student.user.firstName} {student.user.lastName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="course-select">Select Course</Label>
                <Select
                  value={selectedCourseId}
                  onValueChange={setSelectedCourseId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a course..." />
                  </SelectTrigger>
                  <SelectContent>
                    {courses
                      // .filter((course) => course.isActive)
                      .map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{course.name}</span>
                            {/* <span className="text-sm text-muted-foreground">
                              {course.description}
                            </span> */}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCourse && (
                <Card className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">{selectedCourse.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedCourse.description}
                    </p>
                    {/* <div className="flex gap-2">
                      <div>
                        {getFileExtension(selectedCourse.documents.fileType)}
                      </div>
                    </div> */}
                  </div>
                </Card>
              )}

              {/* <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add a personal message for the student..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div> */}
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedCourseId || loading}
          >
            <Send className="h-4 w-4 mr-2" />
            Assign Course
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface StudentItemProps {
  student: Student;
  isWaitlist?: boolean;
  onSelect: (student: Student) => void;
  isSelected: boolean;
  onAssignCourse: (student: Student) => void;
}

const StudentItem: React.FC<StudentItemProps> = ({
  student,
  isWaitlist = false,
  onSelect,
  isSelected,
  onAssignCourse,
}) => {
  const displayName = `${sanitizeString(
    student.user.firstName
  )} ${sanitizeString(student.user.lastName)}`;
  const isValidEmail = validateEmail(student.user.email);

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg mb-2 cursor-pointer transition-colors ${
        isSelected
          ? "bg-blue-50 border-l-4 border-blue-500"
          : "bg-muted hover:bg-muted/80"
      }`}
      onClick={() => onSelect(student)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(student);
        }
      }}
    >
      <div className="flex items-center mb-2 sm:mb-0">
        <Avatar className="w-10 h-10 mr-4">
          <AvatarImage
            src={student.image || "/placeholder.svg?height=40&width=40"}
            alt={displayName}
          />
          <AvatarFallback>
            {student.user.firstName[0]?.toUpperCase()}
            {student.user.lastName[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{displayName}</div>
          <div
            className={`text-sm ${
              isValidEmail ? "text-muted-foreground" : "text-red-500"
            }`}
          >
            {student.user.email}
            {!isValidEmail && <span className="ml-1">⚠️</span>}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0 gap-2">
        <Badge variant="outline" className="mb-2 sm:mb-0">
          {student.educationLevel || "Not specified"}
        </Badge>
        <Badge
          variant={student.status === "APPROVED" ? "default" : "secondary"}
        >
          {student.status}
        </Badge>
        {!isWaitlist && student.status === "APPROVED" && (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onAssignCourse(student);
            }}
            className="ml-2"
          >
            <Plus className="h-4 w-4 mr-1" />
            Assign Course
          </Button>
        )}
        {!isWaitlist && (
          <MoreVertical className="text-muted-foreground hidden sm:block ml-2" />
        )}
      </div>
    </div>
  );
};

const StudentProfile: React.FC<{ student: any }> = ({ student }) => {
  const [studentCourses, setStudentCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const { toast } = useToast();

  const displayName = `${sanitizeString(
    student.user.firstName
  )} ${sanitizeString(student.user.lastName)}`;
  const isValidEmail = validateEmail(student.user.email);

  // useEffect(() => {
  //   fetchStudentCourses();
  // }, [student.id]);

  // const fetchStudentCourses = async () => {
  //   try {
  //     setLoadingCourses(true);

  //     const response = await fetch(
  //       `${API_BASE_URL}/api/v1/student/${encodeURIComponent(
  //         student.id
  //       )}/courses`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => ({}));
  //       throw new Error(
  //         errorData.message || `HTTP error! status: ${response.status}`
  //       );
  //     }

  //     const data = await response.json();
  //     console.log(`📖 Student ${student.id} Courses:`, data);
  //     setStudentCourses(data.data || data || []);
  //   } catch (err) {
  //     // Silently handle error - courses might not be implemented yet
  //     setStudentCourses([]);
  //   } finally {
  //     setLoadingCourses(false);
  //   }
  // };

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "Invalid date";
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className="text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage
            src={student.image || "/placeholder.svg?height=96&width=96"}
            alt={displayName}
          />
          <AvatarFallback className="text-2xl">
            {student.user.firstName[0]?.toUpperCase()}
            {student.user.lastName[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">{displayName}</CardTitle>
        <p className="text-muted-foreground">
          {student.educationLevel || "Education level not specified"}
        </p>
        <div className="flex justify-center gap-2 mt-2">
          <Badge
            variant={student.status === "APPROVED" ? "default" : "secondary"}
          >
            {student.status}
          </Badge>
          <Badge variant={student.user.approved ? "default" : "outline"}>
            {student.approved ? "User Approved" : "Pending Approval"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span
                  className={`text-sm ${isValidEmail ? "" : "text-red-500"}`}
                >
                  {student.user.email}
                  {!isValidEmail && (
                    <span className="ml-1">⚠️ Invalid email</span>
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">
                  DOB: {formatDate(student.user.dob)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Gender:</span>
                <span className="text-sm">
                  {sanitizeString(student.user.gender)}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">
                  Joined: {formatDate(student.user.createdAt)}
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="mt-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm font-medium mr-2">
                  Education Level:
                </span>
                <span className="text-sm">
                  {student.educationLevel || "Not specified"}
                </span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm font-medium mr-2">
                  Current Enrollment:
                </span>
                <span className="text-sm">
                  {student.currentEnrollmentId ? "Enrolled" : "Not enrolled"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Mentor Added:</span>
                <Badge variant={student.addedMentor ? "default" : "outline"}>
                  {student.addedMentor ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Assigned Courses</h4>
                <Badge variant="outline">
                  {student.courses.length} course
                  {student.courses.length !== 1 ? "s" : ""}
                </Badge>
              </div>

              {student.courses.length > 0 ? (
                <div className="space-y-2">
                  {student.courses.map((course: any) => (
                    <Card key={course.id} className="p-3">
                      <div className="space-y-1">
                        <h5 className="text-sm font-medium">{course.name}</h5>
                        <p className="text-xs text-muted-foreground">
                          {course.description}
                        </p>
                        {/* <div className="flex gap-1">
                          <Badge variant="outline" className="text-xs">
                            {course.level}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {course.duration}
                          </Badge>
                        </div> */}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No courses assigned yet.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="mt-4 space-y-4">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium">Bio:</span>
                <p className="text-sm text-muted-foreground mt-1">
                  {student.bio
                    ? sanitizeString(student.bio)
                    : "No bio provided yet."}
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">
                  Profile Completed:
                </span>
                <Badge
                  variant={student.user.filledProfile ? "default" : "outline"}
                >
                  {student.user.filledProfile ? "Complete" : "Incomplete"}
                </Badge>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Form Filled:</span>
                <Badge
                  variant={student.user.filledForm ? "default" : "outline"}
                >
                  {student.user.filledForm ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default function StudentsPage() {
  const { authData, isLoading: authLoading, error: authError } = useAuth();
  const { toast } = useToast();

  const [students, setStudents] = useState<Student[]>([]);
  const [waitlist, setWaitlist] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterLevel, setFilterLevel] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [courseAssignmentDialog, setCourseAssignmentDialog] = useState<{
    isOpen: boolean;
    student: Student | null;
  }>({ isOpen: false, student: null });

  const fetchStudents = useCallback(async () => {
    console.log("🔄 fetchStudents called with authData:", authData);

    if (!authData?.user?.coach?.id) {
      console.log("❌ Missing required auth data");
      return;
    }

    const coachId = authData.user.coach.id;
    console.log("✅ Using coach ID:", coachId);

    try {
      setLoading(true);
      setError(null);

      const url = `${API_BASE_URL}/api/v1/coach/students/${encodeURIComponent(
        coachId
      )}`;
      console.log("📡 Fetching from URL:", url);

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      // Add authorization header if token exists
      if (authData.token) {
        headers.Authorization = `Bearer ${authData.token}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers,
        // Add cache control for fresh data
        cache: "no-cache",
      });

      console.log("📡 Response status:", response.status);
      console.log(
        "📡 Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = {
            message: `HTTP ${response.status}: ${response.statusText}`,
          };
        }

        console.error("❌ API Error:", errorData);
        throw new Error(
          errorData.message || `Failed to fetch students (${response.status})`
        );
      }

      const responseData = await response.json();
      console.log("📊 Raw API Response:", responseData);

      // Handle different response structures
      const studentsData =
        responseData.data || responseData.students || responseData || [];

      if (!Array.isArray(studentsData)) {
        console.error(
          "❌ Invalid response format - expected array:",
          studentsDatasetSelectedStudent
        );
        throw new Error("Invalid response format from server");
      }

      console.log("📋 Processed Students Data:", studentsData);

      // Validate student data structure
      const validStudents = studentsData.filter((student: any) => {
        const isValid =
          student &&
          student.id &&
          student.user &&
          student.user.firstName &&
          student.user.lastName &&
          student.user.email;

        if (!isValid) {
          console.warn("⚠️ Invalid student data:", student);
        }

        return isValid;
      });

      const approved = validStudents.filter(
        (student: Student) => student.status === "APPROVED"
      );
      const pending = validStudents.filter(
        (student: Student) => student.status === "WAITLIST"
      );

      console.log("✅ Approved Students:", approved.length, approved);
      console.log("⏳ Waitlist Students:", pending.length, pending);

      setStudents(approved);
      setWaitlist(pending);

      // Auto-select first student
      if (approved.length > 0) {
        setSelectedStudent(approved[0]);
      } else if (pending.length > 0) {
        setSelectedStudent(pending[0]);
      } else {
        setSelectedStudent(null);
      }

      // Show success message if no students found
      if (validStudents.length === 0) {
        toast({
          title: "No Students Found",
          description: "No students are currently assigned to you.",
        });
      }
    } catch (err) {
      console.error("❌ Error in fetchStudents:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch students";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [authData, toast]);

  // Effect to trigger fetchStudents when auth data is available
  useEffect(() => {
    if (authData?.user?.coach?.id && !loading) {
      console.log("🚀 Triggering fetchStudents from useEffect");
      fetchStudents();
    }
  }, [authData?.user?.coach?.id]); // Only depend on coach ID to avoid infinite loops

  const handleAssignCourse = (student: Student) => {
    setCourseAssignmentDialog({ isOpen: true, student });
  };

  const handleCourseAssignment = async (courseId: string, message?: string) => {
    if (!courseAssignmentDialog.student) return;

    try {
      const assignment: CourseAssignment = {
        studentId: courseAssignmentDialog.student.id,
        courseId,
        message,
      };
      console.log("📤 Sending Course Assignment:", assignment);

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (authData?.token) {
        headers.Authorization = `Bearer ${authData.token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/course/assign`, {
        method: "POST",
        headers,
        body: JSON.stringify(assignment),
      });

      console.log("📥 Course Assignment Response Status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Course Assignment Error:", errorData);
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      console.log("✅ Course Assignment Successful");

      toast({
        title: "Success",
        description: `Course assigned to ${courseAssignmentDialog.student.user.firstName} ${courseAssignmentDialog.student.user.lastName}`,
      });

      // Refresh student data to show updated courses
      if (selectedStudent?.id === courseAssignmentDialog.student.id) {
        // Force re-render of student profile to fetch updated courses
        setSelectedStudent({ ...selectedStudent });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to assign course";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Improved filtering and sorting
  const filteredStudents = students
    .filter((student) => {
      const query = sanitizeString(searchQuery.toLowerCase());
      const fullName =
        `${student.user.firstName} ${student.user.lastName}`.toLowerCase();
      return (
        fullName.includes(query) ||
        student.user.email.toLowerCase().includes(query) ||
        (student.educationLevel &&
          student.educationLevel.toLowerCase().includes(query))
      );
    })
    .filter(
      (student) =>
        filterLevel === "All" || student.educationLevel === filterLevel
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.user.firstName.localeCompare(b.user.firstName);
        case "email":
          return a.user.email.localeCompare(b.user.email);
        case "date":
          return (
            new Date(b.user.createdAt).getTime() -
            new Date(a.user.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

  const filteredWaitlist = waitlist.filter((student) => {
    const query = sanitizeString(searchQuery.toLowerCase());
    const fullName =
      `${student.user.firstName} ${student.user.lastName}`.toLowerCase();
    return (
      fullName.includes(query) ||
      student.user.email.toLowerCase().includes(query)
    );
  });

  console.log("🔍 Filtered Results:", {
    searchQuery,
    filterLevel,
    sortBy,
    originalStudents: students.length,
    filteredStudents: filteredStudents.length,
    originalWaitlist: waitlist.length,
    filteredWaitlist: filteredWaitlist.length,
  });

  if (authLoading) {
    return (
      <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Authenticating...</p>
          </div>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Authentication Error: {authError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading students...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={fetchStudents} disabled={loading}>
          {loading ? "Retrying..." : "Retry"}
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Student List */}
        <div className="w-full lg:w-2/3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-2xl font-semibold mb-2 sm:mb-0">
              Students Management
            </h2>
            <Button
              onClick={fetchStudents}
              disabled={loading}
              variant="outline"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                maxLength={100}
              />
            </div>
            <Select onValueChange={setFilterLevel} defaultValue="All">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setSortBy} defaultValue="name">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="email">Sort by Email</SelectItem>
                <SelectItem value="date">Sort by Join Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Approved Students */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">
              Approved Students ({filteredStudents.length})
            </h3>
            <div className="space-y-2">
              {filteredStudents.map((student) => (
                <StudentItem
                  key={student.id}
                  student={student}
                  onSelect={setSelectedStudent}
                  isSelected={selectedStudent?.id === student.id}
                  onAssignCourse={handleAssignCourse}
                />
              ))}
              {filteredStudents.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  {students.length === 0
                    ? "No approved students found."
                    : "No students match your search criteria."}
                </p>
              )}
            </div>
          </div>

          {/* Waitlist */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              Waitlist - Pending Approvals ({filteredWaitlist.length})
            </h3>
            <div className="space-y-2">
              {filteredWaitlist.map((student) => (
                <StudentItem
                  key={student.id}
                  student={student}
                  isWaitlist={true}
                  onSelect={setSelectedStudent}
                  isSelected={selectedStudent?.id === student.id}
                  onAssignCourse={handleAssignCourse}
                />
              ))}
              {filteredWaitlist.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  {waitlist.length === 0
                    ? "No students in waitlist."
                    : "No waitlist students match your search criteria."}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Student Profile */}
        <div className="w-full lg:w-1/3">
          {selectedStudent ? (
            <StudentProfile student={selectedStudent} />
          ) : (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">
                Select a student to view their profile
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Course Assignment Dialog */}
      {courseAssignmentDialog.student && (
        <CourseAssignmentDialog
          student={courseAssignmentDialog.student}
          isOpen={courseAssignmentDialog.isOpen}
          onClose={() =>
            setCourseAssignmentDialog({ isOpen: false, student: null })
          }
          onAssign={handleCourseAssignment}
        />
      )}
    </div>
  );
}
