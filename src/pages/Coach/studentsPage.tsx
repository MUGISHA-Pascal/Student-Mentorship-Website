import React, { useState, useEffect } from 'react'
import { Search, MoreVertical, MessageSquare, UserPlus, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  subtitle: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, subtitle }) => (
  <Card className="bg-card text-card-foreground">
    <CardContent className="flex items-center p-4">
      <div className="mr-4 p-3 bg-primary/10 rounded-full">{icon}</div>
      <div>
        <div className="text-xl sm:text-2xl font-bold">{value}</div>
        <div className="text-sm font-medium text-muted-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
    </CardContent>
  </Card>
)

interface StudentItemProps {
  student: {
    id: number;
    field: React.ReactNode
    email: React.ReactNode
    contact: React.ReactNode
    avatar: string;
    name: string;
  };
  isWaitlist?: boolean;
  onRemove: (id: number) => void;
}

const StudentItem: React.FC<StudentItemProps> = ({ student, isWaitlist = false, onRemove }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card text-card-foreground rounded-lg mb-2">
    <div className="flex items-center mb-2 sm:mb-0">
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
      {!isWaitlist && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onRemove(student.id)}>
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  </div>
)

const StudentProfile: React.FC<{ student: {
  email: React.ReactNode
  address: React.ReactNode; avatar: string; name: string; field: string 
} }> = ({ student }) => (
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
          <div><span className="font-medium">Address:</span> {student.address}</div>
          <div><span className="font-medium">Field:</span> {student.field}</div>
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

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'John Doe', contact: 'Contact', email: 'johndoe@example.com', field: 'Music & Dancing', avatar: 'https://i.pravatar.cc/150?img=1', address: 'Nyabiku, West' },
    { id: 2, name: 'Jane Smith', contact: 'Contact', email: 'janesmith@example.com', field: 'Software Engineering', avatar: 'https://i.pravatar.cc/150?img=2', address: 'Nyabiku, East' },
    { id: 3, name: 'Bob Johnson', contact: 'Contact', email: 'bobjohnson@example.com', field: 'Photography', avatar: 'https://i.pravatar.cc/150?img=3', address: 'Nyabiku, North' },
    { id: 4, name: 'Alice Williams', contact: 'Contact', email: 'alicewilliams@example.com', field: 'Digital Marketing', avatar: 'https://i.pravatar.cc/150?img=4', address: 'Nyabiku, South' },
  ])
  const [waitlist, setWaitlist] = useState<Student[]>([
    { id: 5, name: 'Charlie Brown', contact: 'Contact', email: 'charliebrown@example.com', field: 'Music & Dancing', avatar: 'https://i.pravatar.cc/150?img=5', address: 'Nyabiku, Central' },
    { id: 6, name: 'Diana Clark', contact: 'Contact', email: 'dianaclark@example.com', field: 'Web Development', avatar: 'https://i.pravatar.cc/150?img=6', address: 'Nyabiku, Downtown' },
  ])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterField, setFilterField] = useState('All')
  const [selectedWaitlistStudents, setSelectedWaitlistStudents] = useState<number[]>([])
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id' | 'avatar'>>({
    name: '',
    contact: '',
    email: '',
    field: '',
    address: ''
  })
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false)

  useEffect(() => {
    if (students.length > 0 && !selectedStudent) {
      setSelectedStudent(students[0])
    }
  }, [students, selectedStudent])

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
    toast.success(`Approved ${approvedStudents.length} student(s) from the waitlist.`)
  }

  const handleRemoveWaitlist = () => {
    const removedCount = selectedWaitlistStudents.length
    setWaitlist(prev => prev.filter(student => !selectedWaitlistStudents.includes(student.id)))
    setSelectedWaitlistStudents([])
    toast.info(`Removed ${removedCount} student(s) from the waitlist.`)
  }

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...students.map(s => s.id), 0) + 1
    const newStudentWithId: Student = {
      ...newStudent,
      id: newId,
      avatar: `https://i.pravatar.cc/150?img=${newId}` // Generate a random avatar
    }
    setStudents(prev => [...prev, newStudentWithId])
    setNewStudent({ name: '', contact: '', email: '', field: '', address: '' })
    setIsAddStudentDialogOpen(false)
    toast.success(`${newStudentWithId.name} has been added to the student list.`)
  }

  const handleRemoveStudent = (id: number) => {
    const studentToRemove = students.find(student => student.id === id)
    if (studentToRemove) {
      setStudents(prev => prev.filter(student => student.id !== id))
      toast.success(`${studentToRemove.name} has been removed from the student list.`)
      if (selectedStudent && selectedStudent.id === id) {
        setSelectedStudent(null)
      }
    }
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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<MessageSquare className="h-6 w-6 text-primary" />} value={students.length.toString()} label="Students" subtitle="Total" />
        <StatCard icon={<UserPlus className="h-6 w-6 text-green-500" />} value={waitlist.length.toString()} label="Waitlist" subtitle="Pending" />
        <StatCard icon={<Check className="h-6 w-6 text-red-500" />} value="3" label="Students" subtitle="Coached" />
        <StatCard icon={<X className="h-6 w-6 text-orange-500" />} value="12" label="Courses" subtitle="Provided" />
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 lg:pr-6 mb-6 lg:mb-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-xl font-semibold mb-2 sm:mb-0">Students List</h2>
            <Dialog open={isAddStudentDialogOpen} onOpenChange={setIsAddStudentDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" /> Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddStudent}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={newStudent.email}
                        onChange={(e) =>   setNewStudent({ ...newStudent, email: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact" className="text-right">
                        Contact
                      </Label>
                      <Input
                        id="contact"
                        value={newStudent.contact}
                        onChange={(e) => setNewStudent({ ...newStudent, contact: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="field" className="text-right">
                        Field
                      </Label>
                      <Select
                        onValueChange={(value) => setNewStudent({ ...newStudent, field: value })}
                        value={newStudent.field}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Music & Dancing">Music & Dancing</SelectItem>
                          <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                          <SelectItem value="Photography">Photography</SelectItem>
                          <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                          <SelectItem value="Web Development">Web Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="address" className="text-right">
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={newStudent.address}
                        onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Student</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
                  <SelectItem value="Web Development">Web Development</SelectItem>
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
                <StudentItem student={student} onRemove={handleRemoveStudent} />
              </div>
            ))}
          </div>
          <div></div>
          <h2 className="text-xl font-semibold mt-8 mb-4">Waitlist (Pending Approvals)</h2>
          <div className="space-y-2">
            {waitlist.map(student => (
              <div key={student.id} onClick={() => handleWaitlistStudentSelect(student.id)}>
                <StudentItem 
                  student={student} 
                  isWaitlist 
                  onRemove={() => {}} // This is a placeholder since we don't remove waitlist students directly
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button onClick={handleApproveWaitlist} disabled={selectedWaitlistStudents.length === 0}>Approve</Button>
            <Button variant="destructive" onClick={handleRemoveWaitlist} disabled={selectedWaitlistStudents.length === 0}>Remove</Button>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          {selectedStudent && <StudentProfile student={selectedStudent} />}
        </div>
      </div>
    </div>
  )
}