"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "../Admin/components/ui/alert";
import { toast } from "react-toastify";

type Course = {
  id: string;
  title: string;
  image: string;
  extension?: string;
  downloadLink: string;
  courseType: string;
  dateCreated: string;
};

interface StudentDocsPageProps {
  studentId: string;
}

export default function StudentDocsPage({
  studentId = "1",
}: StudentDocsPageProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  // Extract and memoize the actual student ID to prevent dependency changes
  const actualStudentId = useMemo(() => {
    try {
      const userData = localStorage.getItem("user");
      const parsedUserData = userData ? JSON.parse(userData) : null;
      return parsedUserData?.user?.student?.id || studentId;
    } catch (e) {
      console.error("Error parsing user data");
      return studentId;
    }
  }, [studentId]);

  const fetchDocuments = useCallback(async () => {
    if (!actualStudentId) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3000/api/v1/document/get-course-student/${actualStudentId}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch documents: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const documentsData = data.documents || data.data || data;

      const transformedCourses = Array.isArray(documentsData)
        ? documentsData.map(
            (doc: any): Course => ({
              id: doc.course?.id || doc.id,
              title: doc.course?.name || "Untitled",
              image: doc.fileType?.startsWith("video")
                ? "/svgs/video_course.svg"
                : "/svgs/file_course.svg",
              extension: doc.fileType?.split("/").pop()?.toUpperCase(),
              downloadLink:
                doc.fileUrl ||
                `http://localhost:3000/api/v1/document/download-course-doc/${doc.fileName}`,
              courseType: doc.fileType?.startsWith("video") ? "video" : "file",
              dateCreated: doc.uploadDate,
            })
          )
        : [];

      setCourses(transformedCourses);
    } catch (err) {
      setError("Unable to load documents. Please try again later.");
      console.error("Error fetching documents:", err);
    } finally {
      setLoading(false);
    }
  }, [actualStudentId]);

  // Only fetch once when component mounts or when actualStudentId changes
  useEffect(() => {
    fetchDocuments();
  }, [actualStudentId]);

  const handleSeeAllClick = () => {
    setShowAll(!showAll);
  };

  const handleRetry = () => {
    fetchDocuments();
  };

  const handleDownload = async (
    downloadLink: string,
    fileName: string,
    extension?: string
  ) => {
    try {
      const response = await fetch(downloadLink, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to download: ${response.status} ${response.statusText}`
        );
      }

      const blob = await response.blob();

      // Use the provided extension, fallback to extracting from fileName, or default to "unknown"
      const finalExtension = extension?.toLowerCase();

      // Construct the final file name
      const baseName = fileName.includes(".")
        ? fileName.split(".").slice(0, -1).join(".")
        : fileName; // Strip existing extension if present
      const finalFileName = `${baseName}.${finalExtension}`;

      // Create a URL and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", finalFileName);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("File downloaded successfully!");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file.");
    }
  };

  const filteredCourses = courses
    .filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((course) => {
      if (!filterType) return true;
      if (filterType === "video") return course.courseType === "video";
      if (filterType === "file") return course.courseType === "file";
      return true;
    })
    .sort((a, b) => {
      if (sortType === "name") {
        return a.title.localeCompare(b.title);
      } else if (sortType === "date") {
        return (
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        );
      }
      return 0;
    });

  const visibleCourses = showAll
    ? filteredCourses
    : filteredCourses.slice(0, 5);

  // Loading state
  if (loading) {
    return (
      <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Documents</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading documents...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Documents</h1>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Unable to load documents. Please try again later.</span>
            <Button variant="outline" size="sm" onClick={handleRetry}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Search, Filter, and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        {/* Search */}
        <div className="relative w-full sm:w-64 mb-2 sm:mb-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search documents..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter and Sort */}
        <div className="flex space-x-2 w-full sm:w-auto">
          {/* Filter by file type */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterType(null)}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("file")}>
                Files
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("video")}>
                Videos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort by name, date, or size */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortType("name")}>
                Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortType("date")}>
                Date
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {!loading && !error && courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No documents found for this student.
          </p>
        </div>
      )}

      {!loading &&
        !error &&
        courses.length > 0 &&
        filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No documents match your search criteria.
            </p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => {
                setSearchTerm("");
                setFilterType(null);
                setSortType(null);
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

      {filteredCourses.length > 5 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSeeAllClick}
            className="text-blue-400 hover:text-blue-600 font-semibold transition duration-700"
          >
            {showAll ? "Show Less" : "See All"}
          </button>
        </div>
      )}

      {!loading && !error && filteredCourses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {visibleCourses.map((course) => (
            <Card
              key={course.id}
              className="shadow-md rounded-lg py-4 px-2 cursor-pointer"
            >
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-4/5 object-contain rounded-md mb-4"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=150&width=150";
                }}
              />

              <h3
                className="text-lg font-semibold mb-2 truncate"
                title={course.title}
              >
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">{course.extension}</p>
              <p className="text-sm text-gray-600 mb-2">
                Created: {new Date(course.dateCreated).toLocaleDateString()}
              </p>
              <div className="flex justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 rotate-90">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {/* <DropdownMenuItem>View</DropdownMenuItem> */}
                    <DropdownMenuItem
                      onClick={() =>
                        handleDownload(
                          course.downloadLink,
                          course.title,
                          course.extension
                        )
                      }
                    >
                      Download
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  onClick={() =>
                    handleDownload(
                      course.downloadLink,
                      course.title,
                      course.extension
                    )
                  }
                  className="hover:text-blue-500"
                >
                  <img
                    src="/svgs/download.svg"
                    alt="Download"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
