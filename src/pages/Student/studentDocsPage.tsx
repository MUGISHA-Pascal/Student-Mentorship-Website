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

interface Course {
  id: string;
  name: string;
  description: string;
  careerId: string;
}

interface Document {
  id: string;
  coachId: string;
  courseId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  fileUrl: string;
  course: Course;
}

interface StudentDocsPageProps {
  studentId: string;
}

export default function StudentDocsPage({
  studentId = "1",
}: StudentDocsPageProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
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

  // Helper function to get file extension from fileName
  const getFileExtension = (fileName: string) => {
    return fileName.split(".").pop()?.toUpperCase() || "FILE";
  };

  // Helper function to determine if file is video
  const isVideoFile = (fileType: string) => {
    return fileType.startsWith("video/");
  };

  // Helper function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  // Fetch documents from API
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

      setDocuments(Array.isArray(documentsData) ? documentsData : []);
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

  // Filter based on search, filter type, and sort type
  const filteredDocuments = documents
    .filter(
      (doc) =>
        doc.course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((doc) => {
      if (!filterType) return true;
      if (filterType === "video") return isVideoFile(doc.fileType);
      if (filterType === "file") return !isVideoFile(doc.fileType);
      return true;
    })
    .sort((a, b) => {
      if (sortType === "name") {
        return a.course.name.localeCompare(b.course.name);
      } else if (sortType === "date") {
        return (
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        );
      } else if (sortType === "size") {
        return b.fileSize - a.fileSize;
      }
      return 0;
    });

  const visibleDocuments = showAll
    ? filteredDocuments
    : filteredDocuments.slice(0, 5);

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
              <DropdownMenuItem onClick={() => setSortType("size")}>
                Size
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* No documents message */}
      {!loading && !error && documents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No documents found for this student.
          </p>
        </div>
      )}

      {/* No filtered results message */}
      {!loading &&
        !error &&
        documents.length > 0 &&
        filteredDocuments.length === 0 && (
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

      {/* See All / Show Less Button */}
      {filteredDocuments.length > 5 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSeeAllClick}
            className="text-blue-400 hover:text-blue-600 font-semibold transition duration-700"
          >
            {showAll ? "Show Less" : "See All"}
          </button>
        </div>
      )}

      {/* Document Cards */}
      {!loading && !error && filteredDocuments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {visibleDocuments.map((document) => (
            <Card
              key={document.id}
              className="shadow-md rounded-lg py-4 px-2 cursor-pointer"
            >
              <img
                src={
                  isVideoFile(document.fileType)
                    ? "/svgs/video_course.svg"
                    : "/svgs/file_course.svg"
                }
                alt={document.course.name}
                className="w-4/5 object-contain rounded-md mb-4"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=150&width=150";
                }}
              />

              <h3
                className="text-lg font-semibold mb-2 truncate"
                title={document.course.name}
              >
                {document.course.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {getFileExtension(document.fileName)}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                {formatFileSize(document.fileSize)}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
              </p>
              <div className="flex justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 rotate-90">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>
                      <a
                        href={document.fileUrl}
                        download={document.fileName}
                        className="w-full"
                      >
                        Download
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <a
                  href={document.fileUrl}
                  download={document.fileName}
                  className="hover:text-blue-500"
                >
                  <img
                    src="/svgs/download.svg"
                    alt="Download"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
