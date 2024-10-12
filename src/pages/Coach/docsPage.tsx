import React, { useState } from 'react'
import { Search, Filter, Upload, Trash2, FileText, Film, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'mp4';
}

const DocumentCard: React.FC<{ document: Document }> = ({ document }) => (
  <Card className="hover:bg-gray-50 cursor-pointer">
    <CardContent className="p-4 flex flex-col items-center">
      {document.type === 'pdf' ? (
        <FileText className="w-12 h-12 text-blue-500 mb-2" />
      ) : (
        <Film className="w-12 h-12 text-green-500 mb-2" />
      )}
      <p className="text-sm text-center truncate w-full">{document.name}</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuItem>Download</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardContent>
  </Card>
)

export default function DocsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'course_1.pdf', type: 'pdf' },
    { id: '2', name: 'course_2.pdf', type: 'pdf' },
    { id: '3', name: 'course_3.mp4', type: 'mp4' },
    { id: '4', name: 'course_4.pdf', type: 'pdf' },
    { id: '5', name: 'course_5.pdf', type: 'pdf' },
    { id: '6', name: 'course_6.mp4', type: 'mp4' },
    { id: '7', name: 'course_7.pdf', type: 'pdf' },
    { id: '8', name: 'course_8.mp4', type: 'mp4' },
    { id: '9', name: 'course_9.pdf', type: 'pdf' },
  ])

  const handleUpload = () => {
    // Implement file upload logic here
    console.log('Upload a course')
  }

  const handleDeleteAll = () => {
    // Implement delete all logic here
    setDocuments([])
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-center p-6">
              <img src="/svgs/course.svg" alt="Course documents illustration" className="w-40 h-20" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Find all your shared Course Documents here</h2>
            <p className="text-gray-600 mb-4">Find all your shared Course Documents here</p>
            <Button onClick={handleUpload}>
              <Upload className="mr-2 h-4 w-4" /> Upload a course
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Why Use Docs In The GOYA E-COACHING?</h2>
            <p className="text-gray-600">
              The docs are for helping the trainees to catch up with Theoretical concepts that may involve in the
              course and that you want them to retain
            </p>
            <div className="flex justify-center items-center p-6">
              <img src="/images/img2.png" alt="Lightbulb" className="w-25 h-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input className="pl-10" placeholder="Search" />
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline">
            Sort
          </Button>
          <Button variant="outline" onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" /> Upload a course
          </Button>
          <Button variant="destructive" onClick={handleDeleteAll}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {documents.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>

      {documents.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Add some docs for your students to access them easily</p>
      )}
    </div>
  )
}