/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useGetBlogs } from "@/hooks/admin/useBlog";
import { Levels } from "react-activity";
import BlogTable from "@/components/blogs/blogTable";

const AdminBlogsPage = () => {
  // const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const { blogs, isFetchingBlogs, getBlogsError, pagination } = useGetBlogs();
  console.log("Blogs: ", blogs);

  const [currentPage, setCurrentPage] = useState(pagination?.currentPage || 1);
  const itemsPerPage = 10;


  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      // Delete the blog logic
      toast.success("Blog deleted successfully!");
      // Re-fetch blogs or update state after deletion
    }
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
          <Button className="flex items-center gap-2">
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
    </div>
  );
};

export default AdminBlogsPage;
