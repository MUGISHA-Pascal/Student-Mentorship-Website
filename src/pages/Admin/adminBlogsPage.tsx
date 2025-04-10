import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Blog } from "@/types/blog";
import { blogs as initialBlogs } from "@/data/blogData";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      toast.success("Blog deleted successfully!");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Manage Blogs</h2>
        <Link to="/admin/dashboard/blogs/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Blog</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto scr">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Title</TableHead>
                <TableHead className="min-w-[150px] hidden md:table-cell">Category</TableHead>
                <TableHead className="min-w-[120px] hidden sm:table-cell">Date</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">
                      <div className="truncate">{blog.title}</div>
                      <div className="md:hidden text-sm text-muted-foreground mt-1">
                        {blog.category || "Uncategorized"}
                      </div>
                      <div className="sm:hidden text-xs text-gray-500">
                        {formatDate(blog.dateCreated)}
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell">{blog.category || "Uncategorized"}</TableCell>

                    <TableCell className="hidden sm:table-cell">{formatDate(blog.dateCreated)}</TableCell>

                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${blog.isNew ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                        {blog.isNew ? "New" : "Published"}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                          <Link to={`/admin/dashboard/blogs/edit/${blog.id}`}>
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
    </div>
  );
};

export default AdminBlogsPage;
