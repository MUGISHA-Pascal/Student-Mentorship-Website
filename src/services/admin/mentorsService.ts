import apiClient from "@/lib/apiClient";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

export const getMentors = async () => {
    try {
        const response = await apiClient.get("/admin/mentors", {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch mentors:", error);
        throw error;
    }
};