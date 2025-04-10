import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Blog } from "@/types/blog";
import { blogs as initialBlogs } from "@/data/blogData";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import BlogForm, { BlogFormValues } from "@/components/blogs/blogForm";
import BlogPreview from "@/components/blogs/blogPreview";

const BlogEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    const [previewMode, setPreviewMode] = useState(false);
    const isNewBlog = !id || id === "new";

    // Find blog if editing
    const currentBlog = isNewBlog ? null : blogs.find(blog => blog.id === id);

    // Form default values - only include fields that the UI manages
    const defaultValues: BlogFormValues = {
        title: currentBlog?.title || "",
        description: currentBlog?.description || "",
        dateCreated: currentBlog?.dateCreated || new Date().toISOString().split('T')[0],
        image: currentBlog?.image || "",
        category: currentBlog?.category || "",
        isNew: currentBlog?.isNew || true,
    };

    // Keep track of form values for preview
    const [formValues, setFormValues] = useState<BlogFormValues>(defaultValues);

    // Handle form submission
    const onSubmit = (data: BlogFormValues) => {
        // Save current form values for preview
        setFormValues(data);

        if (isNewBlog) {
            // Create new blog - slug and writer will be handled by backend
            const newBlog: Blog = {
                id: (blogs.length + 1).toString(),
                title: data.title,
                description: data.description,
                dateCreated: data.dateCreated,
                image: data.image,
                category: data.category,
                isNew: data.isNew
            };
            setBlogs([...blogs, newBlog]);
            toast({
                title: "Success",
                description: "New blog created successfully!",
            });
        } else {
            // Update existing blog
            const updatedBlogs = blogs.map(blog =>
                blog.id === id ? { ...blog, ...data } : blog
            );
            setBlogs(updatedBlogs);
            toast({
                title: "Success",
                description: "Blog updated successfully!",
            });
        }

        // Navigate back to blog list
        navigate("/admin/dashboard/blogs");
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex flex-row justify-end md:items-center gap-4 mb-6">
                {/* <h2 className="text-xl font-bold">{isNewBlog ? "Create New Blog" : "Edit Blog"}</h2> */}
                <div className="flex flex-wrap gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setPreviewMode(!previewMode)}
                    >
                        {previewMode ? "Edit" : "Preview"}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate("/admin/dashboard/blogs")}
                    >
                        Cancel
                    </Button>
                </div>
            </div>

            {previewMode ? (
                <BlogPreview formValues={formValues} />
            ) : (
                <BlogForm
                    defaultValues={defaultValues}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

export default BlogEditor;