import React, { useState, useRef } from 'react'
import { Search, Filter, Upload, Trash2, FileText, Film, MoreVertical, X, Folder } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'react-toastify'

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'mp4' | 'zip';
  size?: string;
  folder: string;
}

interface UploadingFile extends Document {
  progress: number;
}

interface Folder {
  id: string;
  name: string;
}

const DocumentCard: React.FC<{ document: Document }> = ({ document }) => (
  <Card className="hover:bg-accent cursor-pointer">
    <CardContent className="p-4 flex flex-col items-center">
      {document.type === 'pdf' ? (
        <FileText className="w-12 h-12 text-blue-500 mb-2" />
      ) : document.type === 'mp4' ? (
        <Film className="w-12 h-12 text-green-500 mb-2" />
      ) : (
        <Upload className="w-12 h-12 text-orange-500 mb-2" />
      )}
      <p className="text-sm text-center truncate w-full">{document.name}</p>
      <p className="text-xs text-muted-foreground">{document.folder}</p>
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

const InfoCard: React.FC<{ title: string; description: string; image: string; imagePosition: 'left' | 'bottom' }> = ({ title, description, image, imagePosition }) => (
  <Card className="w-full">
    <CardContent className={`p-6 justify-center items-center flex ${imagePosition === 'left' ? 'flex-row' : 'flex-col' }`}>
      {imagePosition === 'left' && <img src={image} alt={title} className="w-1/3 mr-4 object-contain " />}
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {imagePosition === 'bottom' && <img src={image} alt={title} className="w-1/4 mt-4 object-contain" />}
    </CardContent>
  </Card>
)

export default function DocsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Course Syllabus.pdf', type: 'pdf', folder: 'General' },
    { id: '2', name: 'Lecture 1.mp4', type: 'mp4', folder: 'Lectures' },
    { id: '3', name: 'Assignment Guidelines.pdf', type: 'pdf', folder: 'Assignments' },
    { id: '4', name: 'Lecture 2.mp4', type: 'mp4', folder: 'Lectures' },
    { id: '5', name: 'Exam Questions.pdf', type: 'pdf', folder: 'Exams' },
    { id: '6', name: 'Student Projects.pdf', type: 'pdf', folder: 'Projects' },
  ])
  const [folders, setFolders] = useState<Folder[]>([
    { id: '1', name: 'General' },
    { id: '2', name: 'Lectures' },
    { id: '3', name: 'Assignments' },
    { id: '4', name: 'Exams' },
    { id: '5', name: 'Projects' },
  ])
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadStep, setUploadStep] = useState(1)
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const [courseTitle, setCourseTitle] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [selectedFolder, setSelectedFolder] = useState(folders[0].name)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.name.split('.').pop() as 'pdf' | 'mp4' | 'zip',
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        progress: 0,
        folder: selectedFolder
      }))
      setUploadingFiles(prev => [...prev, ...newFiles])

      // Simulate file upload
      newFiles.forEach(file => {
        const interval = setInterval(() => {
          setUploadingFiles(prev => 
            prev.map(f => 
              f.id === file.id
                ? { ...f, progress: Math.min(f.progress + 10, 100) }
                : f
            )
          )
        }, 500)

        setTimeout(() => {
          clearInterval(interval)
          setUploadingFiles(prev => 
            prev.map(f => 
              f.id === file.id
                ? { ...f, progress: 100 }
                : f
            )
          )
        }, 5000)
      })
    }
  }

  const handleRemoveFile = (id: string) => {
    setUploadingFiles(prev => prev.filter(file => file.id !== id))
  }

  const handleBrowseFiles = () => {
    fileInputRef.current?.click()
  }

  const handleCourseSubmit = () => {
    const newDocuments = uploadingFiles.map(file => ({
      id: file.id,
      name: file.name,
      type: file.type,
      size: file.size,
      folder: file.folder
    }))
    setDocuments(prev => [...prev, ...newDocuments])
    setIsUploadDialogOpen(false)
    setUploadStep(1)
    setUploadingFiles([])
    setCourseTitle('')
    setCourseDescription('')
    toast.success('Course Uploaded Successfully', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InfoCard
          title="Find all your shared Course Documents here"
          description="Find all your shared Course Documents here"
          image="/images/docs1.png?height=100&width=200"
          imagePosition="left"
        />
        <InfoCard
          title="Why Use Docs In The GOYA E-COACHING?"
          description="The docs are for helping the trainees to catchup with Theoretical concepts that may involve in the course and that you want them to retain"
          image="/images/docs2.png?height=10000&width=200"
          imagePosition="bottom"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Documents</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Upload className="mr-2 h-4 w-4" /> Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{uploadStep === 1 ? 'Media Upload' : 'Enter The Course Title'}</DialogTitle>
              </DialogHeader>
              {uploadStep === 1 ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="folder-select">Select Folder</Label>
                    <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a folder" />
                      </SelectTrigger>
                      <SelectContent>
                        {folders.map(folder => (
                          <SelectItem key={folder.id} value={folder.name}>
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      multiple
                      ref={fileInputRef}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">Drag your file(s) to start uploading</p>
                      <p className="mt-1 text-sm text-gray-600">OR</p>
                      <Button variant="outline" className="mt-2" onClick={handleBrowseFiles}>Browse files</Button>
                    </label>
                  </div>
                  <p className="text-sm text-muted-foreground">Only support .jpg, .png and .svg and .zip files</p>
                  {uploadingFiles.map(file => (
                    <div key={file.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{file.name}</span>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(file.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{file.progress === 100 ? 'Completed' : 'Uploading...'}</span>
                        <span>{file.progress}% • {file.size}</span>
                      </div>
                      <Progress value={file.progress} className="w-full" />
                    </div>
                  ))}
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                    <Button onClick={() => setUploadStep(2)} disabled={uploadingFiles.length === 0 || uploadingFiles.some(file => file.progress < 100)}>Next</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="course-title">Title</Label>
                    <Input
                      id="course-title"
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      placeholder="Enter course title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-description">Description</Label>
                    <Textarea
                      id="course-description"
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                      placeholder="Enter course description"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setUploadStep(1)}>Back</Button>
                    <Button onClick={handleCourseSubmit}>Submit</Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
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
        {documents.map((doc) =>   (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>
    </div>
  )
}