/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteBlog, useGetBlogs } from "@/hooks/admin/useBlog";
import { Levels } from "react-activity";
import BlogTable from "@/components/blogs/blogTable";

const AdminBlogsPage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  // const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const { blogs, isFetchingBlogs, getBlogsError, pagination, refetch } = useGetBlogs();
  console.log("Blogs: ", blogs);

  const { deleteExistingBlog, isDeletingBlog } = useDeleteBlog();

  const [currentPage, setCurrentPage] = useState(pagination?.currentPage || 1);
  // const itemsPerPage = 10;


  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));
  };

  const handleDelete = (id: string) => {
    // if (window.confirm("Are you sure you want to delete this blog?")) {
    //   // Delete the blog logic
    //   toast.success("Blog deleted successfully!");
    //   // Re-fetch blogs or update state after deletion
    // }
    setBlogToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      try {
        await deleteExistingBlog(blogToDelete);
        await refetch();                         // refetch blogs after delete
        setShowDeleteModal(false);
        setBlogToDelete(null);
      } catch (error) {
        console.error("Failed to delete blog:", error);
        // Optional: Keep modal open or close it depending on your UX preference
      }
    }
  };


  const cancelDelete = () => {
    setShowDeleteModal(false);
    setBlogToDelete(null);
  };


  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Re-fetch blogs based on new page
  };

  useEffect(() => {
    // Only fetch blogs if pagination data is available
    if (pagination) {
      setCurrentPage(pagination.currentPage);
    }
  }, [pagination]);



  if (isFetchingBlogs) {
    return <div className="flex items-center justify-center h-full">
      <Levels speed={0.5} />
    </div>;
  }

  if (getBlogsError) {
    return <div className="flex flex-col items-center justify-center h-full text-base font-semibold">
      Oops! Something went wrong. Please try again later.
      <span className="text-muted-foreground text-center">{getBlogsError}</span>
    </div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">All Blogs</h2>
        <Link to="/admin/dashboard/blogs/new">
          <Button
            className="flex items-center gap-2"
            onClick={() => {
              localStorage.removeItem("blogId");
            }}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Blog</span>
          </Button>
        </Link>
      </div>

      <BlogTable
        blogs={blogs}
        handleDelete={handleDelete}
        formatDate={formatDate}
        onPageChange={onPageChange}
        currentPage={currentPage}
        totalPages={pagination?.totalPages || 1}
      />

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-muted p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Delete Blog</h2>
            <p className="mb-6">Are you sure you want to delete this blog?</p>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete} disabled={isDeletingBlog}>
                {isDeletingBlog ? "Deleting..." : "Delete"}
              </Button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBlogsPage;
