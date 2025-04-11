import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Blog } from "@/hooks/admin/useBlog";

interface BlogTableProps {
    blogs: Blog[];
    handleDelete: (id: string) => void;
    formatDate: (dateString: string) => string;
    onPageChange: (newPage: number) => void;
    currentPage: number;
    totalPages: number;
}


const BlogTable: React.FC<BlogTableProps> = ({
    blogs,
    handleDelete,
    formatDate,
    onPageChange,
    currentPage,
    totalPages,
}) => {
    return (
        <div className="text-base">
            <div className="border rounded shadow-sm overflow-hidden">

                <div className="overflow-x-auto py-4 px-3">
                    <Table className="">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="min-w-[200px] text-lg font-bold">Title</TableHead>
                                <TableHead className="min-w-[150px] text-lg font-bold hidden md:table-cell">Category</TableHead>
                                <TableHead className="min-w-[120px] text-lg font-bold hidden sm:table-cell">Date</TableHead>
                                <TableHead className="min-w-[100px] text-lg font-bold">Status</TableHead>
                                <TableHead className="min-w-[120px] text-lg font-bold text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <TableRow key={blog.id}>
                                        <TableCell className="font-medium lg:py-5">
                                            <div>{blog.title.length > 50 ? `${blog.title.slice(0, 60)}...` : blog.title}</div>
                                            <div className="md:hidden text-sm text-muted-foreground mt-1">
                                                {blog.category}
                                            </div>
                                            <div className="sm:hidden text-xs text-gray-500">
                                                {formatDate(blog.dateCreated)}
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden md:table-cell">{blog.category}</TableCell>

                                        <TableCell className="hidden sm:table-cell">{formatDate(blog.dateCreated)}</TableCell>

                                        <TableCell>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${blog.isNew ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                                                {blog.isNew ? "New" : "Published"}
                                            </span>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <div className="flex justify-end items-center gap-2">
                                                <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                                                    <Link to={`/admin/dashboard/blogs/edit/${blog.slug}`} onClick={() => {
                                                        localStorage.setItem("blogId", blog.id);
                                                    }}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => handleDelete(blog.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                        No blogs found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="text-muted-foreground">
                    {`Page ${currentPage} of ${totalPages}`}
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        Previous
                    </Button>
                    <Button
                        className="px-7"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BlogTable