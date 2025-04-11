import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import BlogForm, { BlogFormValues } from "@/components/blogs/blogForm";
import BlogPreview from "@/components/blogs/blogPreview";
import { useGetBlog, useCreateBlog, useEditBlog } from "@/hooks/admin/useBlog";

const BlogEditor = () => {
    const id = localStorage.getItem("blogId");
    const navigate = useNavigate();
    const isNewBlog = !id || id === "new";
    // const { blog, isFetchingSingleBlog } = useGetBlog(id || ""); // Fetch blog from backend
    const { blog, isFetchingSingleBlog } = useGetBlog(!isNewBlog ? id : undefined);

    const { editExistingBlog } = useEditBlog();

    const { createNewBlog } = useCreateBlog();

    const [previewMode, setPreviewMode] = useState(false);
    const [formValues, setFormValues] = useState<BlogFormValues>({
        title: "",
        description: "",
        dateCreated: new Date().toISOString().split('T')[0],
        image: "",
        category: "",
        isNew: true,
    });

    // When the blog is fetched, populate form values
    useEffect(() => {
        if (blog && !isNewBlog) {
            const newFormValues: BlogFormValues = {
                title: blog.title || "",
                description: blog.description || "",
                dateCreated: blog.dateCreated ? blog.dateCreated.split('T')[0] : new Date().toISOString().split('T')[0],
                image: blog.image || "",
                category: blog.category || "",
                isNew: blog.isNew ?? true, // Add isNew attribute
            };

            setFormValues(newFormValues);
        }
    }, [blog, isNewBlog]);


    const onSubmit = async (data: BlogFormValues & { imageFile?: File }) => {
        setFormValues(data);

        if (previewMode) {
            // If in preview mode, don't submit to backend
            return;
        }

        
        

        try {
            if (isNewBlog) {
                await createNewBlog(data);
                toast.success("New blog created successfully!");
            } else {
                // You probably have an `editBlog` function in your service
                // await editExistingBlog(id, data);
                await editExistingBlog(id as string, {
                    ...data,
                    image: data.imageFile ? data.image : data.image
                });
            }

            navigate("/admin/dashboard/blogs");
        } catch (error) {
            console.error("Error saving blog:", error);
            toast.error("Failed to save blog.");
        }
    };

    if (isFetchingSingleBlog && !isNewBlog) {
        return <div>Loading blog...</div>; // Optionally improve UX
    }

    return (
        <div className="rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex flex-row justify-end md:items-center gap-4 mb-6">
                <div className="flex flex-wrap gap-3">
                    <Button
                        variant="outline"
                        className="text-base font-semibold"
                        onClick={() => {
                            if (!previewMode) {
                              // Get current form values without submitting
                              const formElement = document.querySelector('form');
                              if (formElement) {
                                const formData = new FormData(formElement);
                                const values = Object.fromEntries(formData.entries());
                                setFormValues({
                                  ...formValues,
                                  ...values,
                                  // Ensure proper typing for non-string fields
                                  dateCreated: values.dateCreated as string,
                                  isNew: formValues.isNew
                                });
                              }
                            }
                            setPreviewMode(!previewMode);
                          }}
                        
                    >
                        {previewMode ? "Edit" : "Preview"}
                    </Button>
                    <Button
                        variant="outline"
                        className="text-base font-semibold"
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
                    defaultValues={formValues}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

export default BlogEditor;
