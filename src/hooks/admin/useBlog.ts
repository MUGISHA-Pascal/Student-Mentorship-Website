/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { createBlog, deleteBlog, editBlog, getBlog, getBlogs, searchBlogs } from "@/services/admin/blogService";
import { toast } from "react-toastify";


export interface Blog {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    dateCreated: string;
    image: string;
    isNew?: boolean;
    userId: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        role: string;
    };
}

interface Pagination {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
}


// Hook for creating a blog
export const useCreateBlog = () => {
    const [isCreatingBlog, setIsCreatingBlog] = useState(false);
    const [createBlogError, setCreateBlogError] = useState<string | null>(null);


    const createNewBlog = async (blogData: any) => {
        setIsCreatingBlog(true);
        try {
            const response = await createBlog(blogData);
            toast.success("Blog created successfully!");
            return response;
        } catch (err: any) {
            console.error("Error creating blog:", err);
            setCreateBlogError(err.message || "Failed to create blog");
            toast.error("Failed to create blog.");
            throw err;
        } finally {
            setIsCreatingBlog(false);
        }
    };

    return { createNewBlog, isCreatingBlog, createBlogError };
};


export const useGetBlogs = (page: number = 1, limit: number = 20) => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isFetchingBlogs, setIsFetchingBlogs] = useState<boolean>(true);
    const [getBlogsError, setGetBlogsError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination | null>(null);

    // Function to check if the blog is less than a week old
    const isBlogNew = (dateCreated: string) => {
        const createdDate = new Date(dateCreated);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - createdDate.getTime();
        const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        return timeDifference < oneWeekInMilliseconds;
    };


    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getBlogs(page, limit);  // Assuming this is the API call to fetch the data
                const updatedBlogs = response.data.map((blog: Blog) => ({
                    ...blog,
                    isNew: isBlogNew(blog.dateCreated), // Add the `isNew` attribute
                }));
                setBlogs(updatedBlogs);  // Set blogs data with the `isNew` attribute
                setPagination(response.pagination);  // Set pagination data
            } catch (err: any) {
                console.error("Failed to fetch blogs:", err);
                setGetBlogsError("Failed to fetch blogs.");
                toast.error("Failed to fetch blogs.");
            } finally {
                setIsFetchingBlogs(false);
            }
        };

        fetchBlogs();
    }, [page, limit]);

    return { blogs, isFetchingBlogs, getBlogsError, pagination };
};

// Hook for getting a single blog
export const useGetBlog = (blogId: string) => {
    const [blog, setBlog] = useState<any | null>(null);
    const [isFetchingSingleBlog, setIsFetchingSingleBlog] = useState<boolean>(true);
    const [getBlogError, setGetBlogError] = useState<string | null>(null);


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlog(blogId);
                setBlog(data);
            } catch (err: any) {
                console.error("Failed to fetch blog:", err);
                setGetBlogError("Failed to fetch blog.");
                toast.error("Failed to fetch blog.");
            } finally {
                setIsFetchingSingleBlog(false);
            }
        };

        fetchBlog();
    }, [blogId]);

    return { blog, isFetchingSingleBlog, getBlogError };
};

// Hook for searching blogs
export const useSearchBlogs = (keyword: string) => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isSearchingBlogs, setIsSearchingBlogs] = useState<boolean>(true);
    const [searchBlogsError, setSearchBlogsError] = useState<string | null>(null);


    useEffect(() => {
        const searchForBlogs = async () => {
            try {
                const data = await searchBlogs(keyword);
                setBlogs(data);
            } catch (err: any) {
                console.error("Failed to search blogs:", err);
                setSearchBlogsError("Failed to search blogs.");
                toast.error("Failed to search blogs.");
            } finally {
                setIsSearchingBlogs(false);
            }
        };

        if (keyword) {
            searchForBlogs();
        }
    }, [keyword]);

    return { blogs, isSearchingBlogs, searchBlogsError };
};


// Hook for editing a blog
export const useEditBlog = () => {
    const [isEditingBlog, setIsEditingBlog] = useState(false);
    const [editBlogError, setEditBlogError] = useState<string | null>(null);


    const editExistingBlog = async (blogId: string, updatedData: any) => {
        setIsEditingBlog(true);
        try {
            const response = await editBlog(blogId, updatedData);
            toast.success("Blog updated successfully!");
            return response;
        } catch (err: any) {
            console.error("Error editing blog:", err);
            setEditBlogError(err.message || "Failed to edit blog");
            toast.error("Failed to edit blog.");
            throw err;
        } finally {
            setIsEditingBlog(false);
        }
    };

    return { editExistingBlog, isEditingBlog, editBlogError };
};

// Hook for deleting a blog
export const useDeleteBlog = () => {
    const [isDeletingBlog, setIsDeletingBlog] = useState(false);
    const [deleteBlogError, setDeleteBlogError] = useState<string | null>(null);


    const deleteExistingBlog = async (blogId: string) => {
        setIsDeletingBlog(true);
        try {
            const response = await deleteBlog(blogId);
            toast.success("Blog deleted successfully!");
            return response;
        } catch (err: any) {
            console.error("Error deleting blog:", err);
            setDeleteBlogError(err.message || "Failed to delete blog");
            toast.error("Failed to delete blog.");
            throw err;
        } finally {
            setIsDeletingBlog(false);
        }
    };

    return { deleteExistingBlog, isDeletingBlog, deleteBlogError };
};