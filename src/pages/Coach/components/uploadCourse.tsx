/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { XCircle, PauseCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";

interface UploadedFile {
  id: string;
  name: string;
  progress: number;
  status: "initial" | "uploading" | "done" | "failed";
  size: string;
  timeRemaining?: string;
  inputFile: File;
  startTime?: number;
  uploadedBytes?: number;
}

const UploadModal = ({
  isOpen,
  onClose,
  userId,
  onCourseUploaded,
}: {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  onCourseUploaded: () => void;
}) => {
  const [step, setStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseDetails, setCourseDetails] = useState({
    name: "",
    description: "",
  });
  const [
    ,
    // status
    setStatus,
  ] = useState<"initial" | "uploading" | "done" | "failed">("initial");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourseDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (files: FileList) => {
    if (files.length > 1) {
      toast.error("Please upload only one file at a time.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    const file = files[0];

    const newFile = {
      id: uuidv4(),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      progress: 0,
      status: "initial" as "initial" | "uploading" | "done" | "failed",
      inputFile: file,
      startTime: Date.now(),
      uploadedBytes: 0,
    };

    setUploadedFiles([newFile]); // Replace any existing file
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error("User ID is required to submit!", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    if (uploadedFiles.length === 0) {
      toast.error("Please upload a file before submitting.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    const file = uploadedFiles[0].inputFile; // Get the single file
    const formData = new FormData();

    formData.append("file", file); // Ensure the field name matches the backend's expected name
    formData.append("courseName", courseDetails.name);
    formData.append("description", courseDetails.description);
    formData.append("coachId", userId);

    try {
      setIsSubmitting(true);
      setUploadedFiles((prev) =>
        prev.map((f) => ({ ...f, status: "uploading", progress: 0 }))
      );

      // await axios.post('https://api.goyoungafrica.org/api/v1/document/upload-course-doc', formData, {
      await axios.post(
        "http://localhost:3000/api/v1/document/upload-course-doc",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total && progressEvent.loaded) {
              const progress = Math.min(
                (progressEvent.loaded / progressEvent.total) * 100,
                100
              );
              setUploadedFiles((prev) =>
                prev.map((f) =>
                  f.id === uploadedFiles[0].id ? { ...f, progress } : f
                )
              );
            }
          },
        }
      );

      toast.success("Submission successful!", {
        position: "top-right",
        autoClose: 5000,
      });
      setUploadedFiles((prev) =>
        prev.map((f) => ({ ...f, status: "done", progress: 100 }))
      );

      // Trigger the refresh of the courses list in the parent component
      onCourseUploaded(); // <-- Call the parent function to update the courses

      cancelAllProcesses();
    } catch (error) {
      console.error("Submission error:", error);
      setUploadedFiles((prev) => prev.map((f) => ({ ...f, status: "failed" })));

      const errorMessage = "Submission failed. Please try again.";
      toast.error(errorMessage, { position: "top-right", autoClose: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelUpload = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const cancelAllProcesses = () => {
    setUploadedFiles([]);
    setStatus("initial");
    onClose();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-xl font-semibold">
            {step === 1 ? "Upload Files" : "Course Details"}
          </h2>
        </DialogHeader>

        {step === 1 && (
          <div
            className={`border-2 border-dashed rounded-lg p-6 ${
              dragActive ? "border-blue-500" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="hidden"
              id="file-upload"
              multiple
              onChange={handleFileInputChange}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-center block"
            >
              <p className="text-blue-500 mb-2">Drag and drop files here</p>
              <p>or</p>
              <Button>Browse Files</Button>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Course Title
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={courseDetails.name}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Course Description
              </label>
              <textarea
                id="description"
                name="description"
                value={courseDetails.description}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 h-24"
              />
            </div>
          </div>
        )}

        {uploadedFiles.length > 0 && step === 1 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Uploaded Files</h3>
            <ul className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border p-2 rounded"
                >
                  <div className="flex-1">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.size}</p>
                    {file.status === "uploading" && (
                      <p className="text-xs text-gray-400">
                        {file.timeRemaining}
                      </p>
                    )}
                  </div>

                  <div className="w-1/3">
                    <Progress value={file.progress} />
                  </div>

                  <div className="ml-4 flex items-center space-x-2">
                    {file.status === "uploading" ? (
                      <>
                        <PauseCircle className="text-gray-500 w-5 h-5 cursor-pointer" />
                        <XCircle
                          onClick={() => cancelUpload(file.id)}
                          className="text-red-500 w-5 h-5 cursor-pointer"
                        />
                      </>
                    ) : (
                      <XCircle
                        onClick={() => cancelUpload(file.id)}
                        className="text-gray-500 w-5 h-5 cursor-pointer"
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <DialogFooter className="mt-4 flex justify-between">
          {step === 1 && (
            <Button onClick={cancelAllProcesses} variant="outline">
              Cancel
            </Button>
          )}

          {step === 1 && (
            <Button
              onClick={() => setStep(2)}
              disabled={uploadedFiles.some(
                (file) => file.status === "uploading"
              )}
              className={
                uploadedFiles.some((file) => file.status === "uploading")
                  ? "opacity-50"
                  : ""
              }
            >
              Next
            </Button>
          )}

          {step === 2 && (
            <>
              <Button onClick={() => setStep(1)} variant="outline">
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
