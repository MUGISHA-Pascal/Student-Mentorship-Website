// import React, { useState, useEffect } from 'react'
// import { Search, MoreVertical } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import AdminStatistics from '@/components/dashboard/admin/adminStatistics'

// interface AdminItemProps {
//   student: {
//     field: React.ReactNode
//     email: React.ReactNode
//     contact: React.ReactNode
//     avatar: string;
//     name: string;
//   };
//   isWaitlist?: boolean;
// }

// const AdminItem: React.FC<AdminItemProps> = ({ student, isWaitlist = false }) => (
//   <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 text-card-foreground rounded-lg mb-2 cursor-pointer bg-muted">
//     <div className="flex items-center mb-2 sm:mb-0 ">
//       <input type="checkbox" className="mr-4" />
//       <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full mr-4" />
//       <div>
//         <div className="font-medium">{student.name}</div>
//         <div className="text-sm text-muted-foreground">{student.contact}</div>
//       </div>
//     </div>
//     <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0">
//       <div className="mb-2 sm:mb-0 sm:mr-4 text-primary">{student.email}</div>
//       <div className="mb-2 sm:mb-0 sm:mr-4 px-3 py-1 bg-secondary text-secondary-foreground rounded-full">{student.field}</div>
//       {!isWaitlist && <MoreVertical className="text-muted-foreground hidden sm:block" />}
//     </div>
//   </div>
// )

// const AdminProfile: React.FC<{
//   mentor: {
//     email: React.ReactNode
//     address: React.ReactNode; avatar: string; name: string; field: string
//   }
// }> = ({ mentor }) => (
//   <div className="bg-card text-card-foreground p-6 rounded-lg">
//     <img src={mentor.avatar} alt={mentor.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
//     <h3 className="text-xl font-bold text-center mb-2">{mentor.name}</h3>
//     <p className="text-muted-foreground text-center mb-6">{mentor.field}</p>
//     <Tabs defaultValue="personal">
//       <TabsList className="grid w-full grid-cols-3">
//         <TabsTrigger value="personal">Personal</TabsTrigger>
//         <TabsTrigger value="courses">Courses</TabsTrigger>
//         <TabsTrigger value="achievements">Achievements</TabsTrigger>
//       </TabsList>
//       <TabsContent value="personal" className="mt-4">
//         <div className="space-y-2">
//           <div><span className="font-medium">Name:</span> {mentor.name}</div>
//           <div><span className="font-medium">Email:</span> {mentor.email}</div>
//           <div><span className="font-medium">Address:</span> {mentor.address}</div>
//           <div><span className="font-medium">Field:</span> {mentor.field}</div>
//         </div>
//       </TabsContent>
//       <TabsContent value="courses">Courses content</TabsContent>
//       <TabsContent value="achievements">Achievements content</TabsContent>
//     </Tabs>
//     <div className="mt-6 space-x-2 flex flex-col sm:flex-row">
//       <Button className="mb-2 sm:mb-0">Message</Button>
//     </div>
//   </div>
// )
// interface Student {
//   id: number;
//   name: string;
//   contact: string;
//   email: string;
//   field: string;
//   avatar: string;
//   address: string;
// }

// export default function AdminMentorsPage() {
//   const [students, setStudents] = useState<Student[]>([
//     { id: 1, name: 'John Doe', contact: 'Contact', email: 'johndoe@example.com', field: 'Music & Dancing', avatar: 'https://i.pravatar.cc/150?img=1', address: 'Nyabiku, West' },
//     { id: 2, name: 'Jane Smith', contact: 'Contact', email: 'janesmith@example.com', field: 'Software Engineering', avatar: 'https://i.pravatar.cc/150?img=2', address: 'Nyabiku, East' },
//     { id: 3, name: 'Bob Johnson', contact: 'Contact', email: 'bobjohnson@example.com', field: 'Photography', avatar: 'https://i.pravatar.cc/150?img=3', address: 'Nyabiku, North' },
//     { id: 4, name: 'Alice Williams', contact: 'Contact', email: 'alicewilliams@example.com', field: 'Digital Marketing', avatar: 'https://i.pravatar.cc/150?img=4', address: 'Nyabiku, South' },
//   ])
//   const [waitlist, setWaitlist] = useState<Student[]>([
//     { id: 5, name: 'Charlie Brown', contact: 'Contact', email: 'charliebrown@example.com', field: 'Music & Dancing', avatar: 'https://i.pravatar.cc/150?img=5', address: 'Nyabiku, Central' },
//     { id: 6, name: 'Diana Clark', contact: 'Contact', email: 'dianaclark@example.com', field: 'Web Development', avatar: 'https://i.pravatar.cc/150?img=6', address: 'Nyabiku, Downtown' },
//   ])
//   const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('name')
//   const [filterField, setFilterField] = useState('All')
//   const [selectedWaitlistStudents, setSelectedWaitlistStudents] = useState<number[]>([])


