import React, { useState } from 'react'
import { Search, FileText, Film, Download, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'mp4' | 'zip';
  size?: string;
  folder: string;
}

const DocumentCard: React.FC<{ document: Document }> = ({ document }) => (
  <Card className="hover:bg-accent cursor-pointer">
    <CardContent className="p-4 flex flex-col items-center">
      {document.type === 'pdf' ? (
        <FileText className="w-12 h-12 text-blue-500 mb-2" />
      ) : document.type === 'mp4' ? (
        <Film className="w-12 h-12 text-green-500 mb-2" />
      ) : (
        <FileText className="w-12 h-12 text-orange-500 mb-2" />
      )}
      <p className="text-sm text-center truncate w-full">{document.name}</p>
      <p className="text-xs text-muted-foreground">{document.folder}</p>
      <div className="flex gap-2 mt-2">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
)

const InfoCard: React.FC<{ title: string; description: string; image: string; imagePosition: 'left' | 'bottom' }> = ({ title, description, image, imagePosition }) => (
  <Card className="w-full">
    <CardContent className={`p-6 justify-center items-center flex ${imagePosition === 'left' ? 'flex-row' : 'flex-col'}`}>
      {imagePosition === 'left' && <img src={image} alt={title} className="w-1/3 mr-4 object-contain" />}
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {imagePosition === 'bottom' && <img src={image} alt={title} className="w-1/4 mt-4 object-contain" />}
    </CardContent>
  </Card>
)

export default function StudentDocsPage() {
  const [documents] = useState<Document[]>([
    { id: '1', name: 'Course Syllabus.pdf', type: 'pdf', folder: 'General' },
    { id: '2', name: 'Lecture 1.mp4', type: 'mp4', folder: 'Lectures' },
    { id: '3', name: 'Assignment Guidelines.pdf', type: 'pdf', folder: 'Assignments' },
    { id: '4', name: 'Lecture 2.mp4', type: 'mp4', folder: 'Lectures' },
    { id: '5', name: 'Exam Questions.pdf', type: 'pdf', folder: 'Exams' },
    { id: '6', name: 'Student Projects.pdf', type: 'pdf', folder: 'Projects' },
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFolder, setSelectedFolder] = useState('All')
  const [sortBy, setSortBy] = useState('name')

  const folders = ['All', 'General', 'Lectures', 'Assignments', 'Exams', 'Projects']

  const filteredDocuments = documents
    .filter(doc => 
      (selectedFolder === 'All' || doc.folder === selectedFolder) &&
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'type') return a.type.localeCompare(b.type)
      return 0
    })

  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InfoCard
          title="Course Documents"
          description="Access all your course materials, lectures, and assignments in one place"
          image="/images/docs1.png"
          imagePosition="left"
        />
        <InfoCard
          title="Learning Resources"
          description="Download and view course materials to help you succeed in your studies"
          image="/images/docs2.png"
          imagePosition="bottom"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Course Documents</h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Search documents..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <Select value={selectedFolder} onValueChange={setSelectedFolder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select folder" />
            </SelectTrigger>
            <SelectContent>
              {folders.map(folder => (
                <SelectItem key={folder} value={folder}>
                  {folder}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy('name')}>By Name</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('type')}>By Type</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredDocuments.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>
    </div>
  )
}