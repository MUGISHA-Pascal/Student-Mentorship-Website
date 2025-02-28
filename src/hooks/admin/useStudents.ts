/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { approveStudent, getApprovedStudents, getPendingStudents, rejectStudent, removeStudent } from "@/services/admin/studentsService";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    approved: boolean;
    dob: string | null;
    gender: string | null;
    role: string;
    filledForm: boolean;
    filledProfile: boolean;
    createdAt: string;
}

interface Student {
    id: string;
    bio: string;
    educationLevel: string;
    user: User;
}

// Hook for approved students
export const useApprovedStudents = () => {
    const [approvedStudents, setApprovedStudents] = useState<Student[]>([]);
    const [approvedLoading, setApprovedLoading] = useState<boolean>(true);
    const [approvedError, setApprovedError] = useState<string | null>(null);
    const [approvedPage, setApprovedPage] = useState(1);
    const [totalApprovedPages, setTotalApprovedPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchApprovedStudents = async () => {
            try {
                setApprovedLoading(true);
                const data = await getApprovedStudents(approvedPage, itemsPerPage);
                setApprovedStudents(data.data);
                setTotalApprovedPages(data.totalPages);
            } catch (err) {
                console.error("Failed to fetch approved students:", err);
                setApprovedError("Failed to fetch approved students");
            } finally {
                setApprovedLoading(false);
            }
        };

        fetchApprovedStudents();
    }, [approvedPage]);

    return { approvedStudents, setApprovedStudents, approvedLoading, approvedError, setApprovedPage, approvedPage, totalApprovedPages };
};

// Hook for pending students
export const usePendingStudents = () => {
    const [pendingStudents, setPendingStudents] = useState<Student[]>([]);
    const [pendingLoading, setPendingLoading] = useState<boolean>(true);
    const [pendingError, setPendingError] = useState<string | null>(null);
    const [pendingPage, setPendingPage] = useState(1);
    const [totalPendingPages, setTotalPendingPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchPendingStudents = async () => {
            try {
                setPendingLoading(true);
                const data = await getPendingStudents(pendingPage, itemsPerPage);
                setPendingStudents(data.data);
                setTotalPendingPages(data.totalPages);
            } catch (err) {
                console.error("Failed to fetch pending students:", err);
                setPendingError("Failed to fetch pending students");
            } finally {
                setPendingLoading(false);
            }
        };

        fetchPendingStudents();
    }, [pendingPage]);

    return { pendingStudents, setPendingStudents, pendingLoading, pendingError, pendingPage, setPendingPage, totalPendingPages };
};

// // Hook for approving a student
// export const useApproveStudent = () => {
//     const [approveLoading, setApproveLoading] = useState<boolean>(false);
//     const [approveError, setApproveError] = useState<string | null>(null);

//     const handleApproveStudent = async (studentId: string) => {
//         try {
//             setApproveLoading(true);
//             await approveStudent(studentId);
//             toast.success("Student approved successfully");
//         } catch (err) {
//             console.error(`Failed to approve student ${studentId}:`, err);
//             setApproveError(`Failed to approve student ${studentId}`);
//             toast.error("Failed to approve student");
//         } finally {
//             setApproveLoading(false);
//         }
//     };

//     return { handleApproveStudent, approveLoading, approveError };
// };

// // Hook for rejecting a student
// export const useRejectStudent = () => {
//     const [rejectLoading, setRejectLoading] = useState<boolean>(false);
//     const [rejectError, setRejectError] = useState<string | null>(null);

//     const handleRejectStudent = async (studentId: string) => {
//         try {
//             setRejectLoading(true);
//             await rejectStudent(studentId);
//             toast.success("Student rejected successfully");
//         } catch (err) {
//             console.error(`Failed to reject student ${studentId}:`, err);
//             setRejectError(`Failed to reject student ${studentId}`);
//             toast.error("Failed to reject student");
//         } finally {
//             setRejectLoading(false);
//         }
//     };

//     return { handleRejectStudent, rejectLoading, rejectError };
// };

// // Hook for removing a student
// export const useRemoveStudent = () => {
//     const [removeLoading, setRemoveLoading] = useState<boolean>(false);
//     const [removeError, setRemoveError] = useState<string | null>(null);

//     const handleRemoveStudent = async (studentId: string) => {
//         try {
//             setRemoveLoading(true);
//             await removeStudent(studentId);
//             toast.success("Student removed successfully");
//         } catch (err) {
//             console.error(`Failed to remove student ${studentId}:`, err);
//             setRemoveError(`Failed to remove student ${studentId}`);
//             toast.error("Failed to remove student");
//         } finally {
//             setRemoveLoading(false);
//         }
//     };

//     return { handleRemoveStudent, removeLoading, removeError };
// };

export const useApproveStudent = () => {
    const [approvingStudentId, setApprovingStudentId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
    const approve = async (studentId: string, updateStudentList: (studentId: string) => void) => {
      setApprovingStudentId(studentId);
      try {
        const response = await approveStudent(studentId);
        setSuccessMessage(response.message);
        toast.success("Student approved successfully!");
        updateStudentList(studentId);
      } catch (err) {
        setError("Failed to approve student");
        toast.error("Failed to approve student");
      } finally {
        setApprovingStudentId(null);
      }
    };
  
    return { approve, approvingStudentId, error, successMessage };
  };
  
  export const useRejectStudent = () => {
    const [rejectingStudentId, setRejectingStudentId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
    const reject = async (studentId: string, updateStudentList: (studentId: string) => void) => {
      setRejectingStudentId(studentId);
      try {
        const response = await rejectStudent(studentId);
        setSuccessMessage(response.message);
        toast.success("Student rejected successfully!");
        updateStudentList(studentId);
      } catch (err) {
        setError("Failed to reject student");
        toast.error("Failed to reject student");
      } finally {
        setRejectingStudentId(null);
      }
    };
  
    return { reject, rejectingStudentId, error, successMessage };
  };
  
  export const useRemoveStudent = () => {
    const [removingStudentId, setRemovingStudentId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
    const remove = async (studentId: string, updateStudentList: (studentId: string) => void) => {
      setRemovingStudentId(studentId);
      try {
        const response = await removeStudent(studentId);
        setSuccessMessage(response.message);
        toast.success("Student removed successfully!");
        updateStudentList(studentId);
      } catch (err) {
        setError("Failed to remove student");
        toast.error("Failed to remove student");
      } finally {
        setRemovingStudentId(null);
      }
    };
  
    return { remove, removingStudentId, error, successMessage };
  };