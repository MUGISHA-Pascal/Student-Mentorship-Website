// import React, { useState, useEffect } from 'react'
// import { Search, MoreVertical, UserPlus } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Dialog, DialogTrigger } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import MentorStatistics from '@/components/dashboard/mentor/mentorStatistics'

// interface StudentItemProps {
//   student: Student;
//   isWaitlist?: boolean;
// }

// const StudentItem: React.FC<StudentItemProps> = ({ student, isWaitlist = false }) => (
//   <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 text-card-foreground rounded-lg mb-2 cursor-pointer bg-muted">
//     <div className="flex items-center mb-2 sm:mb-0 ">
//       <input type="checkbox" className="mr-4" />
//       <img src='/images/avatar.png' alt={student.user.firstName} className="w-10 h-10 rounded-full mr-4" />
//       <div>
//         <div className="font-medium">{student.user.firstName} {student.user.lastName}</div>
//         <div className="text-sm text-muted-foreground">{student.user.email}</div>
//       </div>
//     </div>
//     <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0">
//       <div className="mb-2 sm:mb-0 sm:mr-4 text-primary">{student.educationLevel}</div>
//       {!isWaitlist && <MoreVertical className="text-muted-foreground hidden sm:block" />}
//     </div>
//   </div>
// )

// const StudentProfile: React.FC<{
//   student: {
//     email: React.ReactNode
//     address: React.ReactNode; avatar: string; name: string; field: string
//   }
// }> = ({ student }) => (
//   <div className="bg-card text-card-foreground p-6 rounded-lg">
//     <img src={student.avatar} alt={student.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
//     <h3 className="text-xl font-bold text-center mb-2">{student.name}</h3>
//     <p className="text-muted-foreground text-center mb-6">{student.field}</p>
//     <Tabs defaultValue="personal">
//       <TabsList className="grid w-full grid-cols-3">
//         <TabsTrigger value="personal">Personal</TabsTrigger>
//         <TabsTrigger value="courses">Courses</TabsTrigger>
//         <TabsTrigger value="achievements">Achievements</TabsTrigger>
//       </TabsList>
//       <TabsContent value="personal" className="mt-4">
//         <div className="space-y-2">
//           <div><span className="font-medium">Name:</span> {student.name}</div>
//           <div><span className="font-medium">Email:</span> {student.email}</div>
//           <div><span className="font-medium">Address:</span> {student.address}</div>
//           <div><span className="font-medium">Field:</span> {student.field}</div>
//         </div>
//       </TabsContent>
//       <TabsContent value="courses">Courses content</TabsContent>
//       <TabsContent value="achievements">Achievements content</TabsContent>
//     </Tabs>
//     <div className="mt-6 space-x-2 flex flex-col sm:flex-row">
//       <Button className="mb-2 sm:mb-0">Message</Button>
//       <Button variant="destructive">Remove</Button>
//     </div>
//   </div>
// )
// interface Student {
//   id: string; // UUID string
//   userId: string;
//   bio: string | null;
//   educationLevel: string | null;
//   email: string;
//   firstName: string;
//   lastName: string;
//   status: 'WAITLIST' | 'APPROVED';
//   user: {
//     firstName: string;
//     lastName: string;
//     email: string;
//   };
// }

// export default function StudentsPage() {
//   const [students, setStudents] = useState<Student[]>([])
//   const [waitlist, setWaitlist] = useState<Student[]>([])
//   const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('name')
//   const [
//     // filterField
//     , setFilterField] = useState('All')
//   const [selectedWaitlistStudents, setSelectedWaitlistStudents] = useState<number[]>([])

//   useEffect(() => {
//     fetch(`https://api.goyoungafrica.org/api/v1/coach/students/988784a2-7b03-473e-b221-1ee62a34da18`)
//       .then(res => res.json())
//       .then(data => {
//         const approved = data.filter((student: Student) => student.status === 'APPROVED');
//         const pending = data.filter((student: Student) => student.status === 'WAITLIST');
//         setStudents(approved);
//         setWaitlist(pending);
//         if (approved.length > 0) setSelectedStudent(approved[0]);
//       });
//   }, []);

//   // useEffect(() => {
//   //   if (students.length > 0 && !selectedStudent) {
//   //     setSelectedStudent(students[0])
//   //   }
//   // }, [students, selectedStudent])

//   const handleSearch = (query: string) => {
//     setSearchQuery(query)
//   }

//   const handleSort = (criteria: string) => {
//     setSortBy(criteria)
//   }

//   const handleFilter = (field: string) => {
//     setFilterField(field)
//   }

