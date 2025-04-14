import ReactMarkdown from 'react-markdown';
import { BlogFormValues } from './blogForm';

interface BlogPreviewProps {
    formValues: BlogFormValues;
}

const BlogPreview = ({ formValues }: BlogPreviewProps) => {
    console.log("Formvalues in preview: ", formValues);
    
    return (
        <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="text-popover-foreground">
                <h1 className="text-4xl font-bold mt-7 mb-3">{formValues.title}</h1>
                <div className="flex justify-start items-center space-x-10">
                    <p className="text-blue-600 uppercase font-medium tracking-wide">{formValues.category}</p>
                    {formValues.isNew && (
                        <div className="bg-blue-500 text-white font-semibold px-4 py-[1px] rounded-full shadow-md">
                            New
                        </div>
                    )}
                </div>
                <div className="flex items-center text-gray-600 mb-4 text-base">
                    <span>{new Date(formValues.dateCreated).toLocaleDateString()}</span>
                </div>
            </div>

            {formValues.image && (
                <img
                    src={formValues.image}
                    alt={formValues.title}
                    className="w-full h-[500px] object-cover rounded-lg mb-6"
                />
            )}
            <article className="prose prose-lg max-w-none pb-16 text-base">
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
                    {formValues.description}
                </ReactMarkdown>
            </article>
        </div>
    );
};

export default BlogPreview;