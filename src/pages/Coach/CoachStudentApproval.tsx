"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "../Admin/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Check,
  X,
  User,
  Mail,
  Calendar,
  GraduationCap,
  Clock,
  AlertCircle,
  Loader2,
  Users,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

// Define interfaces for our data types
interface PendingStudent {
  id: string;
  userId: string;
  coachId: string;
  status: string;
  bio?: string;
  educationLevel?: string;
  approved: boolean;
  addedMentor: boolean;
  image?: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
    createdAt: string;
  };
}

interface Coach {
  id: string;
  userId: string;
  bio?: string;
  image?: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function CoachStudentApproval() {
  const [coach, setCoach] = useState<Coach | null>(null);
  const [pendingStudents, setPendingStudents] = useState<PendingStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Dialog states
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<PendingStudent | null>(
    null
  );
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );

  // Clear messages after timeout
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Fetch coach data
  const fetchCoachData = useCallback(async () => {
    try {
      // Get user from localStorage
      const userData = localStorage.getItem("user");
      if (!userData) {
        setError("No user data found. Please log in again.");
        return null;
      }

      const parsedUser = JSON.parse(userData);
      console.log("Parsed user data:", parsedUser);
      console.log("coach", parsedUser.user.coach);

      if (!parsedUser.user?.id) {
        setError("Invalid user data. Please log in again.");
        return null;
      }

      if (!parsedUser.user?.coach) {
        setError(
          "No coach data found. Please ensure you are logged in as a coach."
        );
        return null;
      }

      const coachData = parsedUser.user.coach;
      setCoach(coachData);
      return coachData;
    } catch (err) {
      console.error("Error fetching coach data:", err);
      setError("Failed to load coach data. Please try refreshing the page.");
      return null;
    }
  }, []);

  // Fetch pending students
  const fetchPendingStudents = useCallback(async (coachId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/coach/pending-students/${coachId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch pending students: ${response.status}`);
      }

      const students = await response.json();
      setPendingStudents(students);
    } catch (err) {
      console.error("Error fetching pending students:", err);
      setError(
        "Failed to load pending students. Please try refreshing the page."
      );
    }
  }, []);

  // Initialize component
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        setLoading(true);
        setError(null);

        const coachData = await fetchCoachData();
        if (coachData?.id) {
          await fetchPendingStudents(coachData.id);
        }
      } catch (err) {
        console.error("Error initializing component:", err);
        setError("Failed to initialize. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    initializeComponent();
  }, [fetchCoachData, fetchPendingStudents]);

  // Handle approve/reject action
  const handleStudentAction = async (
    studentId: string,
    action: "approve" | "reject"
  ) => {
    if (!coach?.id) {
      setError("Coach data is missing. Please refresh and try again.");
      return;
    }

    try {
      setActionLoading(studentId);
      setError(null);

      const endpoint =
        action === "approve"
          ? `http://localhost:3000/api/v1/coach/approve-student/${studentId}`
          : `http://localhost:3000/api/v1/coach/reject-student/${studentId}`;

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coachId: coach.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to ${action} student: ${response.status}`
        );
      }

      const result = await response.json();
      console.log(`Student ${action} successful:`, result);

      setSuccess(
        `Student ${
          action === "approve" ? "approved" : "rejected"
        } successfully!`
      );

      // Refresh the pending students list
      await fetchPendingStudents(coach.id);

      // Close dialog
      setShowConfirmDialog(false);
      setSelectedStudent(null);
      setActionType(null);
    } catch (err) {
      console.error(`Error ${action}ing student:`, err);
      setError(
        err instanceof Error
          ? err.message
          : `Failed to ${action} student. Please try again.`
      );
    } finally {
      setActionLoading(null);
    }
  };

  // Open confirmation dialog
  const openConfirmDialog = (
    student: PendingStudent,
    action: "approve" | "reject"
  ) => {
    setSelectedStudent(student);
    setActionType(action);
    setShowConfirmDialog(true);
  };

  // Refresh data
  const handleRefresh = async () => {
    if (coach?.id) {
      setLoading(true);
      await fetchPendingStudents(coach.id);
      setLoading(false);
    }
  };

  // Calculate age from date of birth
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <div className="flex space-x-2 mt-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Student Approval Center
          </h1>
          <p className="text-gray-600">
            Review and approve students who have requested you as their mentor
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

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
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Pending Approval
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingStudents.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    pendingStudents.filter((s) => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(s.createdAt) > weekAgo;
                    }).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Avg. Wait Time
                </p>
                <p className="text-2xl font-bold text-gray-900">2.3 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      {pendingStudents.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Pending Students
            </h3>
            <p className="text-gray-600 mb-6">
              Great job! You're all caught up. No students are currently waiting
              for approval.
            </p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Check for Updates
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pendingStudents.map((student) => (
            <Card
              key={student.id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={
                        student.image || "/placeholder.svg?height=64&width=64"
                      }
                      alt={`${student.user.firstName} ${student.user.lastName}`}
                    />
                    <AvatarFallback className="text-lg">
                      {student.user.firstName.charAt(0)}
                      {student.user.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {student.user.firstName} {student.user.lastName}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Mail className="h-4 w-4 mr-1" />
                      {student.user.email}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Student Details */}
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">Age:</span>
                    <span className="ml-1 font-medium">
                      {calculateAge(student.user.dob)} years old
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">Applied:</span>
                    <span className="ml-1 font-medium">
                      {formatDate(student.createdAt)}
                    </span>
                  </div>

                  {student.educationLevel && (
                    <div className="flex items-center text-sm">
                      <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">Education:</span>
                      <span className="ml-1 font-medium">
                        {student.educationLevel}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {student.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {student.user.gender}
                    </Badge>
                  </div>
                </div>

                {/* Bio */}
                {student.bio && (
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {student.bio}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={() => openConfirmDialog(student, "approve")}
                    disabled={actionLoading === student.id}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    {actionLoading === student.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => openConfirmDialog(student, "reject")}
                    disabled={actionLoading === student.id}
                    variant="destructive"
                    className="flex-1"
                    size="sm"
                  >
                    {actionLoading === student.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {actionType === "approve" ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              {actionType === "approve" ? "Approve Student" : "Reject Student"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve"
                ? `Are you sure you want to approve ${selectedStudent?.user.firstName} ${selectedStudent?.user.lastName} as your student? They will gain access to your mentorship program.`
                : `Are you sure you want to reject ${selectedStudent?.user.firstName} ${selectedStudent?.user.lastName}? They will be notified of this decision.`}
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="py-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={
                      selectedStudent.image ||
                      "/placeholder.svg?height=48&width=48"
                    }
                    alt={`${selectedStudent.user.firstName} ${selectedStudent.user.lastName}`}
                  />
                  <AvatarFallback>
                    {selectedStudent.user.firstName.charAt(0)}
                    {selectedStudent.user.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {selectedStudent.user.firstName}{" "}
                    {selectedStudent.user.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedStudent.user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              disabled={!!actionLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                selectedStudent &&
                handleStudentAction(selectedStudent.id, actionType!)
              }
              disabled={!!actionLoading}
              className={
                actionType === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : ""
              }
              variant={actionType === "reject" ? "destructive" : "default"}
            >
              {actionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {actionType === "approve" ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Approve Student
                    </>
                  ) : (
                    <>
                      <X className="mr-2 h-4 w-4" />
                      Reject Student
                    </>
                  )}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