//   const handleStudentSelect = (student: Student) => {
//     setSelectedStudent(student)
//   }

//   // const handleWaitlistStudentSelect = (studentId: number) => {
//   //   setSelectedWaitlistStudents(prev =>
//   //     prev.includes(studentId)
//   //       ? prev.filter(id => id !== studentId)
//   //       : [...prev, studentId]
//   //   )
//   // }

//   // const handleApproveWaitlist = () => {
//   //   const approvedStudents = waitlist.filter(student => selectedWaitlistStudents.includes(student.id))
//   //   setStudents(prev => [...prev, ...approvedStudents])
//   //   setWaitlist(prev => prev.filter(student => !selectedWaitlistStudents.includes(student.id)))
//   //   setSelectedWaitlistStudents([])
//   // }

//   const handleApproval = async (studentId : string, approve : boolean) => {
//     try {
//       // Send API request to update the student's status
//       const response = await fetch(
//         `https://api.goyoungafrica.org/api/v1/coach/988784a2-7b03-473e-b221-1ee62a34da18/student/status`,
//         {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             studentId,
//             status: approve ? 'APPROVED' : 'WAITLIST',
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to update student status');
//       }

//       // Update the frontend state based on the approval action
//       if (approve) {
//         const approvedStudent = waitlist.find((s) => s.id === studentId);
//         if (approvedStudent) {
//           setStudents((prev) => [...prev, { ...approvedStudent, status: 'APPROVED' }]);
//           setWaitlist((prev) => prev.filter((s) => s.id !== studentId));
//         }
//       } else {
//         const demotedStudent = students.find((s) => s.id === studentId);
//         if (demotedStudent) {
//           setWaitlist((prev) => [...prev, { ...demotedStudent, status: 'WAITLIST' }]);
//           setStudents((prev) => prev.filter((s) => s.id !== studentId));
//         }
//       }

//       setSelectedWaitlistStudents([]); // Clear selection after the operation
//     } catch (error) {
//       console.error('Error updating student status:', error);
//     }
//   };

//   // const handleRemoveWaitlist = () => {
//   //   setWaitlist(prev => prev.filter(student => !selectedWaitlistStudents.includes(student.id)))
//   //   setSelectedWaitlistStudents([])
//   // }

//   const filteredStudents = students
//     .filter(student =>
//       student.user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       student.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       student.user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     // .filter(student => filterField === 'All' || student.field === filterField)
//     .sort((a, b) => {
//       if (sortBy === 'name') return a.firstName.localeCompare(b.firstName)
//       if (sortBy === 'email') return a.email.localeCompare(b.email)
//       return 0
//     })

//   return (
//     <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
//       <div className="mb-7">
//         <MentorStatistics />
//       </div>

//       <div className="flex flex-col lg:flex-row">
//         <div className="w-full lg:w-2/3 lg:pr-6 mb-6 lg:mb-0">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//             <h2 className="text-xl font-semibold mb-2 sm:mb-0">Students List</h2>
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button>
//                   <UserPlus className="mr-2 h-4 w-4" /> Add Student
//                 </Button>
//               </DialogTrigger>
//             </Dialog>
//           </div>
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//             <div className="relative w-full sm:w-auto mb-2 sm:mb-0">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 className="pl-10 w-full sm:w-auto"
//                 placeholder="Search"
//                 value={searchQuery}
//                 onChange={(e) => handleSearch(e.target.value)}
//               />
//             </div>
//             <div className="flex items-center space-x-2 w-full sm:w-auto">
//               <Select onValueChange={handleFilter} defaultValue="All">
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Filter by field" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="All">All Fields</SelectItem>
//                   <SelectItem value="Music & Dancing">Music & Dancing</SelectItem>
//                   <SelectItem value="Software Engineering">Software Engineering</SelectItem>
//                   <SelectItem value="Photography">Photography</SelectItem>
//                   <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
//                   <SelectItem value=">Web Developement">Web Developement</SelectItem>
//                   {/* Add more fields as needed */}
//                 </SelectContent>
//               </Select>
//               <Select onValueChange={handleSort} defaultValue="name">
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="name">Sort by Name</SelectItem>
//                   <SelectItem value="email">Sort by Email</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <div className="space-y-2">
//             {filteredStudents.map(student => (
//               <div key={student.id} onClick={() => handleStudentSelect(student)}>
//                 <StudentItem student={student} />
//               </div>
//             ))}
//           </div>
//           <div></div>
//           <h2 className="text-xl font-semibold mt-8 mb-4">Waitlist (Pending Approvals)</h2>
//           <div className="space-y-2">
//             {waitlist.map(student => (
//               // <div key={student.id} onClick={() => handleWaitlistStudentSelect(student.id)}>
//               //   <StudentItem
//               //     student={student}
//               //     isWaitlist
//               //   />
//               // </div>
//               <div key={student.id} className="flex items-center justify-between bg-muted p-4 rounded-lg">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     className="mr-4"
//                     checked={selectedWaitlistStudents.includes(student.id)}
//                     onChange={() => setSelectedWaitlistStudents(prev =>
//                       prev.includes(student.id) ? prev.filter(id => id !== student.id) : [...prev, student.id]
//                     )}
//                   />
//                   <img src="/images/avatar.png" alt={student.user.firstName} className="w-10 h-10 rounded-full mr-4" />
//                   <div>
//                     <div className="font-medium">{student.user.firstName} {student.user.lastName}</div>
//                     <div className="text-sm text-muted-foreground">{student.user.email}</div>
//                   </div>
//                 </div>
//                 <div className="flex space-x-2">
//                   <Button variant="outline" onClick={() => handleApproval(student.id, true)}>Approve</Button>
//                   <Button variant="destructive" onClick={() => handleApproval(student.id, false)}>Reject</Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="w-full lg:w-1/3">
//           {selectedStudent && <StudentProfile student={selectedStudent} />}
//         </div>
//       </div>
//     </div>
//   )
// }

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Video,
  Bell,
  Plus,
  Search,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  GraduationCap,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Sample student data
