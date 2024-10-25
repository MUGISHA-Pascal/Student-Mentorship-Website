import React, { useState } from 'react'
import { Search, Star, ArrowLeft, Bookmark } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import SelectStudentPhoto from '@/components/dashboard/student/selectStudentPhoto'

interface Course {
  id: string;
  title: string;
  avatar: string;
  rating: number;
  reviews: number;
  price: string;
  color: string;
  description: string;
}

interface Coach {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  oldPrice: string;
  newPrice: string;
  bio: string;
  experience: { role: string; period: string }[];
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Music and Song Production',
    avatar: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/spotify-icon.png',
    rating: 4,
    reviews: 42,
    price: '$10.5-$15.5',
    color: 'bg-green-100',
    description: 'Learn the art and science of music production. This course covers everything from basic sound theory to advanced mixing techniques.'
  },
  {
    id: '2',
    title: 'Music and Song Production',
    avatar: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/spotify-icon.png',
    rating: 4,
    reviews: 42,
    price: '$10.5-$15.5',
    color: 'bg-yellow-100',
    description: 'Dive deep into songwriting and production. Explore melody creation, lyric writing, and how to produce your songs professionally.'
  },
  {
    id: '3',
    title: 'Music and Song Production',
    avatar: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/spotify-icon.png',
    rating: 4,
    reviews: 42,
    price: '$10.5-$15.5',
    color: 'bg-purple-100',
    description: 'Master the tools of modern music production. Get hands-on experience with industry-standard software and hardware.'
  },
  {
    id: '4',
    title: 'Advanced Music Theory',
    avatar: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/spotify-icon.png',
    rating: 5,
    reviews: 38,
    price: '$12.5-$18.5',
    color: 'bg-blue-100',
    description: 'Deepen your understanding of music theory. This course covers advanced concepts in harmony, rhythm, and composition.'
  },
  {
    id: '5',
    title: 'Advanced Music Theory',
    avatar: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/spotify-icon.png',
    rating: 5,
    reviews: 38,
    price: '$12.5-$18.5',
    color: 'bg-blue-100',
    description: 'Deepen your understanding of music theory. This course covers advanced concepts in harmony, rhythm, and composition.'
  },
];

const coaches: Coach[] = [
  {
    id: '1',
    name: 'Dr. Jane',
    image: 'https://i.pravatar.cc/150?img=10?height=64&width=64',
    rating: 4,
    reviews: 42,
    oldPrice: '$67.4/month',
    newPrice: '$40.4/month',
    bio: 'Bio info about the coach on his background and also some experience info to give the student and more about info, about info can be added to make the student interested in the coach',
    experience: [
      { role: 'Musician Manager At Hope Music', period: '2018 - 2024' },
      { role: 'Musician Manager At Hope Music', period: '2018 - 2024' },
      { role: 'Musician Manager At Hope Music', period: '2018 - 2024' },
      { role: 'Musician Manager At Hope Music', period: '2018 - 2024' },
    ]
  },
  {
    id: '2',
    name: 'Prof. Smith',
    image: 'https://i.pravatar.cc/150?img=3?height=64&width=64',
    rating: 5,
    reviews: 38,
    oldPrice: '$72.0/month',
    newPrice: '$45.0/month',
    bio: 'Experienced music producer with a passion for teaching and mentoring aspiring artists.',
    experience: [
      { role: 'Senior Producer at Harmony Studios', period: '2015 - Present' },
      { role: 'Adjunct Professor at Music University', period: '2012 - 2015' },
      { role: 'Freelance Music Producer', period: '2008 - 2012' },
    ]
  },
  {
    id: '3',
    name: 'Ms. Johnson',
    image: 'https://i.pravatar.cc/150?img=4?height=64&width=64',
    rating: 4,
    reviews: 56,
    oldPrice: '$65.0/month',
    newPrice: '$38.5/month',
    bio: 'Versatile musician and vocal coach with expertise in various genres and production techniques.',
    experience: [
      { role: 'Vocal Coach at Star Academy', period: '2016 - Present' },
      { role: 'Session Musician', period: '2010 - 2016' },
      { role: 'Music Director for Broadway Shows', period: '2008 - 2010' },
    ]
  },
];

