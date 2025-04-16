import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Filter, MoreVertical, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import UploadModal from './components/uploadCourse';
import { useUserStore } from '@/store/userStore';
import { toast } from "react-toastify";

type Course = {
  id: string;
  title: string;
  image: string;
  extension?: string;
  downloadLink: string;
  courseType: string;
  dateCreated: string;
};


export default function StudentDocsPage() {
  const [showAll, setShowAll] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const { role, fetchUser } = useUserStore();
  const [userId, setUserId] = useState<string | null>(null);

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  const handleSeeAllClick = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
    };
    fetchData();
  }, [fetchUser]);

  useEffect(() => {
    if (role) {
      setUserId(role.id);
    }
  }, [role]);

  const fetchDocuments = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/document/get-course-docs/${userId}`);
      const docs = response.data.map((doc: { course: { name: string, id: string }; fileType: string; fileName: string; uploadDate: string }): Course => ({
        id: doc.course.id,
        title: doc.course?.name || 'Untitled',
        image: doc.fileType.startsWith('video') ? '/svgs/video_course.svg' : '/svgs/file_course.svg',
        extension: doc.fileType.split('/').pop()?.toUpperCase(),
        downloadLink: `http://localhost:3000/api/v1/document/download-course-doc/${doc.fileName}`,
        courseType: doc.fileType.startsWith('video') ? 'video' : 'file',
        dateCreated: doc.uploadDate,
      }));

      setCourses(docs);

    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [userId])


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

  const visibleCourses = showAll ? filteredCourses : filteredCourses.slice(0, 4);

  const handleDeleteDocument = async (documentId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/document/delete-course-doc/${documentId}`);

      // Remove the deleted course from the state
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== documentId)
      );

      // Show success toast notification
      toast.success('Document deleted successfully.');
    } catch (error) {
      console.error('Error deleting document:', error);
      // Show error toast notification
      toast.error('Failed to delete document.');
    }
  };

  const handleDownload = async (downloadLink: string, fileName: string, extension?: string) => {
    try {
      const response = await axios.get(downloadLink, {
        responseType: 'blob', // Important for binary data
      });

      // Use the provided extension, fallback to extracting from fileName, or default to "unknown"
      const finalExtension = extension?.toLowerCase();

      // Construct the final file name
      const baseName = fileName.includes('.') ? fileName.split('.').slice(0, -1).join('.') : fileName; // Strip existing extension if present
      const finalFileName = `${baseName}.${finalExtension}`;

      // Create a URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', finalFileName);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('File downloaded successfully!');
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file.');
    }
  };





  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Documents</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button onClick={openUploadModal} className="w-full sm:w-auto">
            <Upload className="mr-2 h-4 w-4" /> Upload Course
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
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

        <div className="flex space-x-2 w-full sm:w-auto">
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

      <div className="flex justify-end mb-4">
        <button
          onClick={handleSeeAllClick}
          className="text-blue-400 hover:text-blue-600 font-semibold transition duration-700"
        >
          {showAll ? 'Show Less' : 'See All'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCourses.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">No courses available.</p>
        ) : (
          visibleCourses.map((course, index) => (
            <Card key={index} className="shadow-md rounded-lg py-4 px-2 cursor-pointer">
              <img
                src={course.image}
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
                    <DropdownMenuItem onClick={() => handleDeleteDocument(course.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* <a href={course.downloadLink} download target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                </a> */}
                <button onClick={() => handleDownload(course.downloadLink, course.title, course.extension)}>
                  <img src="/svgs/download.svg" alt="Download" />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
      <UploadModal isOpen={isUploadModalOpen} onClose={closeUploadModal} userId={userId} onCourseUploaded={fetchDocuments} />
    </div>
  );
}