const students = [
  {
    id: 1,
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+250 780 111 222",
    avatar: "/svgs/avatar1.svg?height=100&width=100",
    program: "Computer Science",
    year: "3rd Year",
    gpa: 3.8,
    attendance: 92,
    lastActive: "Today, 10:30 AM",
    courses: [
      { id: 1, name: "Advanced Algorithms", progress: 85, grade: "A" },
      { id: 2, name: "Database Systems", progress: 78, grade: "B+" },
      { id: 3, name: "Web Development", progress: 92, grade: "A+" },
    ],
    assignments: [
      {
        id: 1,
        name: "Algorithm Analysis",
        dueDate: "May 25, 2025",
        status: "Pending",
      },
      {
        id: 2,
        name: "Database Design",
        dueDate: "May 22, 2025",
        status: "Submitted",
      },
    ],
    bio: "Dedicated computer science student with a passion for software development and artificial intelligence. Active participant in hackathons and coding competitions.",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+250 780 333 444",
    avatar: "/svgs/avatar1.svg?height=100&width=100",
    program: "Electrical Engineering",
    year: "4th Year",
    gpa: 3.9,
    attendance: 88,
    lastActive: "Yesterday, 3:45 PM",
    courses: [
      { id: 1, name: "Circuit Analysis", progress: 90, grade: "A" },
      { id: 2, name: "Digital Systems", progress: 85, grade: "A-" },
      { id: 3, name: "Control Systems", progress: 82, grade: "B+" },
    ],
    assignments: [
      {
        id: 1,
        name: "Circuit Design Project",
        dueDate: "May 28, 2025",
        status: "In Progress",
      },
      {
        id: 2,
        name: "Digital Logic Lab",
        dueDate: "May 21, 2025",
        status: "Submitted",
      },
    ],
    bio: "Aspiring electrical engineer with interests in renewable energy systems and embedded electronics. Currently working on a senior project focused on smart grid technologies.",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    phone: "+250 780 555 666",
    avatar: "/svgs/avatar1.svg?height=100&width=100",
    program: "Business Administration",
    year: "2nd Year",
    gpa: 3.7,
    attendance: 95,
    lastActive: "Today, 9:15 AM",
    courses: [
      { id: 1, name: "Marketing Principles", progress: 88, grade: "B+" },
      { id: 2, name: "Financial Accounting", progress: 92, grade: "A" },
      { id: 3, name: "Business Ethics", progress: 95, grade: "A+" },
    ],
    assignments: [
      {
        id: 1,
        name: "Marketing Strategy Analysis",
        dueDate: "May 26, 2025",
        status: "Pending",
      },
      {
        id: 2,
        name: "Financial Statement Review",
        dueDate: "May 23, 2025",
        status: "Submitted",
      },
    ],
    bio: "Business student with a focus on sustainable business practices and entrepreneurship. Actively involved in student business club and has participated in multiple business plan competitions.",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+250 780 777 888",
    avatar: "/svgs/avatar1.svg?height=100&width=100",
    program: "Medicine",
    year: "5th Year",
    gpa: 4.0,
    attendance: 98,
    lastActive: "Yesterday, 5:30 PM",
    courses: [
      { id: 1, name: "Clinical Medicine", progress: 95, grade: "A+" },
      { id: 2, name: "Medical Ethics", progress: 92, grade: "A" },
      { id: 3, name: "Pathology", progress: 90, grade: "A" },
    ],
    assignments: [
      {
        id: 1,
        name: "Clinical Case Study",
        dueDate: "May 29, 2025",
        status: "In Progress",
      },
      {
        id: 2,
        name: "Medical Research Paper",
        dueDate: "May 24, 2025",
        status: "Submitted",
      },
    ],
    bio: "Medical student with a special interest in pediatrics and public health. Volunteers at local clinics and has participated in medical outreach programs in rural communities.",
  },
  {
    id: 5,
    name: "Aisha Patel",
    email: "aisha.patel@example.com",
    phone: "+250 780 999 000",
    avatar: "/svgs/avatar1.svg?height=100&width=100",
    program: "Environmental Science",
    year: "3rd Year",
    gpa: 3.6,
    attendance: 90,
    lastActive: "Today, 11:45 AM",
    courses: [
      { id: 1, name: "Ecology", progress: 88, grade: "B+" },
      { id: 2, name: "Environmental Policy", progress: 92, grade: "A" },
      { id: 3, name: "Climate Science", progress: 85, grade: "B+" },
    ],
    assignments: [
      {
        id: 1,
        name: "Ecosystem Analysis Report",
        dueDate: "May 27, 2025",
        status: "Pending",
      },
      {
        id: 2,
        name: "Environmental Impact Assessment",
        dueDate: "May 22, 2025",
        status: "Submitted",
      },
    ],
    bio: "Environmental science student passionate about conservation and sustainability. Currently involved in a research project studying urban pollution patterns and their impact on local ecosystems.",
  },
];

