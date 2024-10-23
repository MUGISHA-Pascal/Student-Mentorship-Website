import { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

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
    </div>
  );
}
