export const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");


    if (!token) {
        throw new Error("No authentication token found");
    }

    return {
        Authorization: `Bearer ${token}`,
    };
};