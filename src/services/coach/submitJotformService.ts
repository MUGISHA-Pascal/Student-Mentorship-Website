import apiClient from "@/lib/apiClient";

export const submitJotForm = async (email: string): Promise<void> => {
    try {
        await apiClient.post("/coach/jotform", { email });
    } catch (error: unknown) {
        console.error("Failed to submit JotForm:", error);
        throw error;
    }
};
