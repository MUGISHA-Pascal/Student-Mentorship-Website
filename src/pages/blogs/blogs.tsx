import BlogCard from "@/components/blogs/blogCard";
import { Blog } from "@/types/blog";
import { useSearchParams } from "react-router-dom";

const blogs: Blog[] = [
    {
        id: "1",
        title: "How Captivating Narratives Can Transform Your Writing and Engage Readers Deeply",
        slug: "upgrading-our-platform-for-a-better-experience",
        description: "React Hooks allow functional components to have state and side effects React Hooks allow functional components to have state and side effects React Hooks allow functional components to have state and side effects",
        writer: "John Doe",
        dateCreated: "2024-03-15T10:00:00Z",
        image: "/images/image.png",
        category: "Communication",
        isNew: true
    },
    {
        id: "2",
        title: "Tailwind CSS Tips & Tricks",
        slug: "tailwind-css-tips-tricks",
        description: "Tailwind CSS is a utility-first framework that allows for rapid UI development React Hooks allow functional components to have state and side effects React Hooks allow functional components to have state and side effects",
        writer: "Jane Smith",
        dateCreated: "2023-11-20T15:30:00Z",
        image: "/images/image.png",
        category: "Communication",
        isNew: true
    },
    {
        id: "3",
        title: "Next.js for Beginners",
        slug: "nextjs-for-beginners",
        description: "Next.js is a powerful React framework that enables server-side rendering React Hooks allow functional components to have state and side effects React Hooks allow functional components to have state and side effects",
        writer: "Alex Brown",
        dateCreated: "2022-06-10T08:15:00Z",
        image: "/images/image.png",
        category: "Communication",
        isNew: true
    },
    {
        id: "4",
        title: "Understanding React Hooks",
        slug: "understanding-react-hooks",
        description: "React Hooks allow functional components to have state and side effects React Hooks allow functional components to have state and side effects React Hooks allow functional components to have state and side effects",
        writer: "John Doe",
        dateCreated: "2024-03-15T10:00:00Z",
        image: "/images/image.png",
        category: "Communication",
        isNew: true
    },
    {
        id: "5",
        title: "Tailwind CSS Tips & Tricks",
        slug: "tailwind-css-tips-tricks",
        description: "Tailwind CSS is a utility-first framework that allows for rapid UI development React Hooks allow functional components to have state and side effects React Hooks allow functional components to have state and side effects",
        writer: "Jane Smith",
        dateCreated: "2023-11-20T15:30:00Z",
        image: "/images/image.png",
        category: "Communication",
        isNew: false
    },
    {
        id: "6",
        title: "Next.js for Beginners",
        slug: "nextjs-for-beginners",
        description: "Next.js is a powerful React framework that enables server-side rendering React Hooks allow functional components to have state and side effects React Hooks allow functional components to have state and side effects",
        writer: "Alex Brown",
        dateCreated: "2022-06-10T08:15:00Z",
        image: "/images/image.png",
        category: "Communication",
        isNew: false
    },
    {
        id: "7",
        title: "Tailwind CSS Tips & Tricks",
        slug: "tailwind-css-tips-tricks",
        description: "Tailwind CSS is a utility-first framework that allows for rapid UI development React Hooks allow functional components to have state and side effects React Hooks allow functional components to have state and side effects",
        writer: "Jane Smith",
        dateCreated: "2023-11-20T15:30:00Z",
        image: "/images/image.png",
        category: "Communication",
        isNew: false
    },
    {
        id: "8",
        title: "Next.js for Beginners",
        slug: "nextjs-for-beginners",
        description: "Next.js is a powerful React framework that enables server-side rendering React Hooks allow functional components to have state and side effects React Hooks allow functional components to have state and side effects",
        writer: "Alex Brown",
        dateCreated: "2022-06-10T08:15:00Z",
        image: "/images/image.png",
        category: "Communication",
        isNew: false
    },
];

const Blogs = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const blogsPerPage = 6;

    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const startIndex = (page - 1) * blogsPerPage;
    const selectedBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

    const goToPage = (pageNumber: number) => {
        setSearchParams({ page: pageNumber.toString() });
    };
    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-2xl font-bold text-center mb-6">Latest Blogs</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>

            <div className="flex justify-center items-center mt-6 space-x-10">
                <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 border rounded-xl font-bold ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                >
                    Prev
                </button>
                <span className="px-4 py-2 border rounded font-bold bg-gray-100">{page} of {totalPages}</span>
                <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className={`px-4 py-2 border rounded-xl font-bold ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Blogs;
