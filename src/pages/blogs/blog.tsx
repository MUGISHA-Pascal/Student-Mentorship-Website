import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useGetBlog } from "@/hooks/admin/useBlog";
import { Levels } from "react-activity";

export interface Blog {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    dateCreated: string;
    image?: string;
    isNew?: boolean;
    userId: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        role: string;
    };
}

const Blog = () => {
    const { slug } = useParams();
    const { blog, isFetchingSingleBlog, getBlogError } = useGetBlog(slug);


    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (isFetchingSingleBlog) {
        return <div className="mt-20 flex items-center justify-center h-[450px]">
            <Levels speed={0.5} />
        </div>;
    }

    if (getBlogError) {
        return <div className="mt-20 flex flex-col items-center justify-center h-[450px] text-base font-semibold">
            Oops! Something went wrong. Please try again later.
            <span className="text-muted-foreground text-center">{getBlogError}</span>
        </div>;
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
                    <span>By {blog.user.firstName} {blog.user.lastName}</span>
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
                        a: ({ ...props }) => <a className="text-primary underline" target="_blank" rel="noopener noreferrer" {...props} />,
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
