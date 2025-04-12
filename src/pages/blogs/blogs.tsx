import BlogCard from "@/components/blogs/blogCard";
import { useGetBlogs } from "@/hooks/admin/useBlog";
import { useEffect, useState } from "react";
import { Levels } from "react-activity";
import { useSearchParams } from "react-router-dom";


const Blogs = () => {
    const { blogs, isFetchingBlogs, getBlogsError, pagination } = useGetBlogs();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const blogsPerPage = 6;

    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const startIndex = (page - 1) * blogsPerPage;
    const selectedBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

    // const goToPage = (pageNumber: number) => {
    //     setSearchParams({ page: pageNumber.toString() });
    // };

    const [currentPage, setCurrentPage] = useState(pagination?.currentPage || 1);

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
                {selectedBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>

            <div className="flex justify-between items-center mt-6">
                <div className="text-muted-foreground">
                    {`Page ${currentPage} of ${totalPages}`}
                </div>
                <div className="flex gap-2">
                    <button
                        // onClick={() => goToPage(page - 1)}
                        // disabled={page === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className={`px-4 py-2 border rounded-xl font-bold ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                    >
                        Prev
                    </button>
                    <span className="px-4 py-2 border rounded font-bold bg-gray-100">{page} of {totalPages}</span>
                    <button
                        // onClick={() => goToPage(page + 1)}
                        // disabled={page === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className={`px-4 py-2 border rounded-xl font-bold ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
