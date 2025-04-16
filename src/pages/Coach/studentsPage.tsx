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
//     fetch(`http://localhost:3000/api/v1/coach/students/988784a2-7b03-473e-b221-1ee62a34da18`)
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
//         `http://localhost:3000/api/v1/coach/988784a2-7b03-473e-b221-1ee62a34da18/student/status`,
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

const StudentsPage = () => {
  return (
    <div>StudentsPage</div>
  )
}

export default StudentsPage