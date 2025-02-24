/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Search, MoreVertical, UserPlus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MentorStatistics from '@/components/dashboard/mentor/mentorStatistics'
import AdminStatistics from '@/components/dashboard/admin/adminStatistics'
import axios from 'axios'

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

const StudentItem: React.FC<StudentItemProps> = ({ student, isWaitlist = false }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 text-card-foreground rounded-lg mb-2 cursor-pointer bg-muted">
    <div className="flex items-center mb-2 sm:mb-0 ">
      <input type="checkbox" className="mr-4" />
      <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full mr-4" />
      <div>
        <div className="font-medium">{student.name}</div>
        <div className="text-sm text-muted-foreground">{student.contact}</div>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0">
      <div className="mb-2 sm:mb-0 sm:mr-4 text-primary">{student.email}</div>
      <div className="mb-2 sm:mb-0 sm:mr-4 px-3 py-1 bg-secondary text-secondary-foreground rounded-full">{student.field}</div>
      {!isWaitlist && <MoreVertical className="text-muted-foreground hidden sm:block" />}
    </div>
  </div>
)

const StudentProfile: React.FC<{
  student: {
    email: React.ReactNode
    address: React.ReactNode; avatar: string; name: string; field: string
  }
}> = ({ student }) => (
  <div className="bg-card text-card-foreground p-6 rounded-lg">
    <img src={student.avatar} alt={student.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
    <h3 className="text-xl font-bold text-center mb-2">{student.name}</h3>
    <p className="text-muted-foreground text-center mb-6">{student.field}</p>
    <Tabs defaultValue="personal">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="courses">Courses</TabsTrigger>
        <TabsTrigger value="achievements">Achievements</TabsTrigger>
      </TabsList>
      <TabsContent value="personal" className="mt-4">
        <div className="space-y-2">
          <div><span className="font-medium">Name:</span> {student.name}</div>
          <div><span className="font-medium">Email:</span> {student.email}</div>
        </div>
      </TabsContent>
      <TabsContent value="courses">Courses content</TabsContent>
      <TabsContent value="achievements">Achievements content</TabsContent>
    </Tabs>
    <div className="mt-6 space-x-2 flex flex-col sm:flex-row">
      <Button className="mb-2 sm:mb-0">Message</Button>
      <Button variant="destructive">Remove</Button>
    </div>
  </div>
)
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
  // const [students, setStudents] = useState<Student[]>([
  //   { id: 1, name: 'John Doe', contact: 'Contact', email: 'johndoe@example.com', field: 'Music & Dancing', avatar: 'https://i.pravatar.cc/150?img=1', address: 'Nyabiku, West' },
  //   { id: 2, name: 'Jane Smith', contact: 'Contact', email: 'janesmith@example.com', field: 'Software Engineering', avatar: 'https://i.pravatar.cc/150?img=2', address: 'Nyabiku, East' },
  //   { id: 3, name: 'Bob Johnson', contact: 'Contact', email: 'bobjohnson@example.com', field: 'Photography', avatar: 'https://i.pravatar.cc/150?img=3', address: 'Nyabiku, North' },
  //   { id: 4, name: 'Alice Williams', contact: 'Contact', email: 'alicewilliams@example.com', field: 'Digital Marketing', avatar: 'https://i.pravatar.cc/150?img=4', address: 'Nyabiku, South' },
  // ])
  // const [waitlist, setWaitlist] = useState<Student[]>([
  //   { id: 5, name: 'Charlie Brown', contact: 'Contact', email: 'charliebrown@example.com', field: 'Music & Dancing', avatar: 'https://i.pravatar.cc/150?img=5', address: 'Nyabiku, Central' },
  //   { id: 6, name: 'Diana Clark', contact: 'Contact', email: 'dianaclark@example.com', field: 'Web Development', avatar: 'https://i.pravatar.cc/150?img=6', address: 'Nyabiku, Downtown' },
  // ])
  const [students, setStudents] = useState<Student[]>([])
  const [waitlist, setWaitlist] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterField, setFilterField] = useState('All')
  const [selectedWaitlistStudents, setSelectedWaitlistStudents] = useState<number[]>([])

  useEffect(() => {
    if (students.length > 0 && !selectedStudent) {
      setSelectedStudent(students[0])
    }
  }, [students, selectedStudent])

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/admin/students')
      .then(response => {
        const fetchedStudents = response.data.map((student: any) => ({
          id: student.id,
          name: `${student.firstName} ${student.lastName}`,
          email: student.email,
          field: 'N/A', // Modify as needed if there's a field
          avatar: `https://i.pravatar.cc/150?u=${student.email}`,
          approved: student.approved,
        }));

        setStudents(fetchedStudents.filter(student => student.approved));
        setWaitlist(fetchedStudents.filter(student => !student.approved));
      })
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSort = (criteria: string) => {
    setSortBy(criteria)
  }

  const handleFilter = (field: string) => {
    setFilterField(field)
  }

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student)
  }

  const handleWaitlistStudentSelect = (studentId: number) => {
    setSelectedWaitlistStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

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

  const filteredStudents = students
    .filter(student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(student => filterField === 'All' || student.field === filterField)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'email') return a.email.localeCompare(b.email)
      return 0
    })

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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div className="relative w-full sm:w-auto mb-2 sm:mb-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10 w-full sm:w-auto"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Select onValueChange={handleFilter} defaultValue="All">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Fields</SelectItem>
                  <SelectItem value="Music & Dancing">Music & Dancing</SelectItem>
                  <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value=">Web Developement">Web Developement</SelectItem>
                  {/* Add more fields as needed */}
                </SelectContent>
              </Select>
              <Select onValueChange={handleSort} defaultValue="name">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="email">Sort by Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            {filteredStudents.map(student => (
              <div key={student.id} onClick={() => handleStudentSelect(student)}>
                <StudentItem student={student} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          {selectedStudent && <StudentProfile student={selectedStudent} />}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-8 mb-4">Waitlist (Pending Approvals)</h2>
        <div className="space-y-2">
          {waitlist.map(student => (
            <div key={student.id} onClick={() => handleWaitlistStudentSelect(student.id)}>
              <StudentItem
                student={student}
                isWaitlist
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}