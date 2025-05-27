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
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
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

      if (!parsedData.user?.coach?.id) {
        throw new Error("Invalid user data structure");
      }

      setAuthData(parsedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { authData, isLoading, error };
};

// API service
class StudentService {
  private static async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      };
    }
  }

  static async getStudents(coachId: string): Promise<ApiResponse<Student[]>> {
    if (!coachId) {
      return { error: "Coach ID is required" };
    }

    return this.makeRequest<Student[]>(
      `${API_BASE_URL}/api/v1/coach/students/${encodeURIComponent(coachId)}`
    );
  }

  static async updateStudentStatus(
    coachId: string,
    studentId: string,
    status: "APPROVED" | "WAITLIST"
  ): Promise<ApiResponse<void>> {
    if (!coachId || !studentId) {
      return { error: "Coach ID and Student ID are required" };
    }

    return this.makeRequest<void>(
      `${API_BASE_URL}/api/v1/coach/${encodeURIComponent(
        coachId
      )}/student/status`,
      {
        method: "PUT",
        body: JSON.stringify({ studentId, status }),
      }
    );
  }
}

interface StudentItemProps {
  student: Student;
  isWaitlist?: boolean;
  onSelect: (student: Student) => void;
  isSelected: boolean;
}

const StudentItem: React.FC<StudentItemProps> = ({
  student,
  isWaitlist = false,
  onSelect,
  isSelected,
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
      <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0">
        <Badge variant="outline" className="mb-2 sm:mb-0 sm:mr-4">
          {student.educationLevel || "Not specified"}
        </Badge>
        <Badge
          variant={student.status === "APPROVED" ? "default" : "secondary"}
        >
          {student.status}
        </Badge>
        {!isWaitlist && (
          <MoreVertical className="text-muted-foreground hidden sm:block ml-2" />
        )}
      </div>
    </div>
  );
};

const StudentProfile: React.FC<{ student: Student }> = ({ student }) => {
  const displayName = `${sanitizeString(
    student.user.firstName
  )} ${sanitizeString(student.user.lastName)}`;
  const isValidEmail = validateEmail(student.user.email);

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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
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

  const fetchStudents = useCallback(async () => {
    if (!authData?.user?.coach?.id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await StudentService.getStudents(authData.user.coach.id);

      if (response.error) {
        throw new Error(response.error);
      }

      const data = response.data || [];
      const approved = data.filter((student) => student.status === "APPROVED");
      const pending = data.filter((student) => student.status === "WAITLIST");

      setStudents(approved);
      setWaitlist(pending);

      if (approved.length > 0) {
        setSelectedStudent(approved[0]);
      } else if (pending.length > 0) {
        setSelectedStudent(pending[0]);
      }
    } catch (err) {
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
  }, [authData?.user?.coach?.id, toast]);

  useEffect(() => {
    if (authData?.user?.coach?.id) {
      fetchStudents();
    }
  }, [fetchStudents]);

  const filteredStudents = students
    .filter((student) => {
      const query = sanitizeString(searchQuery.toLowerCase());
      return (
        student.user.firstName.toLowerCase().includes(query) ||
        student.user.lastName.toLowerCase().includes(query) ||
        student.user.email.toLowerCase().includes(query)
      );
    })
    .filter(
      (student) =>
        filterLevel === "All" || student.educationLevel === filterLevel
    )
    .sort((a, b) => {
      if (sortBy === "name")
        return a.user.firstName.localeCompare(b.user.firstName);
      if (sortBy === "email") return a.user.email.localeCompare(b.user.email);
      if (sortBy === "date")
        return (
          new Date(b.user.createdAt).getTime() -
          new Date(a.user.createdAt).getTime()
        );
      return 0;
    });

  const filteredWaitlist = waitlist.filter((student) => {
    const query = sanitizeString(searchQuery.toLowerCase());
    return (
      student.user.firstName.toLowerCase().includes(query) ||
      student.user.lastName.toLowerCase().includes(query) ||
      student.user.email.toLowerCase().includes(query)
    );
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
        <Button onClick={fetchStudents}>Retry</Button>
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
                />
              ))}
              {filteredStudents.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  No approved students found.
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
              {filteredWaitlist.map((student) => {
                const displayName = `${sanitizeString(
                  student.user.firstName
                )} ${sanitizeString(student.user.lastName)}`;
                return (
                  <div
                    key={student.id}
                    className="flex items-center justify-between bg-muted p-4 rounded-lg cursor-pointer hover:bg-muted/80"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="flex items-center">
                      <Avatar className="w-10 h-10 mr-4">
                        <AvatarImage
                          src={
                            student.image ||
                            "/placeholder.svg?height=40&width=40" ||
                            "/placeholder.svg"
                          }
                          alt={displayName}
                        />
                        <AvatarFallback>
                          {student.user.firstName[0]?.toUpperCase()}
                          {student.user.lastName[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{displayName}</div>
                        <div className="text-sm text-muted-foreground">
                          {student.user.email}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">WAITLIST</Badge>
                  </div>
                );
              })}
              {filteredWaitlist.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  No students in waitlist.
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
    </div>
  );
}
