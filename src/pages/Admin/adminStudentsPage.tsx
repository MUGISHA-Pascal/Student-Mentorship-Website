/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Search, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminStatistics from '@/components/dashboard/admin/adminStatistics'
import axios from 'axios'
import { useApprovedStudents, usePendingStudents } from '@/hooks/admin/useStudents'

interface StudentItemProps {
  student: {
    field: React.ReactNode
    email: React.ReactNode
    contact: React.ReactNode
    avatar: string;
    name: string;
  };
  isWaitlist?: boolean;
}

// const StudentItem: React.FC<StudentItemProps> = ({ student, isWaitlist = false }) => (
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
const StudentItem: React.FC<{ student: any; onSelect: () => void; isSelected: boolean }> = ({ student, onSelect, isSelected }) => (
  <div
    className={
      `flex flex-col sm:flex-row sm:items-center justify-between p-4 text-card-foreground rounded-lg mb-2 cursor-pointer ${isSelected ? 'bg-gray-300' : 'bg-muted'}`
    }
    onClick={onSelect}
  >
    <div className="flex items-center mb-2 sm:mb-0">
      <input type="checkbox" className="mr-4" />
      <img src="/images/avatar.png" alt={student.user.firstName} className="w-10 h-10 rounded-full mr-4" />
      <div>
        <div className="font-medium">{student.user.firstName} {student.user.lastName}</div>
        <div className="text-sm text-muted-foreground">{student.user.email}</div>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0">
      <div className={`mb-2 sm:mb-0 sm:mr-4 px-3 py-1 text-secondary-foreground rounded-full ${isSelected ? 'bg-gray-300' : ''}`}>
        {/* {student.career.map((c: any) => c.title).join(', ')} */}
        Career
      </div>
      <MoreVertical className="text-muted-foreground hidden sm:block" />
    </div>
  </div>
);

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

