/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import ImageSelector from "./imageSelector";
import MarkdownToolbar from "./markdownToolbar";
import { useEffect, useState } from "react";

// Create a schema for the blog form - updated to remove slug and writer
const blogSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters" }),
    dateCreated: z.string(),
    image: z.string().optional(),
    category: z.string().optional(),
    isNew: z.boolean().optional(),
});

// export type BlogFormValues = z.infer<typeof blogSchema>;
export type BlogFormValues = z.infer<typeof blogSchema> & {
    imageFile?: File | null;
};

interface BlogFormProps {
    defaultValues: BlogFormValues;
    onSubmit: (data: BlogFormValues) => void | Promise<void>;
}

const BlogForm = ({ defaultValues, onSubmit }: BlogFormProps) => {
    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues,
    });

    // For markdown editor toolbar functions
    const insertMarkdown = (start: string, end: string = '') => {
        const textarea = document.getElementById('description') as HTMLTextAreaElement;
        if (!textarea) return;

        const selectionStart = textarea.selectionStart;
        const selectionEnd = textarea.selectionEnd;
        const currentValue = form.getValues('description');

        const beforeSelection = currentValue.substring(0, selectionStart);
        const selection = currentValue.substring(selectionStart, selectionEnd);
        const afterSelection = currentValue.substring(selectionEnd);

        const newValue = beforeSelection + start + selection + end + afterSelection;
        form.setValue('description', newValue, { shouldValidate: true });

        // Set focus back to textarea
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                selectionStart + start.length,
                selectionEnd + start.length
            );
        }, 0);
    };

    // Reset form when defaultValues change
    useEffect(() => {
        form.reset(defaultValues); // Properly reset the form with new values
    }, [defaultValues, form]);

    // Track the original image file
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleSubmit = form.handleSubmit(async (data) => {
        const finalData: BlogFormValues = {
            ...data,
            imageFile,
        };
        onSubmit(finalData);
    });

    return (
        <Form {...form}>
            {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"> */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-bold">Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="dateCreated"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-bold">Date</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        {...field}
                                    // disabled
                                    // className="cursor-not-allowed"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-bold">Category</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-bold">Featured Image</FormLabel>
                            <FormControl>
                                <ImageSelector
                                    value={field.value}
                                    onChange={(preview, file) => {
                                        field.onChange(preview);
                                        setImageFile(file || null);
                                        form.setValue('image', preview);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-bold">Description (Markdown)</FormLabel>
                            <div className="border rounded-lg overflow-hidden">
                                <MarkdownToolbar onInsertMarkdown={insertMarkdown} />
                                <FormControl>
                                    <textarea
                                        id="description"
                                        {...field}
                                        rows={15}
                                        className="w-full p-3 focus:outline-none resize-y bg-popover"
                                    />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-3">
                    <Button type="submit" className="px-8 font-semibold hover:bg-blue-600 duration-300">
                        Save Blog
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default BlogForm;