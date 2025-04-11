import apiClient from "@/lib/apiClient";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

// Get all blogs (with optional pagination)
export const getBlogs = async (page = 1, limit = 20) => {
    try {
        const response = await apiClient.get("/blog/get-blogs", {
            headers: getAuthHeaders(),
            params: { page, limit },
        });
        console.log("Blogs fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
        throw error;
    }
};

// Get a single blog by ID
export const getBlog = async (blogId: string) => {
    try {
        const response = await apiClient.get(`/blog/get-blog/${blogId}`, {
            headers: getAuthHeaders(),
        });
        console.log("Single blog fetched:", response.data);
        return response.data.data;
    } catch (error) {
        console.error(`Failed to fetch blog with ID ${blogId}:`, error);
        throw error;
    }
};

// Create a new blog
export const createBlog = async (blogData: unknown) => {
    try {
        const response = await apiClient.post("/blog/create-blog", blogData, {
            headers: getAuthHeaders(),
        });
        console.log("Blog created:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to create blog:", error);
        throw error;
    }
};

// Edit an existing blog
export const editBlog = async (blogId: string, updatedData: unknown) => {
    try {
        const response = await apiClient.put(`/blog/edit-blog/${blogId}`, updatedData, {
            headers: getAuthHeaders(),
        });
        console.log(`Blog ${blogId} updated:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Failed to edit blog with ID ${blogId}:`, error);
        throw error;
    }
};

// Delete a blog by ID
export const deleteBlog = async (blogId: string) => {
    try {
        const response = await apiClient.delete(`/blog/delete-blog/${blogId}`, {
            headers: getAuthHeaders(),
        });
        console.log(`Blog ${blogId} deleted:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Failed to delete blog with ID ${blogId}:`, error);
        throw error;
    }
};

// Search blogs by keyword
export const searchBlogs = async (keyword: string) => {
    try {
        const response = await apiClient.get(`/blog/search-blogs`, {
            headers: getAuthHeaders(),
            params: { keyword },
        });
        console.log(`Blogs searched with keyword "${keyword}":`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Failed to search blogs with keyword "${keyword}":`, error);
        throw error;
    }
};
