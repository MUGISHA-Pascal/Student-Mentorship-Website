"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  ChevronRight,
  Calendar,
  Users,
  Edit,
  Trash2,
  Save,
  X,
  AlertCircle,
  BookOpen,
  Clock,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

// Define TypeScript interfaces
interface Career {
  id: string;
  title: string;
  description: string;
}

enum CohortStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
}

interface Cohort {
  id: string;
  name: string;
  careerId: string;
  startDate: Date | string;
  endDate: Date | string;
  status: CohortStatus;
  capacity: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  enrollments?: Enrollment[];
}

interface Enrollment {
  id: string;
  studentId: string;
  cohortId: string;
  status: string;
  student: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

interface FormData {
  id: string;
  name: string;
  careerId: string;
  startDate: string;
  endDate: string;
  status: CohortStatus;
  capacity: number;
}

// Sample career data
const sampleCareers = [
  {
    id: "1",
    title: "Software Engineering",
    description:
      "A comprehensive program covering software development principles.",
  },
  {
    id: "2",
    title: "Data Science",
    description:
      "An in-depth exploration of data analysis and machine learning.",
  },
  {
    id: "3",
    title: "UX/UI Design",
    description:
      "A creative program focused on user experience and interface design principles.",
  },
  {
    id: "4",
    title: "Cybersecurity",
    description:
      "A specialized program covering network security and ethical hacking.",
  },
  {
    id: "5",
    title: "Cloud Computing",
    description:
      "A technical program focused on cloud platforms and infrastructure.",
  },
];

// Sample cohort data
const sampleCohorts = [
  {
    id: "c1",
    name: "SE Cohort 2025",
    careerId: "1",
    startDate: "2025-01-15T00:00:00.000Z",
    endDate: "2025-06-15T00:00:00.000Z",
    status: CohortStatus.UPCOMING,
    capacity: 30,
    createdAt: "2024-11-10T00:00:00.000Z",
    updatedAt: "2024-11-10T00:00:00.000Z",
    enrollments: [
      {
        id: "e1",
        studentId: "s1",
        cohortId: "c1",
        status: "ACTIVE",
        student: {
          id: "s1",
          name: "John Smith",
          email: "john.smith@example.com",
          avatar: "/placeholder.svg?height=50&width=50",
        },
      },
      {
        id: "e2",
        studentId: "s2",
        cohortId: "c1",
        status: "ACTIVE",
        student: {
          id: "s2",
          name: "Emily Johnson",
          email: "emily.johnson@example.com",
          avatar: "/placeholder.svg?height=50&width=50",
        },
      },
    ],
  },
  {
    id: "c2",
    name: "SE Advanced 2025",
    careerId: "1",
    startDate: "2025-03-01T00:00:00.000Z",
    endDate: "2025-09-01T00:00:00.000Z",
    status: CohortStatus.UPCOMING,
    capacity: 25,
    createdAt: "2024-12-15T00:00:00.000Z",
    updatedAt: "2024-12-15T00:00:00.000Z",
    enrollments: [],
  },
  {
    id: "c3",
    name: "DS Cohort 2025",
    careerId: "2",
    startDate: "2025-02-01T00:00:00.000Z",
    endDate: "2025-08-01T00:00:00.000Z",
    status: CohortStatus.UPCOMING,
    capacity: 25,
    createdAt: "2024-11-20T00:00:00.000Z",
    updatedAt: "2024-11-20T00:00:00.000Z",
    enrollments: [],
  },
  {
    id: "c4",
    name: "UX Cohort 2025",
    careerId: "3",
    startDate: "2025-03-15T00:00:00.000Z",
    endDate: "2025-09-15T00:00:00.000Z",
    status: CohortStatus.UPCOMING,
    capacity: 20,
    createdAt: "2024-12-05T00:00:00.000Z",
    updatedAt: "2024-12-05T00:00:00.000Z",
    enrollments: [],
  },
];

export default function AdminCohorts() {
  // State declarations
  const [careers, setCareers] = useState<Career[]>([]);
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    careerId: "",
    startDate: "",
    endDate: "",
    status: CohortStatus.UPCOMING,
    capacity: 30,
  });

  // Fetch careers and cohorts data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real application, these would be actual API calls
        // For now, we'll simulate API responses with our sample data

        // Simulate API call to fetch careers
        const careersResponse = await fetch(
          "http://localhost:3000/api/v1/coach/get-careers"
        );
        const careersData = await careersResponse.json();
        // const careersData = sampleCareers;

        // Simulate API call to fetch cohorts
        const cohortsResponse = await fetch(
          "http://localhost:3000/api/v1/coach/cohorts"
        );
        const cohortsData = await cohortsResponse.json();
        // const cohortsData = sampleCohorts.map((cohort) => ({
        //   ...cohort,
        //   startDate: new Date(cohort.startDate),
        //   endDate: new Date(cohort.endDate),
        //   createdAt: new Date(cohort.createdAt),
        //   updatedAt: new Date(cohort.updatedAt),
        // }));

        setCareers(careersData);
        setCohorts(cohortsData);

        // Set the first career as selected if available
        if (careersData.length > 0) {
          setSelectedCareer(careersData[0]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Using sample data instead.");

        // Fallback to sample data
        setCareers(sampleCareers);
        setCohorts(
          sampleCohorts.map((cohort) => ({
            ...cohort,
            startDate: new Date(cohort.startDate),
            endDate: new Date(cohort.endDate),
            createdAt: new Date(cohort.createdAt),
            updatedAt: new Date(cohort.updatedAt),
          }))
        );

        if (sampleCareers.length > 0) {
          setSelectedCareer(sampleCareers[0]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter cohorts based on selected career and search query
  const filteredCohorts = cohorts.filter(
    (cohort) =>
      (!selectedCareer || cohort.careerId === selectedCareer.id) &&
      cohort.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle selecting a career
  const handleSelectCareer = (careerId: string) => {
    const career = careers.find((c) => c.id === careerId);
    setSelectedCareer(career || null);
    setSelectedCohort(null);
    setIsEditing(false);
    setIsCreating(false);
  };

  // Handle selecting a cohort
  const handleSelectCohort = (cohort: Cohort) => {
    setSelectedCohort(cohort);
    setIsEditing(false);
    setIsCreating(false);
  };

  // Handle editing a cohort
  const handleEditCohort = () => {
    if (!selectedCohort) return;

    setFormData({
      id: selectedCohort.id,
      name: selectedCohort.name,
      careerId: selectedCohort.careerId,
      startDate: formatDateForInput(selectedCohort.startDate),
      endDate: formatDateForInput(selectedCohort.endDate),
      status: selectedCohort.status,
      capacity: selectedCohort.capacity,
    });
    setIsEditing(true);
    setIsCreating(false);
  };

  // Handle creating a new cohort
  const handleCreateCohort = () => {
    setFormData({
      id: "",
      name: "",
      careerId: selectedCareer?.id || "",
      startDate: "",
      endDate: "",
      status: CohortStatus.UPCOMING,
      capacity: 30,
    });
    setIsCreating(true);
    setIsEditing(false);
  };

  // Handle canceling edit/create
  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "capacity" ? Number.parseInt(value) || 0 : value,
    });
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle saving a cohort (create or update)
  const handleSaveCohort = async () => {
    try {
      if (isEditing) {
        // Update existing cohort
        // In a real application, this would be an API call
        const response = await fetch(
          `http://localhost:3000/api/v1/coach/update-cohort/${formData.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        const updatedCohort = await response.json();

        // Simulate API response
        // const updatedCohort = {
        //   ...formData,
        //   id: formData.id,
        //   startDate: new Date(formData.startDate),
        //   endDate: new Date(formData.endDate),
        //   createdAt: selectedCohort?.createdAt || new Date(),
        //   updatedAt: new Date(),
        //   enrollments: selectedCohort?.enrollments || [],
        // };

        // Update local state
        const updatedCohorts = cohorts.map((cohort) =>
          cohort.id === formData.id ? updatedCohort : cohort
        );

        setCohorts(updatedCohorts);
        setSelectedCohort(updatedCohort);
      } else if (isCreating) {
        // Create new cohort
        // In a real application, this would be an API call
        const response = await fetch(
          "http://localhost:3000/api/v1/coach/add-cohort",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        const newCohort = await response.json();

        // Simulate API response
        // const newCohort = {
        //   ...formData,
        //   id: `new-${Date.now()}`,
        //   startDate: new Date(formData.startDate),
        //   endDate: new Date(formData.endDate),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   enrollments: [],
        // };

        const updatedCohorts = [...cohorts, newCohort];
        setCohorts(updatedCohorts);
        setSelectedCohort(newCohort);
      }

      setIsEditing(false);
      setIsCreating(false);
      setError(null);
    } catch (err) {
      console.error("Error saving cohort:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  // Handle deleting a cohort
  const handleDeleteCohort = async (id: string) => {
    try {
      // In a real application, this would be an API call
      await fetch(`http://localhost:3000/api/v1/coach/delete-cohort/${id}`, {
        method: "DELETE",
      });

      // Update local state
      //   const updatedCohorts = cohorts.filter((cohort) => cohort.id !== id);
      //   setCohorts(updatedCohorts);

      // Update selected cohort if needed
      if (selectedCohort && selectedCohort.id === id) {
        setSelectedCohort(null);
      }

      setError(null);
    } catch (err) {
      console.error("Error deleting cohort:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  // Format date for display
  const formatDate = (date: Date | string) => {
    if (!date) return "N/A";
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return format(dateObj, "MMMM d, yyyy");
    } catch (err) {
      return "Invalid date";
    }
  };

  // Format date for input fields
  const formatDateForInput = (date: Date | string) => {
    if (!date) return "";
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return format(dateObj, "yyyy-MM-dd");
    } catch (err) {
      return "";
    }
  };

  // Get status badge color
  const getStatusColor = (status: CohortStatus) => {
    switch (status) {
      case CohortStatus.UPCOMING:
        return "bg-blue-100 text-blue-800";
      case CohortStatus.ONGOING:
        return "bg-green-100 text-green-800";
      case CohortStatus.COMPLETED:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate enrollment percentage
  const calculateEnrollmentPercentage = (cohort: Cohort) => {
    if (!cohort.enrollments || cohort.capacity === 0) return 0;
    return Math.min(
      100,
      Math.round((cohort.enrollments.length / cohort.capacity) * 100)
    );
  };

  return (
    <div className=" mx-auto p-4 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Cohort Management</h1>
        <div className="flex items-center gap-2">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1"
            onClick={handleCreateCohort}
            disabled={!selectedCareer}
          >
            <Plus className="h-4 w-4" /> Add Cohort
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Career Selection and Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label
            htmlFor="career-select"
            className="block text-sm font-medium mb-2"
          >
            Select Career
          </Label>
          <Select
            value={selectedCareer?.id || ""}
            onValueChange={(value) => handleSelectCareer(value)}
          >
            <SelectTrigger id="career-select" className="w-full">
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
        <div>
          <Label
            htmlFor="search-cohorts"
            className="block text-sm font-medium mb-2"
          >
            Search Cohorts
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="search-cohorts"
              placeholder="Search cohorts by name..."
              className="pl-10 bg-gray-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Cohort List */}
        <div className="md:col-span-1">
          <Card className="p-4">
            <h2 className="font-medium mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
              Cohorts {selectedCareer ? `for ${selectedCareer.title}` : ""} (
              {filteredCohorts.length})
            </h2>

            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                Loading cohorts...
              </div>
            ) : !selectedCareer ? (
              <div className="text-center py-8 text-gray-500">
                Please select a career to view cohorts
              </div>
            ) : filteredCohorts.length > 0 ? (
              <div className="space-y-3">
                {filteredCohorts.map((cohort) => (
                  <div
                    key={cohort.id}
                    onClick={() => handleSelectCohort(cohort)}
                    className={`p-3 rounded-md flex items-center justify-between cursor-pointer transition-colors ${
                      selectedCohort && selectedCohort.id === cohort.id
                        ? "bg-blue-50 border-l-4 border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div>
                      <h3 className="font-medium">{cohort.name}</h3>
                      <div className="flex items-center mt-1">
                        <Badge className={getStatusColor(cohort.status)}>
                          {cohort.status}
                        </Badge>
                        <span className="text-xs text-gray-500 ml-2">
                          {formatDate(cohort.startDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCohort(cohort.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <ChevronRight
                        className={`h-5 w-5 ${
                          selectedCohort && selectedCohort.id === cohort.id
                            ? "text-blue-500"
                            : "text-gray-300"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No cohorts found for this career. Create a new one to get
                started.
              </div>
            )}
          </Card>
        </div>

        {/* Right Column - Cohort Details or Form */}
        <div className="md:col-span-2">
          <Card className="p-6">
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">
                Loading cohort details...
              </div>
            ) : isEditing || isCreating ? (
              /* Cohort Form */
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">
                    {isCreating ? "Create New Cohort" : "Edit Cohort"}
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-500"
                      onClick={handleCancelEdit}
                    >
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={handleSaveCohort}
                      disabled={
                        !formData.name ||
                        !formData.startDate ||
                        !formData.endDate ||
                        !formData.careerId
                      }
                    >
                      <Save className="h-4 w-4 mr-1" /> Save
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1"
                    >
                      Cohort Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter cohort name"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="career-id"
                      className="block text-sm font-medium mb-1"
                    >
                      Career <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.careerId}
                      onValueChange={(value) =>
                        handleSelectChange("careerId", value)
                      }
                    >
                      <SelectTrigger id="career-id" className="w-full">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="startDate"
                        className="block text-sm font-medium mb-1"
                      >
                        Start Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="endDate"
                        className="block text-sm font-medium mb-1"
                      >
                        End Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="status"
                      className="block text-sm font-medium mb-1"
                    >
                      Status
                    </Label>
                    <RadioGroup
                      value={formData.status}
                      onValueChange={(value) =>
                        handleSelectChange("status", value)
                      }
                      className="flex flex-wrap gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={CohortStatus.UPCOMING}
                          id="upcoming"
                        />
                        <Label
                          htmlFor="upcoming"
                          className="text-sm font-normal"
                        >
                          Upcoming
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={CohortStatus.ONGOING}
                          id="ongoing"
                        />
                        <Label
                          htmlFor="ongoing"
                          className="text-sm font-normal"
                        >
                          Ongoing
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={CohortStatus.COMPLETED}
                          id="completed"
                        />
                        <Label
                          htmlFor="completed"
                          className="text-sm font-normal"
                        >
                          Completed
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label
                      htmlFor="capacity"
                      className="block text-sm font-medium mb-1"
                    >
                      Capacity <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      min="1"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="w-full"
                      required
                    />
                  </div>
                </div>
              </div>
            ) : selectedCohort ? (
              /* Cohort Details */
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold">{selectedCohort.name}</h2>
                    <p className="text-gray-500">
                      {careers.find((c) => c.id === selectedCohort.careerId)
                        ?.title || "Unknown Career"}
                    </p>
                  </div>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={handleEditCohort}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span>
                      Start Date: {formatDate(selectedCohort.startDate)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span>End Date: {formatDate(selectedCohort.endDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge
                      className={`${getStatusColor(
                        selectedCohort.status
                      )} mr-2`}
                    >
                      {selectedCohort.status}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span>Created: {formatDate(selectedCohort.createdAt)}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Enrollment Status</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">
                        {selectedCohort.enrollments?.length || 0} /{" "}
                        {selectedCohort.capacity} students enrolled
                      </span>
                      <span className="text-sm font-medium">
                        {calculateEnrollmentPercentage(selectedCohort)}%
                      </span>
                    </div>
                    <Progress
                      value={calculateEnrollmentPercentage(selectedCohort)}
                      className="h-2"
                    />
                  </div>
                </div>

                <Tabs defaultValue="students" className="mt-6">
                  <TabsList className="mb-4">
                    <TabsTrigger value="students" className="flex items-center">
                      <Users className="h-4 w-4 mr-1" /> Enrolled Students (
                      {selectedCohort.enrollments?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="details" className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" /> Additional Details
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="students">
                    {selectedCohort.enrollments &&
                    selectedCohort.enrollments.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCohort.enrollments.map((enrollment) => (
                          <div
                            key={enrollment.id}
                            className="bg-gray-50 p-3 rounded-md flex items-center"
                          >
                            <Avatar className="h-10 w-10 mr-3">
                              <img
                                src={
                                  enrollment.student.avatar ||
                                  "/placeholder.svg?height=50&width=50"
                                }
                                alt={enrollment.student.name}
                              />
                            </Avatar>
                            <div>
                              <h4 className="font-medium">
                                {enrollment.student.name}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {enrollment.student.email}
                              </p>
                            </div>
                            <Badge className="ml-auto bg-green-100 text-green-800">
                              {enrollment.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No students enrolled in this cohort yet.
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="details">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Capacity</h4>
                        <p className="text-gray-600">
                          {selectedCohort.capacity} students
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Duration</h4>
                        <p className="text-gray-600">
                          {Math.round(
                            (new Date(selectedCohort.endDate).getTime() -
                              new Date(selectedCohort.startDate).getTime()) /
                              (1000 * 60 * 60 * 24 * 30)
                          )}{" "}
                          months
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Last Updated</h4>
                        <p className="text-gray-600">
                          {formatDate(selectedCohort.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                {selectedCareer
                  ? "No cohort selected. Please select a cohort from the list or create a new one."
                  : "Please select a career to manage its cohorts."}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