//   useEffect(() => {
//     if (students.length > 0 && !selectedStudent) {
//       setSelectedStudent(students[0])
//     }
//   }, [students, selectedStudent])

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

//   const handleWaitlistStudentSelect = (studentId: number) => {
//     setSelectedWaitlistStudents(prev =>
//       prev.includes(studentId)
//         ? prev.filter(id => id !== studentId)
//         : [...prev, studentId]
//     )
//   }

//   const handleApproveWaitlist = () => {
//     const approvedStudents = waitlist.filter(student => selectedWaitlistStudents.includes(student.id))
//     setStudents(prev => [...prev, ...approvedStudents])
//     setWaitlist(prev => prev.filter(student => !selectedWaitlistStudents.includes(student.id)))
//     setSelectedWaitlistStudents([])
//   }

//   const handleRemoveWaitlist = () => {
//     setWaitlist(prev => prev.filter(student => !selectedWaitlistStudents.includes(student.id)))
//     setSelectedWaitlistStudents([])
//   }

//   const filteredStudents = students
//     .filter(student =>
//       student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       student.email.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .filter(student => filterField === 'All' || student.field === filterField)
//     .sort((a, b) => {
//       if (sortBy === 'name') return a.name.localeCompare(b.name)
//       if (sortBy === 'email') return a.email.localeCompare(b.email)
//       return 0
//     })

//   return (
//     <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
//       <div className="mb-7">
//         <AdminStatistics />
//       </div>
//       <div className="flex flex-col lg:flex-row">
//         <div className="w-full lg:w-2/3 lg:pr-6 mb-6 lg:mb-0">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//             <h2 className="text-xl font-semibold mb-2 sm:mb-0">Mentors List</h2>
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
//                 <AdminItem student={student} />
//               </div>
//             ))}
//           </div>

//         </div>
//         <div className="w-full lg:w-1/3">
//           {selectedStudent && <AdminProfile mentor={selectedStudent} />}
//         </div>
//       </div>
//       <div>
//         <h2 className="text-xl font-semibold mt-8 mb-4">Waitlist (Pending Approvals)</h2>
//         <div className="space-y-2">
//           {waitlist.map(student => (
//             <div key={student.id} onClick={() => handleWaitlistStudentSelect(student.id)}>
//               <AdminItem
//                 student={student}
//                 isWaitlist
//               />
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-end space-x-2">
//           <Button onClick={handleApproveWaitlist} disabled={selectedWaitlistStudents.length === 0}>Approve</Button>
//           <Button variant="destructive" onClick={handleRemoveWaitlist} disabled={selectedWaitlistStudents.length === 0}>Reject</Button>
//         </div>
//       </div>
//     </div>
//   )
// }
// import React, { useState, useEffect } from 'react'
// import { Search, MoreVertical } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import AdminStatistics from '@/components/dashboard/admin/adminStatistics'

// interface Mentor {
//   id: string;
//   userId: string;
//   bio: string;
//   image: string | null;
//   createdAt: string;
//   updatedAt: string;
//   user: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     approved: boolean;
//   };
//   career: {
//     id: string;
//     title: string;
//     description: string;
//   }[];
// }

// const AdminItem: React.FC<{ mentor: Mentor; isWaitlist?: boolean; onSelect: () => void }> = ({ mentor, isWaitlist = false, onSelect }) => (
//   <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 text-card-foreground rounded-lg mb-2 cursor-pointer bg-muted" onClick={onSelect}>
//     <div className="flex items-center mb-2 sm:mb-0">
//       <input type="checkbox" className="mr-4" />
//       <img src="/images/avatar.png" alt={mentor.user.firstName} className="w-10 h-10 rounded-full mr-4" />
//       <div>
//         <div className="font-medium">{mentor.user.firstName} {mentor.user.lastName}</div>
//         <div className="text-sm text-muted-foreground">{mentor.user.email}</div>
//       </div>
//     </div>
//     <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0">
//       <div className="mb-2 sm:mb-0 sm:mr-4 px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
//         {mentor.career.map(c => c.title).join(', ')}
//       </div>
//       {!isWaitlist && <MoreVertical className="text-muted-foreground hidden sm:block" />}
//     </div>
//   </div>
// )

