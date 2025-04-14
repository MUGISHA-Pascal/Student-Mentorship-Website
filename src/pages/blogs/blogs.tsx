/* eslint-disable @typescript-eslint/no-unused-vars */
import BlogCard from "@/components/blogs/blogCard";
import { useGetBlogs } from "@/hooks/admin/useBlog";
import { useEffect, useState } from "react";
import { Levels } from "react-activity";
import { useSearchParams } from "react-router-dom";


const Blogs = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const { blogs, isFetchingBlogs, getBlogsError, pagination } = useGetBlogs(page, 6);

    const totalPages = pagination?.totalPages || 1;
    const [currentPage, setCurrentPage] = useState(pagination?.currentPage || 1);


    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setSearchParams({ page: newPage.toString() });
        }
    };

    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams({ page: "1" });
        }
    }, [searchParams, setSearchParams]);

    if (isFetchingBlogs) {
        return <div className="mt-20 flex items-center justify-center h-[450px]">
            <Levels speed={0.5} />
        </div>;
    }

    if (getBlogsError) {
        return <div className="mt-20 flex flex-col items-center justify-center h-[450px] text-base font-semibold">
            Oops! Something went wrong. Please try again later.
            <span className="text-muted-foreground text-center">{getBlogsError}</span>
        </div>;
    }


    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-2xl font-bold text-center mb-6">Latest Blogs</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))
                ) : (
                    <div className="h-[70px] col-span-3 text-center text-muted-foreground font-semibold">
                        No blogs found.
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center mt-6">
                <div className="text-muted-foreground">
                    {`Page ${currentPage} of ${totalPages}`}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page <= 1}
                        className={`px-4 py-2 border rounded-xl font-bold ${page <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                    >
                        Prev
                    </button>
                    <span className="px-4 py-2 border rounded font-bold bg-gray-100">{page} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= totalPages}
                        className={`px-4 py-2 border rounded-xl font-bold ${page >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
