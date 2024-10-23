// import React, { useState } from 'react'
// import { Search, Filter, Upload, Trash2, FileText, Film, MoreVertical } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent } from "@/components/ui/card"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// interface Document {
//   id: string;
//   name: string;
//   type: 'pdf' | 'mp4';
// }

// const DocumentCard: React.FC<{ document: Document }> = ({ document }) => (
//   <Card className="hover:bg-accent cursor-pointer">
//     <CardContent className="p-4 flex flex-col items-center">
//       {document.type === 'pdf' ? (
//         <FileText className="w-12 h-12 text-blue-500 mb-2" />
//       ) : (
//         <Film className="w-12 h-12 text-green-500 mb-2" />
//       )}
//       <p className="text-sm text-center truncate w-full">{document.name}</p>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <MoreVertical className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuItem>View</DropdownMenuItem>
//           <DropdownMenuItem>Download</DropdownMenuItem>
//           <DropdownMenuItem>Delete</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </CardContent>
//   </Card>
// )

// export default function DocsPage() {
//   const [documents] = useState<Document[]>([
//     { id: '1', name: 'Course Syllabus.pdf', type: 'pdf' },
//     { id: '2', name: 'Lecture 1.mp4', type: 'mp4' },
//     { id: '3', name: 'Assignment Guidelines.pdf', type: 'pdf' },
//     { id: '4', name: 'Lecture 2.mp4', type: 'mp4' },
//     { id: '5', name: 'Exam Questions.pdf', type: 'pdf' },
//     { id: '6', name: 'Student Projects.pdf', type: 'pdf' },
//   ])

//   return (
//     <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//         <h1 className="text-2xl font-bold mb-4 sm:mb-0">Documents</h1>

//       </div>

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//         <div className="relative w-full sm:w-64 mb-2 sm:mb-0">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//           <Input type="text" placeholder="Search documents..." className="pl-10" />
//         </div>
//         <div className="flex space-x-2 w-full sm:w-auto">
//           <Button variant="outline" className="w-full sm:w-auto">
//             <Filter className="mr-2 h-4 w-4" /> Filter
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="w-full sm:w-auto">Sort</Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuItem>Name</DropdownMenuItem>
//               <DropdownMenuItem>Date</DropdownMenuItem>
//               <DropdownMenuItem>Size</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {documents.map((doc) => (
//           <DocumentCard key={doc.id} document={doc} />
//         ))}
//       </div>
//     </div>
//   )
// }
import { useState } from 'react';
import { Search, Filter, MoreVertical, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FaTimes } from 'react-icons/fa';

interface Course {
  title: string;
  image: string;
  extension: string;
  downloadLink: string;
  courseType: string;
  dateCreated: string;
}

const courses: Course[] = [
  { title: 'Course 1', image: 'https://via.placeholder.com/150', extension: 'PDF', downloadLink: '#', courseType: 'file', dateCreated: '2023-10-01' },
  { title: 'Course 2', image: 'https://via.placeholder.com/150', extension: 'MP4', downloadLink: '#', courseType: 'video', dateCreated: '2023-09-20' },
  { title: 'Course 3', image: 'https://via.placeholder.com/150', extension: 'PDF', downloadLink: '#', courseType: 'file', dateCreated: '2023-09-30' },
  { title: 'Course 4', image: 'https://via.placeholder.com/150', extension: 'PDF', downloadLink: '#', courseType: 'file', dateCreated: '2023-09-10' },
  { title: 'Course 5', image: 'https://via.placeholder.com/150', extension: 'MP4', downloadLink: '#', courseType: 'video', dateCreated: '2023-10-15' },
  { title: 'Course 6', image: 'https://via.placeholder.com/150', extension: 'PDF', downloadLink: '#', courseType: 'file', dateCreated: '2023-10-01' },
  { title: 'Course 7', image: 'https://via.placeholder.com/150', extension: 'MP4', downloadLink: '#', courseType: 'video', dateCreated: '2023-09-20' },
  { title: 'Course 8', image: 'https://via.placeholder.com/150', extension: 'PDF', downloadLink: '#', courseType: 'file', dateCreated: '2023-09-30' },
  { title: 'Course 9', image: 'https://via.placeholder.com/150', extension: 'PDF', downloadLink: '#', courseType: 'file', dateCreated: '2023-09-10' },
  { title: 'Course 0', image: 'https://via.placeholder.com/150', extension: 'MP4', downloadLink: '#', courseType: 'video', dateCreated: '2023-10-15' },
];

export default function StudentDocsPage() {
  const [showAll, setShowAll] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  const handleSeeAllClick = () => {
    setShowAll(!showAll);
  };

  // Filter based on search, filter type, and sort type
  const filteredCourses = courses
    .filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((course) =>
      filterType ? course.courseType === filterType : true
    )
    .sort((a, b) => {
      if (sortType === 'name') {
        return a.title.localeCompare(b.title);
      } else if (sortType === 'date') {
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      }
      return 0;
    });

  const visibleCourses = showAll ? filteredCourses : filteredCourses.slice(0, 5);

  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Documents</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button onClick={openUploadModal} className="w-full sm:w-auto">
            <Upload className="mr-2 h-4 w-4" /> Upload Document
          </Button>
          <Button variant="destructive" className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      {/* Search, Filter, and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        {/* Search */}
        <div className="relative w-full sm:w-64 mb-2 sm:mb-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search documents..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter and Sort */}
        <div className="flex space-x-2 w-full sm:w-auto">
          {/* Filter by course type */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterType(null)}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType('file')}>Files</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType('video')}>Videos</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort by name or date */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">Sort</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortType('name')}>Name</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortType('date')}>Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* See All / Show Less Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleSeeAllClick}
          className="text-blue-400 hover:text-blue-600 font-semibold transition duration-700"
        >
          {showAll ? 'Show Less' : 'See All'}
        </button>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {visibleCourses.map((course, index) => (
          <Card key={index} className="shadow-md rounded-lg py-4 px-2 cursor-pointer">
            <img
              src={course.courseType === 'video' ? '/svgs/video_course.svg' : '/svgs/file_course.svg'}
              alt={course.title}
              className="w-4/5 object-contain rounded-md mb-4"
            />

            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{course.extension}</p>
            <p className="text-sm text-gray-600 mb-2">Created: {new Date(course.dateCreated).toLocaleDateString()}</p>
            <div className="flex justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 rotate-90">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <a href={course.downloadLink} className="hover:text-blue-500">
                <img src="/svgs/download.svg" alt="Download" />
              </a>
            </div>
          </Card>
        ))}
      </div>
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black dark:bg-white dark:bg-opacity-20 bg-opacity-50">
          <div className="relative w-3/5 h-3/5 bg-white dark:bg-black p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <button
              className="absolute top-5 right-5 text-red-600"
              title="cancel"
              onClick={closeUploadModal}
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4">Upload a Course</h2>
            <form className="flex flex-col gap-4 w-full px-4">
              <input
                type="text"
                placeholder="Course Title"
                className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
              <textarea
                placeholder="Course Description"
                className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
              <div className="bg-blue-400 cursor-pointer rounded-md flex items-center">
                <input type="file" className="border px-2 py-1 rounded-md opacity-0 cursor-pointer" />
                <p className="text-white font-semibold">Choose a file</p>
              </div>
              <button
                type="button"
                className="bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
                onClick={closeUploadModal}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
