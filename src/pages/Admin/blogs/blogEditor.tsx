/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BlogForm, { BlogFormValues } from "@/components/blogs/blogForm";
import BlogPreview from "@/components/blogs/blogPreview";
import { useGetBlog, useCreateBlog, useEditBlog } from "@/hooks/admin/useBlog";
import { Levels } from "react-activity";

const BlogEditor = () => {
    const id = localStorage.getItem("blogId");
    const { slug } = useParams();
    const navigate = useNavigate();
    const isNewBlog = !id || id === "new";
    // const { blog, isFetchingSingleBlog } = useGetBlog(id || ""); // Fetch blog from backend
    const { blog, isFetchingSingleBlog } = useGetBlog(!isNewBlog ? slug : undefined);

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
            // const newFormValues: BlogFormValues = {
            //     title: blog.title || "",
            //     description: blog.description || "",
            //     dateCreated: blog.dateCreated ? blog.dateCreated.split('T')[0] : new Date().toISOString().split('T')[0],
            //     image: blog.image || "",
            //     category: blog.category || "",
            //     isNew: blog.isNew ?? true, // Add isNew attribute
            // };
            // setFormValues(newFormValues);
            setFormValues({
                title: blog.title || "",
                description: blog.description || "",
                dateCreated: blog.dateCreated ? blog.dateCreated.split('T')[0] : new Date().toISOString().split('T')[0],
                image: blog.image || "",
                category: blog.category || "",
                isNew: blog.isNew ?? true,
              });
        }
    }, [blog, isNewBlog]);

    const handleSubmit = async (values : any) => {
        if (isNewBlog) {
            await createNewBlog(values);
          } else {
            await editExistingBlog(id || "", values);
          }
          navigate("/admin/dashboard/blogs");
    }

    if (isFetchingSingleBlog && !isNewBlog) {
        return <div className="flex items-center justify-center h-full">
            <Levels speed={0.5} />
        </div>;
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
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default BlogEditor;