// const AdminProfile: React.FC<{ mentor: Mentor }> = ({ mentor }) => (
//   <div className="bg-card text-card-foreground p-6 rounded-lg">
//     <img src="/images/avatar.png" alt={mentor.user.firstName} className="w-24 h-24 rounded-full mx-auto mb-4" />
//     <h3 className="text-xl font-bold text-center mb-2">{mentor.user.firstName} {mentor.user.lastName}</h3>
//     <p className="text-muted-foreground text-center mb-6">{mentor.career.map(c => c.title).join(', ')}</p>
//     <Tabs defaultValue="personal">
//       <TabsList className="grid w-full grid-cols-3">
//         <TabsTrigger value="personal">Personal</TabsTrigger>
//         <TabsTrigger value="courses">Courses</TabsTrigger>
//         <TabsTrigger value="achievements">Achievements</TabsTrigger>
//       </TabsList>
//       <TabsContent value="personal" className="mt-4">
//         <div className="space-y-2">
//           <div><span className="font-medium">Name:</span> {mentor.user.firstName} {mentor.user.lastName}</div>
//           <div><span className="font-medium">Email:</span> {mentor.user.email}</div>
//           <div><span className="font-medium">Field:</span> {mentor.career.map(c => c.title).join(', ')}</div>
//         </div>
//       </TabsContent>
//       <TabsContent value="courses">Courses content</TabsContent>
//       <TabsContent value="achievements">Achievements content</TabsContent>
//     </Tabs>
//   </div>
// )

// export default function AdminMentorsPage() {
//   const [mentors, setMentors] = useState<Mentor[]>([])
//   const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('name')
//   const [filterField, setFilterField] = useState('All')
//   const [waitlist, setWaitlist] = useState<Mentor[]>([])

//   useEffect(() => {
//     fetch('http://localhost:3000/api/v1/admin/mentors')
//       .then(res => res.json())
//       .then(data => {
//         const approved = data.filter((mentor: Mentor) => mentor.user.approved)
//         const pending = data.filter((mentor: Mentor) => !mentor.user.approved)
//         setMentors(approved)
//         setWaitlist(pending)
//         if (approved.length > 0) setSelectedMentor(approved[0])
//       })
//   }, [])

//   const handleApproval = async (mentorId: string, approve: boolean) => {
//     await fetch(`http://localhost:3000/api/v1/admin/mentor/${mentorId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ approve })
//     })

//     setMentors(prev => (approve ? [...prev, waitlist.find(m => m.id === mentorId)!] : prev))
//     setWaitlist(prev => prev.filter(m => m.id !== mentorId))
//   }

//   const filteredMentors = mentors
//     .filter(m =>
//       m.user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       m.user.email.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .filter(m => filterField === 'All' || m.career.some(c => c.title === filterField))
//     .sort((a, b) => {
//       if (sortBy === 'name') return a.user.firstName.localeCompare(b.user.firstName)
//       if (sortBy === 'email') return a.user.email.localeCompare(b.user.email)
//       return 0
//     })

//   return (
//     <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
//       <AdminStatistics />
//       <div className="flex flex-col lg:flex-row">
//         <div className="w-full lg:w-2/3 lg:pr-6">
//           <h2 className="text-xl font-semibold mb-4">Mentors List</h2>
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
//             <div className="relative w-full sm:w-auto">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//               <Input className="pl-10 w-full sm:w-auto" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
//             </div>
//             <div className="flex items-center space-x-2 w-full sm:w-auto">
//               <Select onValueChange={setFilterField} defaultValue="All">
//                 <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by field" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="All">All Fields</SelectItem>
//                   {mentors.flatMap(m => m.career).map(c => c.title).map((title, i, arr) => arr.indexOf(title) === i ? <SelectItem key={title} value={title}>{title}</SelectItem> : null)}
//                 </SelectContent>
//               </Select>
//               <Select onValueChange={setSortBy} defaultValue="name">
//                 <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="name">Sort by Name</SelectItem>
//                   <SelectItem value="email">Sort by Email</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <div className="space-y-2">{filteredMentors.map(m => <AdminItem key={m.id} mentor={m} onSelect={() => setSelectedMentor(m)} />)}</div>
//         </div>
//         <div className="w-full lg:w-1/3">{selectedMentor && <AdminProfile mentor={selectedMentor} />}</div>
//       </div>
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react';
import { Search, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminStatistics from '@/components/dashboard/admin/adminStatistics';

interface Mentor {
  id: string;
  userId: string;
  bio: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    approved: boolean;
  };
  career: {
    id: string;
    title: string;
    description: string;
  }[];
}

const AdminItem: React.FC<{ mentor: Mentor; isWaitlist?: boolean; onSelect: () => void }> = ({ mentor, isWaitlist = false, onSelect }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 text-card-foreground rounded-lg mb-2 cursor-pointer bg-muted" onClick={onSelect}>
    <div className="flex items-center mb-2 sm:mb-0">
      <input type="checkbox" className="mr-4" />
      <img src="/images/avatar.png" alt={mentor.user.firstName} className="w-10 h-10 rounded-full mr-4" />
      <div>
        <div className="font-medium">{mentor.user.firstName} {mentor.user.lastName}</div>
        <div className="text-sm text-muted-foreground">{mentor.user.email}</div>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0">
      <div className="mb-2 sm:mb-0 sm:mr-4 px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
        {mentor.career.map(c => c.title).join(', ')}
      </div>
      {!isWaitlist && <MoreVertical className="text-muted-foreground hidden sm:block" />}
    </div>
  </div>
);

