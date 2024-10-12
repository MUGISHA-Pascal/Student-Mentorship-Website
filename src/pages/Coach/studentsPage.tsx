import React, { ReactNode, useState } from 'react'
import { Search, Filter, ChevronDown, MoreVertical, MessageSquare, UserPlus, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


interface StatCardProps {
    icon: React.ReactNode;
    value: string;
    label: string;
    subtitle: string;
  }
  
const StatCard: React.FC<StatCardProps> = ({ icon, value, label, subtitle }) => (
  <Card className="bg-white">
    <CardContent className="flex items-center p-4">
      <div className="mr-4 p-3 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <div className="text-xl sm:text-2xl font-bold">{value}</div>
        <div className="text-sm font-medium text-gray-500">{label}</div>
        <div className="text-xs text-gray-400">{subtitle}</div>
      </div>
    </CardContent>
  </Card>
)

interface StudentItemProps {
  student: {
    field: ReactNode
    email: ReactNode
    contact: ReactNode
    avatar: string;
    name: string;
  };
  isWaitlist?: boolean;
}

const StudentItem: React.FC<StudentItemProps> = ({ student, isWaitlist = false }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg mb-2">
    <div className="flex items-center mb-2 sm:mb-0">
      <input type="checkbox" className="mr-4" />
      <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full mr-4" />
      <div>
        <div className="font-medium">{student.name}</div>
        <div className="text-sm text-gray-500">{student.contact}</div>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0">
      <div className="mb-2 sm:mb-0 sm:mr-4 text-blue-500">{student.email}</div>
      <div className="mb-2 sm:mb-0 sm:mr-4 px-3 py-1 bg-purple-100 text-purple-700 rounded-full">{student.field}</div>
      {!isWaitlist && <MoreVertical className="text-gray-400 hidden sm:block" />}
    </div>
  </div>
)
const StudentProfile: React.FC<{ student: {
    email: ReactNode
    address: ReactNode; avatar: string; name: string; field: string 
} }> = ({ student }) => (
  <div className="bg-white p-6 rounded-lg">
    <img src={student.avatar} alt={student.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
    <h3 className="text-xl font-bold text-center mb-2">{student.name}</h3>
    <p className="text-gray-500 text-center mb-6">{student.field}</p>
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

export default function StudentsPage() {
  const [selectedStudent] = useState(null)
  const [students] = useState([
    { id: 1, name: 'John Doe', contact: 'Contact', email: 'johndoe@example.com', field: 'Music & Dancing', avatar: 'https://i.pravatar.cc/150?img=1', address: 'Nyabiku, West' },
    { id: 2, name: 'Jane Smith', contact: 'Contact', email: 'janesmith@example.com', field: 'Music & Dancing', avatar: 'https://i.pravatar.cc/150?img=2', address: 'Nyabiku, East' },
    { id: 3, name: 'Bob Johnson', contact: 'Contact', email: 'bobjohnson@example.com', field: 'Music & Dancing', avatar: 'https://i.pravatar.cc/150?img=3', address: 'Nyabiku, North' },
    { id: 4, name: 'Alice Williams', contact: 'Contact', email: 'alicewilliams@example.com', field: 'Music & Dancing', avatar: 'https://i.pravatar.cc/150?img=4', address: 'Nyabiku, South' },
  ])
  const [waitlist] = useState([
    { id: 5, name: 'Charlie Brown', contact: 'Contact', email: 'charliebrown@example.com', field: 'Music & Dancing', avatar: 'https://i.pravatar.cc/150?img=5', address: 'Nyabiku, Central' },
    { id: 6, name: 'Diana Clark', contact: 'Contact', email: 'dianaclark@example.com', field: 'Music & Dancing', avatar: 'https://i.pravatar.cc/150?img=6', address: 'Nyabiku, Downtown' },
  ])

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<MessageSquare className="h-6 w-6 text-blue-500" />} value="12" label="Activities" subtitle="Last week" />
        <StatCard icon={<UserPlus className="h-6 w-6 text-green-500" />} value="80%" label="Mentor-rate" subtitle="Last week" />
        <StatCard icon={<Check className="h-6 w-6 text-red-500" />} value="3" label="Students" subtitle="Coached" />
        <StatCard icon={<X className="h-6 w-6 text-orange-500" />} value="12" label="Courses" subtitle="Provided" />
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 lg:pr-6 mb-6 lg:mb-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-xl font-semibold mb-2 sm:mb-0">Students List</h2>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add Student
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div className="relative w-full sm:w-auto mb-2 sm:mb-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input className="pl-10 w-full sm:w-auto" placeholder="Search" />
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Sort <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            {students.map(student => (
              <StudentItem key={student.id} student={student} />
            ))}
          </div>
          <h2 className="text-xl font-semibold mt-8 mb-4">Waitlist (Pending Approvals)</h2>
          <div className="space-y-2">
            {waitlist.map(student => (
              <StudentItem key={student.id} student={student} isWaitlist />
            ))}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button>Approve</Button>
            <Button variant="destructive">Remove</Button>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <StudentProfile student={selectedStudent || students[0]} />
        </div>
      </div>
    </div>
  )
}