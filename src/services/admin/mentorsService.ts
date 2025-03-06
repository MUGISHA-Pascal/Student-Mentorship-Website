import apiClient from "@/lib/apiClient";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

export const getMentors = async (page = 1, limit = 20) => {
    try {
        const response = await apiClient.get("/admin/mentors", {
            headers: getAuthHeaders(),
            params: { page, limit },
        });
        console.log("Data", response.data);
        return response.data;

    } catch (error) {
        console.error("Failed to fetch mentors:", error);
        throw error;
    }
};

export const getApprovedMentors = async (page = 1, limit = 10) => {
    try {
        const response = await apiClient.get("/admin/mentors/approved", {
            headers: getAuthHeaders(),
            params: { page, limit },
        });
        console.log("Approved Mentors Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch approved mentors:", error);
        throw error;
    }
};

// Fetch Pending Mentors
export const getPendingMentors = async (page = 1, limit = 10) => {
    try {
        const response = await apiClient.get("/admin/mentors/pending", {
            headers: getAuthHeaders(),
            params: { page, limit },
        });
        console.log("Pending Mentors Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch pending mentors:", error);
        throw error;
    }
};

export const approveMentor = async (mentorId: string) => {
    try {
        const response = await apiClient.put(`/admin/mentor/approve/${mentorId}`, {}, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Failed to approve mentor:", error);
        throw error;
    }
};


export const rejectMentor = async (mentorId: string) => {
    try {
        const response = await apiClient.delete(`/admin/mentor/reject/${mentorId}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Failed to reject mentor:", error);
        throw error;
    }
};


export const removeMentor = async (mentorId: string) => {
    try {
        const response = await apiClient.put(`/admin/mentor/remove/${mentorId}`, {}, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Failed to remove mentor:", error);
        throw error;
    }
};
