"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

interface Career {
  id: string;
  title: string;
  description: string;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  onCourseUploaded: () => void;
}

export default function UploadModal({
  isOpen,
  onClose,
  userId,
  onCourseUploaded,
}: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareerId, setSelectedCareerId] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch careers when the modal opens
    if (isOpen) {
      fetchCareers();
      // Reset form when opening
      setFile(null);
      setCourseName("");
      setCourseDescription("");
      setSelectedCareerId("");
      setError(null);
    }
  }, [isOpen]);

  const fetchCareers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/coach/get-careers"
      );
      setCareers(response.data);
    } catch (error) {
      console.error("Error fetching careers:", error);
      setError("Failed to load careers. Please try again.");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    if (!courseName.trim()) {
      toast.error("Please enter a course name");
      return;
    }

    if (!selectedCareerId) {
      toast.error("Please select a career");
      return;
    }

    if (!userId) {
      toast.error("User ID is missing");
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("courseName", courseName);
    formData.append("description", courseDescription);
    formData.append("coachId", userId);
    formData.append("careerId", selectedCareerId);

    try {
      await axios.post(
        "http://localhost:3000/api/v1/document/upload-course-doc",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Course uploaded successfully!");
      onClose();
      onCourseUploaded();
    } catch (error) {
      console.error("Error uploading course:", error);
      toast.error("Failed to upload course. Please try again.");
      setError("Failed to upload course. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Upload Course Document</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label
              htmlFor="courseName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Name
            </Label>
            <Input
              id="courseName"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter course name"
              required
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <Label
              htmlFor="courseDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Description
            </Label>
            <Textarea
              id="courseDescription"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              placeholder="Enter course description"
              className="w-full min-h-[100px]"
            />
          </div>

          <div className="mb-4">
            <Label
              htmlFor="career"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Career
            </Label>
            <Select
              value={selectedCareerId}
              onValueChange={setSelectedCareerId}
            >
              <SelectTrigger id="career" className="w-full">
                <SelectValue placeholder="Select a career" />
              </SelectTrigger>
              <SelectContent>
                {careers.map((career) => (
                  <SelectItem key={career.id} value={career.id}>
                    {career.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-6">
            <Label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Document File
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.mp4,.mov,.avi"
              />
              <label
                htmlFor="file"
                className="cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
              >
                <Upload className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">
                  {file ? file.name : "Click to select a file or drag and drop"}
                </span>
                {file && (
                  <span className="text-xs text-gray-500 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                )}
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
