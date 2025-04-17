import apiClient from "@/lib/apiClient";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

export const getStreamToken = async (): Promise<string> => {
    try {
        const response = await apiClient.get("/meetings/stream/token", {
            headers: getAuthHeaders(),
        });
        return response.data.token; // only return the token
    } catch (error) {
        console.error("Failed to fetch Stream token:", error);
        throw error;
    }
};
