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
  <Card className="hover:bg-accent cursor-pointer">
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

export default function StudentDocsPage() {
  const [documents] = useState<Document[]>([
    { id: '1', name: 'Course Syllabus.pdf', type: 'pdf' },
    { id: '2', name: 'Lecture 1.mp4', type: 'mp4' },
    { id: '3', name: 'Assignment Guidelines.pdf', type: 'pdf' },
    { id: '4', name: 'Lecture 2.mp4', type: 'mp4' },
    { id: '5', name: 'Exam Questions.pdf', type: 'pdf' },
    { id: '6', name: 'Student Projects.pdf', type: 'pdf' },
  ])

  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Documents</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <Upload className="mr-2 h-4 w-4" /> Upload Document
          </Button>
          <Button variant="destructive" className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="relative w-full sm:w-64 mb-2 sm:mb-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input type="text" placeholder="Search documents..." className="pl-10" />
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">Sort</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Name</DropdownMenuItem>
              <DropdownMenuItem>Date</DropdownMenuItem>
              <DropdownMenuItem>Size</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {documents.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>
    </div>
  )
}