const AdminProfile: React.FC<{ mentor: Mentor }> = ({ mentor }) => (
  <div className="bg-card text-card-foreground p-6 rounded-lg">
    <img src="/images/avatar.png" alt={mentor.user.firstName} className="w-24 h-24 rounded-full mx-auto mb-4" />
    <h3 className="text-xl font-bold text-center mb-2">{mentor.user.firstName} {mentor.user.lastName}</h3>
    <p className="text-muted-foreground text-center mb-6">{mentor.career.map(c => c.title).join(', ')}</p>
    <Tabs defaultValue="personal">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="courses">Courses</TabsTrigger>
        <TabsTrigger value="achievements">Achievements</TabsTrigger>
      </TabsList>
      <TabsContent value="personal" className="mt-4">
        <div className="space-y-2">
          <div><span className="font-medium">Name:</span> {mentor.user.firstName} {mentor.user.lastName}</div>
          <div><span className="font-medium">Email:</span> {mentor.user.email}</div>
          <div><span className="font-medium">Field:</span> {mentor.career.map(c => c.title).join(', ')}</div>
        </div>
      </TabsContent>
      <TabsContent value="courses">Courses content</TabsContent>
      <TabsContent value="achievements">Achievements content</TabsContent>
    </Tabs>
  </div>
);

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [waitlist, setWaitlist] = useState<Mentor[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedWaitlistMentors, setSelectedWaitlistMentors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterField, setFilterField] = useState('All')

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/admin/mentors')
      .then(res => res.json())
      .then(data => {
        const approved = data.filter((mentor: Mentor) => mentor.user.approved);
        const pending = data.filter((mentor: Mentor) => !mentor.user.approved);
        setMentors(approved);
        setWaitlist(pending);
        if (approved.length > 0) setSelectedMentor(approved[0]);
      });
  }, []);

  const handleApproval = async (mentorId: string, approve: boolean) => {
    await fetch(`http://localhost:3000/api/v1/admin/mentor/${mentorId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approve })
    });

    if (approve) {
      const approvedMentor = waitlist.find(m => m.id === mentorId);
      if (approvedMentor) {
        setMentors(prev => [...prev, approvedMentor]);
        setWaitlist(prev => prev.filter(m => m.id !== mentorId));
      }
    } else {
      setWaitlist(prev => prev.filter(m => m.id !== mentorId));
    }

    setSelectedWaitlistMentors([]);
  };

  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
      <AdminStatistics />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 lg:pr-6">
          <h2 className="text-xl font-semibold mb-4">Mentors List</h2>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-10 w-full sm:w-auto" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Select onValueChange={setFilterField} defaultValue="All">
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by field" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Fields</SelectItem>
                  {mentors.flatMap(m => m.career).map(c => c.title).map((title, i, arr) => arr.indexOf(title) === i ? <SelectItem key={title} value={title}>{title}</SelectItem> : null)}
                </SelectContent>
              </Select>
              <Select onValueChange={setSortBy} defaultValue="name">
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="email">Sort by Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">{mentors.map(m => <AdminItem key={m.id} mentor={m} onSelect={() => setSelectedMentor(m)} />)}</div>
        </div>
        <div className="w-full lg:w-1/3">{selectedMentor && <AdminProfile mentor={selectedMentor} />}</div>
      </div>

      {/* Waitlist Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Waitlist</h2>
        {waitlist.length === 0 ? (
          <p className="text-muted-foreground">No mentors in the waitlist.</p>
        ) : (
          <div className="space-y-2">
            {waitlist.map(m => (
              <div key={m.id} className="flex items-center justify-between bg-muted p-4 rounded-lg">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-4"
                    checked={selectedWaitlistMentors.includes(m.id)}
                    onChange={() => setSelectedWaitlistMentors(prev =>
                      prev.includes(m.id) ? prev.filter(id => id !== m.id) : [...prev, m.id]
                    )}
                  />
                  <img src="/images/avatar.png" alt={m.user.firstName} className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <div className="font-medium">{m.user.firstName} {m.user.lastName}</div>
                    <div className="text-sm text-muted-foreground">{m.user.email}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => handleApproval(m.id, true)}>Approve</Button>
                  <Button variant="destructive" onClick={() => handleApproval(m.id, false)}>Reject</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
