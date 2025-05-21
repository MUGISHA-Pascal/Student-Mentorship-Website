"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  Bell,
  Plus,
  Search,
  ChevronRight,
  Briefcase,
  Calendar,
  Users,
  User,
  Edit,
  Trash2,
  Save,
  X,
  AlertCircle,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";

// Sample career data for fallback
const initialCareers = [
  {
    id: "1",
    title: "Software Engineering",
    description:
      "A comprehensive program covering software development principles, programming languages, and industry best practices. Students will learn full-stack development, DevOps, and software architecture.",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-03-10"),
    cohorts: [
      { id: "c1", name: "SE Cohort 2025", startDate: "Jan 2025", students: 28 },
      {
        id: "c2",
        name: "SE Advanced 2025",
        startDate: "Mar 2025",
        students: 22,
      },
    ],
    coaches: [
      {
        id: "coach1",
        name: "Dr. James Wilson",
        specialty: "Backend Development",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "coach2",
        name: "Prof. Sarah Chen",
        specialty: "Frontend Development",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
  },
  {
    id: "2",
    title: "Data Science",
    description:
      "An in-depth exploration of data analysis, machine learning, and statistical modeling. Students will work with real-world datasets and develop skills in Python, R, and various data visualization tools.",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2025-04-05"),
    cohorts: [
      { id: "c3", name: "DS Cohort 2025", startDate: "Feb 2025", students: 24 },
    ],
    coaches: [
      {
        id: "coach3",
        name: "Dr. Emily Rodriguez",
        specialty: "Machine Learning",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
  },
];

// Define TypeScript interfaces
interface Cohort {
  id: string;
  name: string;
  startDate: string;
  students: number;
}

interface Coach {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
}

interface Career {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  cohorts: Cohort[];
  coaches: Coach[];
}

interface FormData {
  id: string;
  title: string;
  description: string;
}

export default function AdminCareer() {
  // State declarations
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    title: "",
    description: "",
  });

  // Fetch careers data
  useEffect(() => {
    const fetchCareers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/coach/get-careers"
        );

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        let data = await response.json();

        // Process the data to ensure it matches our expected format
        // This handles potential differences between API data structure and component expectations
        data = data.map((career: any) => ({
          ...career,
          createdAt: new Date(career.createdAt),
          updatedAt: new Date(career.updatedAt),
          // Ensure cohorts and coaches are arrays even if they're not in the API response
          cohorts: Array.isArray(career.cohorts) ? career.cohorts : [],
          coaches: Array.isArray(career.coaches) ? career.coaches : [],
        }));

        setCareers(data);

        // Set the first career as selected if available
        if (data.length > 0) {
          setSelectedCareer(data[0]);
        }
      } catch (err) {
        console.error("Error fetching careers:", err);
        setError("Failed to load careers. Using sample data instead.");
        // Fallback to sample data
        setCareers(initialCareers);
        if (initialCareers.length > 0) {
          setSelectedCareer(initialCareers[0]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, []);

  // Filter careers based on search query
  const filteredCareers = careers.filter((career) =>
    career.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle selecting a career
  const handleSelectCareer = (career: Career) => {
    setSelectedCareer(career);
    setIsEditing(false);
    setIsCreating(false);
  };

  // Handle editing a career
  const handleEditCareer = () => {
    if (!selectedCareer) return;

    setFormData({
      id: selectedCareer.id,
      title: selectedCareer.title,
      description: selectedCareer.description,
    });
    setIsEditing(true);
    setIsCreating(false);
  };

  // Handle creating a new career
  const handleCreateCareer = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
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
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle saving a career (create or update)
  const handleSaveCareer = async () => {
    try {
      if (isEditing) {
        // Update existing career
        const response = await fetch(
          `http://localhost:3000/api/v1/coach/update-career/${formData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: formData.title,
              description: formData.description,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to update career: ${response.statusText}`);
        }

        // Update local state
        const updatedCareers = careers.map((career) =>
          career.id === formData.id
            ? {
                ...career,
                title: formData.title,
                description: formData.description,
                updatedAt: new Date(),
              }
            : career
        );

        setCareers(updatedCareers);
        setSelectedCareer(
          updatedCareers.find((career) => career.id === formData.id) || null
        );
      } else if (isCreating) {
        // Create new career
        const response = await fetch(
          "http://localhost:3000/api/v1/coach/create-career",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: formData.title,
              description: formData.description,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to create career: ${response.statusText}`);
        }

        const newCareer = await response.json();

        // Ensure the returned data matches our expected format
        const formattedNewCareer = {
          ...newCareer,
          createdAt: new Date(newCareer.createdAt),
          updatedAt: new Date(newCareer.updatedAt),
          cohorts: Array.isArray(newCareer.cohorts) ? newCareer.cohorts : [],
          coaches: Array.isArray(newCareer.coaches) ? newCareer.coaches : [],
        };

        const updatedCareers = [...careers, formattedNewCareer];
        setCareers(updatedCareers);
        setSelectedCareer(formattedNewCareer);
      }

      setIsEditing(false);
      setIsCreating(false);
      setError(null);
    } catch (err) {
      console.error("Error saving career:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  // Handle deleting a career
  const handleDeleteCareer = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/coach/delete-career/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete career: ${response.statusText}`);
      }

      // Update local state
      const updatedCareers = careers.filter((career) => career.id !== id);
      setCareers(updatedCareers);

      // Update selected career if needed
      if (selectedCareer && selectedCareer.id === id) {
        setSelectedCareer(updatedCareers.length > 0 ? updatedCareers[0] : null);
      }

      setError(null);
    } catch (err) {
      console.error("Error deleting career:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  // Format date safely
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return format(dateObj, "MMMM d, yyyy");
    } catch (err) {
      console.error("Error formatting date:", err);
      return "Invalid date";
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Career Management</h1>
        <div className="flex items-center gap-2">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1"
            onClick={handleCreateCareer}
          >
            <Plus className="h-4 w-4" /> Add Career
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

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search careers by title..."
          className="pl-10 bg-gray-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Career List */}
        <div className="md:col-span-1">
          <Card className="p-4">
            <h2 className="font-medium mb-4 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
              Careers ({filteredCareers.length})
            </h2>

            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                Loading careers...
              </div>
            ) : filteredCareers.length > 0 ? (
              <div className="space-y-3">
                {filteredCareers.map((career) => (
                  <div
                    key={career.id}
                    onClick={() => handleSelectCareer(career)}
                    className={`p-3 rounded-md flex items-center justify-between cursor-pointer transition-colors ${
                      selectedCareer && selectedCareer.id === career.id
                        ? "bg-blue-50 border-l-4 border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div>
                      <h3 className="font-medium">{career.title}</h3>
                      <p className="text-xs text-gray-500">
                        {career.cohorts?.length || 0} cohort
                        {(career.cohorts?.length || 0) !== 1 ? "s" : ""} •{" "}
                        {career.coaches?.length || 0} coach
                        {(career.coaches?.length || 0) !== 1 ? "es" : ""}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCareer(career.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <ChevronRight
                        className={`h-5 w-5 ${
                          selectedCareer && selectedCareer.id === career.id
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
                No careers found. Create a new one to get started.
              </div>
            )}
          </Card>
        </div>

        {/* Right Column - Career Details or Form */}
        <div className="md:col-span-2">
          <Card className="p-6">
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">
                Loading career details...
              </div>
            ) : isEditing || isCreating ? (
              /* Career Form */
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">
                    {isCreating ? "Create New Career" : "Edit Career"}
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
                      onClick={handleSaveCareer}
                      disabled={!formData.title || !formData.description}
                    >
                      <Save className="h-4 w-4 mr-1" /> Save
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium mb-1"
                    >
                      Career Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter career title"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium mb-1"
                    >
                      Description <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter career description"
                      className="w-full min-h-[150px]"
                      required
                    />
                  </div>

                  {isEditing && selectedCareer && (
                    <div className="pt-4 text-sm text-gray-500 italic">
                      Last updated: {formatDate(selectedCareer.updatedAt)}
                    </div>
                  )}
                </div>
              </div>
            ) : selectedCareer ? (
              /* Career Details */
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">{selectedCareer.title}</h2>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={handleEditCareer}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-gray-600">{selectedCareer.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span>Created: {formatDate(selectedCareer.createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span>Updated: {formatDate(selectedCareer.updatedAt)}</span>
                  </div>
                </div>

                <Tabs defaultValue="cohorts" className="mt-6">
                  <TabsList className="mb-4">
                    <TabsTrigger value="cohorts" className="flex items-center">
                      <Users className="h-4 w-4 mr-1" /> Cohorts (
                      {selectedCareer.cohorts?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="coaches" className="flex items-center">
                      <User className="h-4 w-4 mr-1" /> Coaches (
                      {selectedCareer.coaches?.length || 0})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="cohorts">
                    {selectedCareer.cohorts &&
                    selectedCareer.cohorts.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCareer.cohorts.map((cohort) => (
                          <div
                            key={cohort.id}
                            className="bg-gray-50 p-3 rounded-md flex justify-between items-center"
                          >
                            <div>
                              <h4 className="font-medium">{cohort.name}</h4>
                              <p className="text-xs text-gray-500">
                                Started: {cohort.startDate}
                              </p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                              {cohort.students} Students
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No cohorts assigned to this career yet.
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="coaches">
                    {selectedCareer.coaches &&
                    selectedCareer.coaches.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCareer.coaches.map((coach) => (
                          <div
                            key={coach.id}
                            className="bg-gray-50 p-3 rounded-md flex items-center"
                          >
                            <Avatar className="h-10 w-10 mr-3">
                              <img
                                src={
                                  coach.avatar ||
                                  "/placeholder.svg?height=50&width=50"
                                }
                                alt={coach.name}
                              />
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{coach.name}</h4>
                              <p className="text-xs text-gray-500">
                                {coach.specialty}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No coaches assigned to this career yet.
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No career selected. Please select a career from the list or
                create a new one.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
