/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogFormValues } from "@/components/blogs/blogForm";
import apiClient from "@/lib/apiClient";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

// Get all blogs (with optional pagination)
export const getBlogs = async (page = 1, limit = 20) => {
    try {
        const response = await apiClient.get("/blog/get-blogs", {
            headers: getAuthHeaders(),
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
        throw error;
    }
};

// Get a single blog by ID
export const getBlog = async (blogSlug: string) => {
    try {
        const response = await apiClient.get(`/blog/get-blog/${blogSlug}`, {
            headers: getAuthHeaders(),
        });
        return response.data.data;
    } catch (error) {
        console.error(`Failed to fetch blog with ID ${blogSlug}:`, error);
        throw error;
    }
};

// Create a new blog
export const createBlog = async (blogData: any) => {
    try {
        const formData = new FormData();
        
        // Add text fields
        formData.append('title', blogData.title);
        formData.append('description', blogData.description);
        formData.append('category', blogData.category);
        
        // Add image file if it exists
        if (blogData.imageFile) {
            formData.append('image', blogData.imageFile);
        }

        

        const response = await apiClient.post("/blog/create-blog", formData, {
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to create blog:", error);
        throw error;
    }
};

export const editBlog = async (blogId: string, updatedData: BlogFormValues) => {
    const formData = new FormData();
    
    // Append all fields
    formData.append('title', updatedData.title);
    formData.append('description', updatedData.description);
    formData.append('category', updatedData.category || '');
    formData.append('dateCreated', updatedData.dateCreated);
    
    // Handle image conversion
    if (updatedData.image) {
      // If it's a base64 string (new upload)
      if (updatedData.image.startsWith('data:image')) {
        const blob = await fetch(updatedData.image).then(r => r.blob());
        formData.append('image', blob, 'blog-image.png');
      } 
      // If it's a URL (existing image), don't append to formData
      // The backend will keep the existing image if no new file is provided
    }
  
    try {
      const response = await apiClient.put(`/blog/edit-blog/${blogId}`, formData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'multipart/form-data',
        },
      });
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
        return response.data;
    } catch (error) {
        console.error(`Failed to search blogs with keyword "${keyword}":`, error);
        throw error;
    }
};