const StudentProfile: React.FC<{ student: any; isRemoving: boolean; removeStudent: (id: string) => void }> = ({ student, isRemoving, removeStudent }) => (
  <div className="bg-card text-card-foreground p-6 rounded-lg">
    <img src="/images/avatar.png" alt={student.user.firstName} className="w-24 h-24 rounded-full mx-auto mb-4" />
    <h3 className="text-xl font-bold text-center mb-2">{student.user.firstName} {student.user.lastName}</h3>
    <p className="text-muted-foreground text-center mb-6">
      {student.career?.map((c: any) => c.title).join(', ') ?? 'No career specified'}
    </p>
    <Tabs defaultValue="personal">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="bio">Bio</TabsTrigger>
        <TabsTrigger value="level">Level</TabsTrigger>
      </TabsList>
      <TabsContent value="personal" className="mt-4">
        <div className="space-y-2">
          <div><span className="font-semibold">Email:</span> {student.user.email}</div>
          <div className="flex justify-between">
            <div><span className="font-semibold">DOB:</span> {student.user.dob} </div>
            <div><span className="font-semibold">Gender:</span> {student.user.gender}</div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="bio">{student.bio}</TabsContent>
      <TabsContent value="level">
        {student.educationLevel}
      </TabsContent>
    </Tabs>
    <div className="mt-3 space-x-2 flex flex-col sm:flex-row">
      <Button
        variant="destructive"
        onClick={() => removeStudent(student.user.id)}
        disabled={isRemoving}
      >
        {isRemoving ? "Removing..." : "Remove"}
      </Button>
    </div>
  </div>
);
interface Student {
  id: number;
  name: string;
  contact: string;
  email: string;
  field: string;
  avatar: string;
  address: string;
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [waitlist, setWaitlist] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterField, setFilterField] = useState('All')
  const [selectedWaitlistStudents, setSelectedWaitlistStudents] = useState<number[]>([])

  const [approvedSearchQuery, setApprovedSearchQuery] = useState('');
  const [waitlistSearchQuery, setWaitlistSearchQuery] = useState('');
  const [approvedFilter, setApprovedFilter] = useState('All');
  const [waitlistFilter, setWaitlistFilter] = useState('All');
  const [approvedSortBy, setApprovedSortBy] = useState('name');
  const [waitlistSortBy, setWaitlistSortBy] = useState('name');
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);


  const { approvedStudents, setApprovedStudents, approvedLoading, approvedError, approvedPage, setApprovedPage, totalApprovedPages } = useApprovedStudents()
  const { pendingStudents, setPendingStudents, pendingLoading, pendingError, pendingPage, setPendingPage, totalPendingPages } = usePendingStudents()

  // const updateStudentLists = (studentId: string) => {
  //   setPendingStudents((prev) => prev.filter(s => s.user.id !== studentId));
  //   const studentToMove = pendingStudents.find(s => s.user.id === studentId);
  //   if (studentToMove) {
  //     setApprovedStudents((prev) => [...prev, studentToMove]);
  //   }
  // };

  // const handleRemoveStudent = async (studentId: string) => {
  //   await remove(studentId, (updatedId) => {
  //     setApprovedStudents(prev => prev.filter(s => s.user.id !== updatedId));
  //     const studentToReAdd = ApprovedStudents.find(s => s.user.id === updatedId);
  //     if (studentToReAdd) {
  //       setPendingStudents(prev => [...prev, studentToReAdd]);
  //     }
  //   });
  //   setSelectedStudent(null);
  // };

  const filteredAndSortedApprovedStudents = approvedStudents
    .filter(s => {
      const nameMatch = `${s.user.firstName} ${s.user.lastName}`.toLowerCase().includes(approvedSearchQuery.toLowerCase());
      const emailMatch = s.user.email.toLowerCase().includes(approvedSearchQuery.toLowerCase());
      return (nameMatch || emailMatch);
    })
    .sort((a, b) => {
      if (approvedSortBy === 'name') return a.user.firstName.localeCompare(b.user.firstName);
      if (approvedSortBy === 'email') return a.user.email.localeCompare(b.user.email);
      return 0;
    });

  const filteredAndSortedWaitlistStudents = pendingStudents
    .filter(m => {
      const nameMatch = `${m.user.firstName} ${m.user.lastName}`.toLowerCase().includes(waitlistSearchQuery.toLowerCase());
      const emailMatch = m.user.email.toLowerCase().includes(waitlistSearchQuery.toLowerCase());
      return (nameMatch || emailMatch);
    })
    .sort((a, b) => {
      if (waitlistSortBy === 'name') return a.user.firstName.localeCompare(b.user.firstName);
      if (waitlistSortBy === 'email') return a.user.email.localeCompare(b.user.email);
      return 0;
    });

  const handleApprovedPageChange = async (newPage: number) => {
    if (newPage > 0 && newPage <= totalApprovedPages) {
      // console.log(`Changing to page ${newPage}`);
      setIsLoadingNextPage(true);
      setApprovedPage(newPage);
      setIsLoadingNextPage(false);
    }
  };

  const handleWaitlistPageChange = async (newPage: number) => {
    if (newPage > 0 && newPage <= totalPendingPages) {
      // console.log(`Changing to page ${newPage}`);
      setIsLoadingNextPage(true);
      setPendingPage(newPage);
      setPendingStudents(pendingStudents)
      setIsLoadingNextPage(false);
      console.log(`Approved page after changing to page ${newPage}`, pendingStudents);
    }
  };

  // useEffect(() => {
  //   if (students.length > 0 && !selectedStudent) {
  //     setSelectedStudent(students[0])
  //   }
  // }, [students, selectedStudent])

  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/v1/admin/students')
  //     .then(response => {
  //       const fetchedStudents = response.data.map((student: any) => ({
  //         id: student.id,
  //         name: `${student.firstName} ${student.lastName}`,
  //         email: student.email,
  //         field: 'N/A', // Modify as needed if there's a field
  //         avatar: `https://i.pravatar.cc/150?u=${student.email}`,
  //         approved: student.approved,
  //       }));

  //       setStudents(fetchedStudents.filter(student => student.approved));
  //       setWaitlist(fetchedStudents.filter(student => !student.approved));
  //     })
  //     .catch(error => console.error('Error fetching students:', error));
  // }, []);

  // const handleSearch = (query: string) => {
  //   setSearchQuery(query)
  // }

  // const handleSort = (criteria: string) => {
  //   setSortBy(criteria)
  // }

  // const handleFilter = (field: string) => {
  //   setFilterField(field)
  // }

  // const handleStudentSelect = (student: Student) => {
  //   setSelectedStudent(student)
  // }

  // const handleWaitlistStudentSelect = (studentId: number) => {
  //   setSelectedWaitlistStudents(prev =>
  //     prev.includes(studentId)
  //       ? prev.filter(id => id !== studentId)
  //       : [...prev, studentId]
  //   )
  // }

  const handleApproveWaitlist = () => {
    const approvedStudents = waitlist.filter(student => selectedWaitlistStudents.includes(student.id))
    setStudents(prev => [...prev, ...approvedStudents])
    setWaitlist(prev => prev.filter(student => !selectedWaitlistStudents.includes(student.id)))
    setSelectedWaitlistStudents([])
  }

  const handleRemoveWaitlist = () => {
    setWaitlist(prev => prev.filter(student => !selectedWaitlistStudents.includes(student.id)))
    setSelectedWaitlistStudents([])
  }

  // const filteredStudents = students
  //   .filter(student =>
  //     student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     student.email.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  //   .filter(student => filterField === 'All' || student.field === filterField)
  //   .sort((a, b) => {
  //     if (sortBy === 'name') return a.name.localeCompare(b.name)
  //     if (sortBy === 'email') return a.email.localeCompare(b.email)
  //     return 0
  //   })

  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
      <div className="mb-7">
        <AdminStatistics />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 lg:pr-6 mb-6 lg:mb-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-xl font-semibold mb-2 sm:mb-0">Students List</h2>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-10 w-full sm:w-auto" placeholder="Search" value={approvedSearchQuery} onChange={e => setApprovedSearchQuery(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto xl:mt-0 lg:mt-0 md:mt-0 mt-2">
              <Select onValueChange={setApprovedFilter} defaultValue="All">
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by career" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Careers</SelectItem>
                  {/* {approvedStudents
                      .filter(s => s && s.educationLevel)
                      .flatMap(s => s.educationLevel?.map(c => c.title) ?? [])
                      .filter((title, i, arr) => arr.indexOf(title) === i)
                      .map(title => <SelectItem key={title} value={title}>{title}</SelectItem>)
                    } */}
                </SelectContent>
              </Select>
              <Select onValueChange={setApprovedSortBy} defaultValue="name">
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="email">Sort by Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* <div className="space-y-2">
            {filteredStudents.map(student => (
              <div key={student.id} onClick={() => handleStudentSelect(student)}>
                <StudentItem student={student} />
              </div>
            ))}
          </div> */}
          <div className="space-y-2">
            {filteredAndSortedApprovedStudents.length > 0 ? (
              filteredAndSortedApprovedStudents.map(s => (
                <StudentItem
                  key={s.id}
                  student={s}
                  onSelect={() => setSelectedStudent(s)}
                  isSelected={selectedStudent?.id === s.id}
                />
              ))
            ) : (
              <div className="h-20 text-muted-foreground flex items-center justify-center">No such approved mentors found.</div>
            )}
          </div>
          <div className="space-y-2">
            {filteredAndSortedApprovedStudents.length > 0 ? (
              filteredAndSortedApprovedStudents.map(s => (
                <StudentItem
                  key={s.id}
                  student={s}
                  onSelect={() => setSelectedStudent(s)}
                  isSelected={selectedStudent?.id === s.id}
                />
              ))
            ) : (
              <div className="h-20 text-muted-foreground flex items-center justify-center">No such approved mentors found.</div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          {selectedStudent && <StudentProfile student={selectedStudent} isRemoving={removingStudentId === selectedStudent?.user.id} removeStudent={handleRemoveStudent} />}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={() => handleApprovedPageChange(approvedPage - 1)}
          disabled={approvedPage === 1 || isLoadingNextPage}
        >
          Previous
        </Button>
        <span>Page {approvedPage} of {totalApprovedPages}</span>
        <Button
          variant="outline"
          onClick={() => handleApprovedPageChange(approvedPage + 1)}
          disabled={approvedPage >= totalApprovedPages || isLoadingNextPage}
        >
          Next
        </Button>
      </div>
      <div className='mt-8'>
        {/* <h2 className="text-xl font-semibold mt-8 mb-4">Waitlist (Pending Approvals)</h2>
        <div className="space-y-2">
          {waitlist.map(student => (
            <div key={student.id} onClick={() => handleWaitlistStudentSelect(student.id)}>
              <StudentItem
                student={student}
                isWaitlist
              />
            </div>
          ))}
        </div> */}
        <h2 className="text-xl font-semibold mb-4">Waitlist</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10 w-full sm:w-auto" placeholder="Search" value={waitlistSearchQuery} onChange={e => setWaitlistSearchQuery(e.target.value)} />
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto xl:mt-0 lg:mt-0 md:mt-0 mt-2">
            <Select onValueChange={setWaitlistFilter} defaultValue="All">
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by career" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Careers</SelectItem>
                {[...new Set([...approvedMentors, ...pendingMentors].flatMap(m => m.career?.map(c => c.title) ?? []))]
                  .map(title => <SelectItem key={title} value={title}>{title}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select onValueChange={setWaitlistSortBy} defaultValue="name">
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="email">Sort by Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {pendingStudents.length === 0 ? (
          <p className="text-muted-foreground">No mentors in the waitlist.</p>
        ) : (
          <div className="space-y-2">
            {filteredAndSortedWaitlistStudents.length > 0 ? (
              filteredAndSortedWaitlistStudents.map(s => (
                <div key={s.id} className="flex items-center justify-between bg-muted p-4 rounded-lg">
                  <div className="flex items-center">
                    {/* <input
                              type="checkbox"
                              className="mr-4"
                              checked={selectedWaitlistMentors.includes(m.id)}
                              onChange={() => setSelectedWaitlistMentors(prev =>
                                prev.includes(m.id) ? prev.filter(id => id !== m.id) : [...prev, m.id]
                              )}
                            /> */}
                    <img src="/images/avatar.png" alt={s.user.firstName} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                      <div className="font-medium">{s.user.firstName} {s.user.lastName}</div>
                      <div className="text-sm text-muted-foreground">{s.user.email}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => approve(s.user.id, updateStudentLists)}
                      disabled={approvingStudentId === s.user.id}
                    >
                      {approvingStudentId === s.user.id ? "Approving..." : "Approve"}
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => reject(s.user.id, updateMentorLists)}
                      disabled={rejectingStudentId === s.user.id}
                    >
                      {rejectingStudentId === s.user.id ? "Rejecting..." : "Reject"}
                    </Button>
                  </div>
                </div>
              ))) : (
              <div className="text-muted-foreground text-center flex justify-center items-center h-28">No such waitlisted mentors found.</div>
            )}

            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                onClick={() => handleWaitlistPageChange(pendingPage - 1)}
                disabled={pendingPage === 1 || isLoadingNextPage}
              >
                Previous
              </Button>
              <span>Page {pendingPage} of {totalPendingPages}</span>
              <Button
                variant="outline"
                onClick={() => handleWaitlistPageChange(pendingPage + 1)}
                disabled={pendingPage >= totalPendingPages || isLoadingNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}