const NewProfileSetupPopup: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    educationLevel: '',
    bio: ''
  });
  const [showCourseDetails, setShowCourseDetails] = useState<string | null>(null);
  const [showCoachDetails, setShowCoachDetails] = useState<string | null>(null);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleFinish = () => {
    console.log("Profile setup completed", { selectedCourse, selectedCoach, personalDetails });
    onClose();
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    ));
  };

  const renderCourseCard = (course: Course) => (
    <div key={course.id} className={`${course.color} p-4 rounded-lg shadow`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <img src={course.avatar} className=" rounded-full" />
            </div>
            <h3 className="font-semibold text-gray-800">{course.title}</h3>
          </div>
          <div className="flex items-center mt-2">
            {renderStars(course.rating)}
            <span className="text-sm text-gray-600 ml-1">({course.reviews} Reviews)</span>
          </div>
        </div>
        <Bookmark className="w-6 h-6 text-gray-400" />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-800">{course.price}/Monthly</p>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCourseDetails(course.id)}
          >
            Details
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setSelectedCourse(course);
              handleNext();
            }}
          >
            Enroll
          </Button>
        </div>
      </div>
      {showCourseDetails === course.id && (
        <div className="block lg:hidden md:hidden mt-4 p-4 bg-white rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Course Details</h4>
          <p className="text-sm text-gray-600">{course.description}</p>
          <Button
            variant="link"
            className="mt-2 p-0 text-red-400 hover:text-red-600 !no-underline"
            onClick={() => setShowCourseDetails(null)}
          >
            Hide details
          </Button>
        </div>
      )}
    </div>
  );

  const renderStep = () => {
    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Select the course To continue</h2>
            <p className="text-sm text-gray-600">NB: This will determine the whole learning process within this platform</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 bg-white text-gray-800"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 gap-4 p-1 h-[60vh]">
              <div className="col-span-4 md:col-span-2 lg:col-span-2 space-y-4 overflow-y-scroll no-scrollbar">
                {filteredCourses.map(renderCourseCard)}
              </div>
              <div className="col-span-2">
                <div className="col-span-2 px-2">
                  {showCourseDetails && (
                    <div className="hidden lg:block md:block px-4 py-3 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Course Details</h4>
                      <p className="text-sm text-gray-600">
                        {courses.find((course) => course.id === showCourseDetails)?.description}
                      </p>
                      <Button
                        variant="link"
                        className="mt-2 p-0 text-red-400 hover:text-red-600 !no-underline"
                        onClick={() => setShowCourseDetails(null)}
                      >
                        Hide details
                      </Button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-800">Select Coach For: {selectedCourse?.title}</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 bg-white text-gray-800"
                placeholder="Search a coach By Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4 p-1 overflow-y-scroll h-[60vh]">
              <div className="space-y-4">
                {coaches.filter(coach => coach.name.toLowerCase().includes(searchTerm.toLowerCase())).map((coach) => (
                  <div
                    key={coach.id}
                    className={`bg-white p-4 rounded-lg shadow ${selectedCoach?.id === coach.id ? 'border border-blue-500 bg-zinc-200' : ''}`}
                  >
                    <div className="flex items-center space-x-4">
                      <img src={coach.image} alt={coach.name} className="w-16 h-16 rounded-full" />
                      <div>
                        <h3 className="font-semibold text-gray-800">{coach.name}</h3>
                        <p className="text-sm text-gray-600">
                          <span className="line-through">{coach.oldPrice}</span>{' '}
                          <span className="text-green-500">{coach.newPrice}</span>
                        </p>
                        <div className="flex items-center">
                          {renderStars(coach.rating)}
                          <span className="text-sm text-gray-600 ml-1">({coach.reviews} Reviews)</span>
                        </div>
                      </div>
                    </div>
                    {selectedCoach?.id === coach.id && (
                      <div className='mt-3 block lg:hidden md:hidden'>
                        <div className="bg-white p-4 rounded-lg shadow">
                          <h3 className="font-semibold text-gray-800 mb-4">Coach {selectedCoach.name}</h3>
                          <h3 className="font-semibold text-gray-800 mb-4">About Coach</h3>
                          <p className="text-sm text-gray-600 mb-4">{selectedCoach.bio}</p>
                          <h4 className="font-semibold text-gray-800 mb-2">Experience Timeline</h4>
                          <div className="space-y-2">
                            {selectedCoach.experience.map((exp, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                <p className="text-sm text-gray-600">
                                  {exp.role}
                                  <span className="text-gray-400 ml-2">{exp.period}</span>
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          {selectedCoach && (
                            <div className="w-full mt-4">
                              <Button onClick={handleNext} className="w-1/4 bg-blue-500 hover:bg-blue-600 text-white float-end">Continue</Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCoach(coach)}
                      >
                        Select
                      </Button>
                      {/*   <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowCoachDetails(coach.id)}
                      >
                        Details
                      </Button> */}
                    </div>
                    {showCoachDetails === coach.id && (
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Coach Details</h4>
                        <p className="text-sm text-gray-600">{coach.bio}</p>
                        <h5 className="font-semibold text-gray-800 mt-2 mb-1">Experience</h5>
                        {coach.experience.map((exp, index) => (
                          <p key={index} className="text-sm text-gray-600">{exp.role} ({exp.period})</p>
                        ))}
                        <Button
                          variant="link"
                          className="mt-2 p-0"
                          onClick={() => setShowCoachDetails(null)}
                        >
                          Close
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {selectedCoach && (
                <div className='h-[60vh] hidden lg:block md:block'>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-gray-800 mb-4">Coach {selectedCoach.name}</h3>
                    <h3 className="font-semibold text-gray-800 mb-4">About Coach</h3>
                    <p className="text-sm text-gray-600 mb-4">{selectedCoach.bio}</p>
                    <h4 className="font-semibold text-gray-800 mb-2">Experience Timeline</h4>
                    <div className="space-y-2">
                      {selectedCoach.experience.map((exp, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-black rounded-full"></div>
                          <p className="text-sm text-gray-600">
                            {exp.role}
                            <span className="text-gray-400 ml-2">{exp.period}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    {selectedCoach && (
                      <div className="w-full mt-4">
                        <Button onClick={handleNext} className="w-1/3 bg-blue-500 hover:bg-blue-600 text-white float-end">Continue</Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Enter Your Personal details</h2>
              <p className="text-sm text-gray-600">NB: This will appear on your profile</p>
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <SelectStudentPhoto />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Enter First Name"
                    className="bg-white text-gray-800"
                    value={personalDetails.firstName}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, firstName: e.target.value })}
                  />
                  <Input
                    placeholder="Enter Last Name"
                    className="bg-white text-gray-800"
                    value={personalDetails.lastName}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, lastName: e.target.value })}
                  />
                </div>
                <Input
                  placeholder="Confirm Your Email Address"
                  className="bg-white text-gray-800"
                  value={personalDetails.email}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                />
                <Input
                  placeholder="Enter Your Highest Education Level"
                  className="bg-white text-gray-800"
                  value={personalDetails.educationLevel}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, educationLevel: e.target.value })}
                />
                <Textarea
                  placeholder="Enter Your Short Bio"
                  className="bg-white text-gray-800"
                  value={personalDetails.bio}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, bio: e.target.value })}
                />
              </div>
              <div className="flex justify-center mt-6">
                <Button onClick={handleFinish} className="bg-blue-500 text-white">Finish Setup</Button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex justify-center items-center pt-12 text-gray-800">Personal Career Coach</h2>
                <img src="/images/test.png" alt="Career Coach Illustration" className="mx-auto" />
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-800">Almost there!</p>
                  <p className="text-sm text-gray-600 mt-2">
                    "People work better when they know what the goal is and why. It is important that people look forward to coming to work in the morning and enjoy working"
                  </p>
                  <p className="text-sm text-blue-500">- Elon Musk</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[1200px] h-[95vh] p-0 overflow-hidden backdrop-blur-sm bg-blue-100 bg-opacity-60">
        <div className="relative h-full flex flex-col">
          <div className="p-4 flex items-center justify-center shadow-sm">
            <Button variant="ghost" size="icon" className="absolute left-4" onClick={handleBack}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Setup Your Profile</h1>
          </div>
          <ScrollArea className="flex-grow">
            <div className="p-6">
              {renderStep()}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewProfileSetupPopup