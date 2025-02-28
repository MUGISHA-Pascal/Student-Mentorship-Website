import apiClient from "@/lib/apiClient";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

export const getApprovedStudents = async (page = 1, limit = 20) => {
    try {
        const response = await apiClient.get("/admin/students/approved", {
            headers: getAuthHeaders(),
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch approved students:", error);
        throw error;
    }
};

export const getPendingStudents = async (page = 1, limit = 20) => {
    try {
        const response = await apiClient.get("/admin/students/pending", {
            headers: getAuthHeaders(),
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch pending students:", error);
        throw error;
    }
};

export const approveStudent = async (studentId: string) => {
    try {
        const response = await apiClient.patch(`/admin/student/approve/${studentId}`, {}, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to approve student ${studentId}:`, error);
        throw error;
    }
};

export const rejectStudent = async (studentId: string) => {
    try {
        const response = await apiClient.patch(`/admin/student/reject/${studentId}`, {}, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to reject student ${studentId}:`, error);
        throw error;
    }
};

export const removeStudent = async (studentId: string) => {
    try {
        const response = await apiClient.delete(`/admin/student/remove/${studentId}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to remove student ${studentId}:`, error);
        throw error;
    }
};
