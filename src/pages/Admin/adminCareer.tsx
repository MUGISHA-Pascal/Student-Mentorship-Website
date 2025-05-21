"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

// Sample career data
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
  {
    id: "3",
    title: "UX/UI Design",
    description:
      "A creative program focused on user experience and interface design principles. Students will learn design thinking, prototyping, user research, and industry-standard design tools.",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2025-03-25"),
    cohorts: [
      { id: "c4", name: "UX Cohort 2025", startDate: "Mar 2025", students: 20 },
    ],
    coaches: [
      {
        id: "coach4",
        name: "Prof. Michael Lee",
        specialty: "Interaction Design",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "coach5",
        name: "Dr. Lisa Johnson",
        specialty: "User Research",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
  },
  {
    id: "4",
    title: "Cybersecurity",
    description:
      "A specialized program covering network security, ethical hacking, cryptography, and security compliance. Students will learn to identify vulnerabilities and implement robust security measures.",
    createdAt: new Date("2024-04-05"),
    updatedAt: new Date("2025-05-01"),
    cohorts: [
      {
        id: "c5",
        name: "Cyber Cohort 2025",
        startDate: "Apr 2025",
        students: 18,
      },
    ],
    coaches: [
      {
        id: "coach6",
        name: "Dr. Robert Smith",
        specialty: "Network Security",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
  },
  {
    id: "5",
    title: "Cloud Computing",
    description:
      "A technical program focused on cloud platforms, infrastructure as code, and distributed systems. Students will gain hands-on experience with AWS, Azure, and Google Cloud.",
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2025-05-20"),
    cohorts: [
      {
        id: "c6",
        name: "Cloud Cohort 2025",
        startDate: "May 2025",
        students: 25,
      },
    ],
    coaches: [
      {
        id: "coach7",
        name: "Prof. David Kim",
        specialty: "Cloud Architecture",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "coach8",
        name: "Dr. Anna Martinez",
        specialty: "DevOps",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
  },
];

export default function AdminCareer() {
  const [careers, setCareers] = useState(initialCareers);
  const [selectedCareer, setSelectedCareer] = useState(careers[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
  });

  const filteredCareers = careers.filter((career) =>
    career.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCareer = (career) => {
    setSelectedCareer(career);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleEditCareer = () => {
    setFormData({
      id: selectedCareer.id,
      title: selectedCareer.title,
      description: selectedCareer.description,
    });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCreateCareer = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
    });
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveCareer = () => {
    if (isEditing) {
      // Update existing career
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
        updatedCareers.find((career) => career.id === formData.id)
      );
    } else if (isCreating) {
      // Create new career
      const newCareer = {
        id: `new-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        cohorts: [],
        coaches: [],
      };
      const updatedCareers = [...careers, newCareer];
      setCareers(updatedCareers);
      setSelectedCareer(newCareer);
    }
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleDeleteCareer = (id) => {
    const updatedCareers = careers.filter((career) => career.id !== id);
    setCareers(updatedCareers);
    if (updatedCareers.length > 0) {
      setSelectedCareer(updatedCareers[0]);
    } else {
      setSelectedCareer(null);
    }
  };

  return (
    <div className="  p-4 ">
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
                      {career.cohorts.length} cohort
                      {career.cohorts.length !== 1 ? "s" : ""} •{" "}
                      {career.coaches.length} coach
                      {career.coaches.length !== 1 ? "es" : ""}
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
          </Card>
        </div>

        {/* Right Column - Career Details or Form */}
        <div className="md:col-span-2">
          <Card className="p-6">
            {isEditing || isCreating ? (
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

                  {isEditing && (
                    <div className="pt-4 text-sm text-gray-500 italic">
                      Last updated:{" "}
                      {format(
                        selectedCareer.updatedAt,
                        "MMMM d, yyyy 'at' h:mm a"
                      )}
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
                    <span>
                      Created:{" "}
                      {format(selectedCareer.createdAt, "MMMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span>
                      Updated:{" "}
                      {format(selectedCareer.updatedAt, "MMMM d, yyyy")}
                    </span>
                  </div>
                </div>

                <Tabs defaultValue="cohorts" className="mt-6">
                  <TabsList className="mb-4">
                    <TabsTrigger value="cohorts" className="flex items-center">
                      <Users className="h-4 w-4 mr-1" /> Cohorts (
                      {selectedCareer.cohorts.length})
                    </TabsTrigger>
                    <TabsTrigger value="coaches" className="flex items-center">
                      <User className="h-4 w-4 mr-1" /> Coaches (
                      {selectedCareer.coaches.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="cohorts">
                    {selectedCareer.cohorts.length > 0 ? (
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
                    {selectedCareer.coaches.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCareer.coaches.map((coach) => (
                          <div
                            key={coach.id}
                            className="bg-gray-50 p-3 rounded-md flex items-center"
                          >
                            <Avatar className="h-10 w-10 mr-3">
                              <img
                                src={coach.avatar || "/placeholder.svg"}
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