export default function StudentPage() {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" p-4">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search students by name or program..."
          className="pl-10 bg-gray-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Student List */}
        <div className="md:col-span-1">
          <Card className="p-4">
            <h2 className="font-medium mb-4 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
              Students ({filteredStudents.length})
            </h2>
            <div className="space-y-3">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`p-3 rounded-md flex items-center justify-between cursor-pointer transition-colors ${
                    selectedStudent.id === student.id
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <img
                        src={student.avatar || "/placeholder.svg"}
                        alt={student.name}
                      />
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{student.name}</h3>
                      <p className="text-xs text-gray-500">{student.program}</p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 ${
                      selectedStudent.id === student.id
                        ? "text-blue-500"
                        : "text-gray-300"
                    }`}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Student Details */}
        <div className="md:col-span-2">
          <Card className="p-6">
            {/* Student Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <Avatar className="h-16 w-16 mr-4">
                  <img
                    src={selectedStudent.avatar || "/svgs/avatar1.svg"}
                    alt={selectedStudent.name}
                  />
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedStudent.name}</h2>
                  <p className="text-gray-500">
                    {selectedStudent.program}, {selectedStudent.year}
                  </p>
                  <div className="flex items-center mt-1">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-500 mr-2"
                    >
                      GPA: {selectedStudent.gpa}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-500"
                    >
                      {selectedStudent.attendance}% Attendance
                    </Badge>
                  </div>
                </div>
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Send Message
              </Button>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <span>{selectedStudent.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span>{selectedStudent.phone}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span>Enrolled: August 2022</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span>Last Active: {selectedStudent.lastActive}</span>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Biography</h3>
              <p className="text-gray-600 text-sm">{selectedStudent.bio}</p>
            </div>

            {/* Courses */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                Current Courses
              </h3>
              <div className="space-y-4">
                {selectedStudent.courses.map((course) => (
                  <div key={course.id} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{course.name}</h4>
                      <Badge
                        className={`${
                          course.grade.startsWith("A")
                            ? "bg-green-100 text-green-800"
                            : course.grade.startsWith("B")
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {course.grade}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">
                        Progress:
                      </span>
                      <Progress
                        value={course.progress}
                        className="h-2 flex-1"
                      />
                      <span className="text-xs font-medium ml-2">
                        {course.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments */}
            <div>
              <h3 className="font-medium mb-3">Upcoming Assignments</h3>
              <div className="space-y-3">
                {selectedStudent.assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex justify-between items-center p-3 border-b"
                  >
                    <div>
                      <h4 className="font-medium">{assignment.name}</h4>
                      <p className="text-xs text-gray-500">
                        Due: {assignment.dueDate}
                      </p>
                    </div>
                    <Badge
                      className={`${
                        assignment.status === "Submitted"
                          ? "bg-green-100 text-green-800"
                          : assignment.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {assignment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
