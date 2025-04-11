import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export interface Blog {
    id: string;
    title: string;
    slug: string;
    description: string;
    writer: string;
    dateCreated: string;
    image?: string;
    category?: string;
    isNew?: boolean;
}

// Sample blog data
const blogs: Blog[] = [
    {
        id: "1",
        title: "How Captivating Narratives Can Transform Your Writing and Engage Readers Deeply",
        slug: "upgrading-our-platform-for-a-better-experience",
        description: `
**Welcome to the future!**

We are thrilled to announce major upgrades to our platform. These changes are designed to **enhance your experience**, making it faster, more reliable, and easier to navigate.

Here’s what’s new:
- **Modern Interface**: Enjoy a cleaner, more intuitive design.
- **Faster Access**: Improved speed across all devices.
- **Seamless Navigation**: Find what you need, effortlessly.

We are committed to **continuous improvement** and your feedback is always welcome!

Thank you for being part of our journey. 🚀
    `,
        writer: "GOYA Team",
        dateCreated: "2025-01-10",
        image: "/images/image.png",
        category: "Platform Updates",
        isNew: true,
    },
];

const Blog = () => {
    const { slug } = useParams();

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Find the blog based on slug and year (for now just slug)
    const blog = blogs.find((b) => b.slug === slug);


    if (!blog) {
        return (
            <div className="container mx-auto mt-20 px-4 py-12 text-center h-64">
                <h1 className="text-3xl font-bold text-red-600">Blog not found</h1>
                <p className="text-gray-600 text-lg mt-2">We couldn’t find the blog you're looking for.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-20 px-4 py-12 max-w-4xl">

            <div className="">
                <div className="flex justify-between">
                    <p className="text-blue-600 uppercase font-medium tracking-wide">{blog.category}</p>
                    {blog.isNew && (
                        <div className="bg-blue-500 text-white font-semibold px-4 py-1 rounded-full shadow-md">
                            New
                        </div>
                    )}
                </div>
                <h1 className="text-4xl font-bold mt-7 mb-3 text-gray-800">{blog.title}</h1>
                <div className="flex items-center text-gray-600 mb-8 text-base">
                    <span>{formatDate(blog.dateCreated)}</span>
                    <span className="mx-3">•</span>
                    <span>By {blog.writer}</span>
                </div>
            </div>

            <div className="relative mb-8">
                {blog.image && (
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-[500px] object-cover rounded-xl shadow-sm"
                    />
                )}
            </div>

            <article className="prose prose-lg max-w-none text-gray-800 pb-16 text-lg">
                <ReactMarkdown
                    components={{
                        h1: ({ ...props }) => <h1 className="text-3xl font-bold my-6" {...props} />,
                        h2: ({ ...props }) => <h2 className="text-2xl font-bold my-5" {...props} />,
                        h3: ({ ...props }) => <h3 className="text-xl font-bold my-4" {...props} />,
                        p: ({ ...props }) => <p className="my-4 leading-relaxed" {...props} />,
                        ul: ({ ...props }) => <ul className="list-disc ml-6 my-4" {...props} />,
                        ol: ({ ...props }) => <ol className="list-decimal ml-6 my-4" {...props} />,
                        li: ({ ...props }) => <li className="my-2" {...props} />,
                        a: ({ ...props }) => <a className="text-primary underline" {...props}/>,
                        strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                        blockquote: ({ ...props }) => (
                            <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-700" {...props} />
                        ),
                    }}
                >
                    {blog.description}
                </ReactMarkdown>
            </article>
        </div>
    );
};

export default Blog;
