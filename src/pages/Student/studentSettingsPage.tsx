/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Star, MoreVertical} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type UserInfo = {
  name: string
  email: string
  tel: string
  courses: string[]
  introVideoUrl: string
}

type CoachInfo = {
  name: string
  avatar: string
  rating: number
  reviewCount: number
  originalPrice: number
  discountedPrice: number
  bio: string
  experience: { title: string; period: string }[]
}

type Review = {
  id: string
  author: string
  avatar: string
  rating: number
  content: string
  date: string
}

type UserProfileProps = {
  userInfo: UserInfo
  coachInfo: CoachInfo
  reviews: Review[]
  onSaveBio: (bio: string) => void
}

const UserProfile: React.FC<UserProfileProps> = ({ userInfo, coachInfo, reviews, onSaveBio }) => {
  const [bio, setBio] = useState(coachInfo.bio)
  const [isEditingBio, setIsEditingBio] = useState(false)

  const handleSaveBio = () => {
    onSaveBio(bio)
    setIsEditingBio(false)
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <div className="p-6">
            <img src="/images/profil1.png" alt="Profile" className="w-full h-auto rounded-t-lg" />
          </div>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <span className="font-semibold">Name</span>
              <span className="col-span-2 text-blue-600">{userInfo.name}</span>
              <span className="font-semibold">Email</span>
              <span className="col-span-2 text-blue-600">{userInfo.email}</span>
              <span className="font-semibold">Tel</span>
              <span className="col-span-2 text-blue-600">{userInfo.tel}</span>
              <span className="font-semibold">Courses</span>
              <span className="col-span-2 text-blue-600">{userInfo.courses.join(', ')}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Intro video</CardTitle>
          <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
        </CardHeader>
        <CardContent className="p-0">
          <video 
            className="w-full h-auto rounded-b-lg" 
            autoPlay 
            loop 
            muted 
            playsInline
            controls
          >
            <source src={userInfo.introVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={coachInfo.avatar} alt={coachInfo.name} />
                <AvatarFallback>{coachInfo.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{coachInfo.name}</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < coachInfo.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">({coachInfo.reviewCount} Reviews)</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm line-through text-gray-500">${coachInfo.originalPrice}/month</p>
              <p className="text-lg font-semibold text-green-600">${coachInfo.discountedPrice}/month</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">About Coach</h4>
              <p className="text-sm text-gray-600">{coachInfo.bio}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Experience Timeline</h4>
              <ul className="space-y-2">
                {coachInfo.experience.map((exp, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium">{exp.title}</p>
                      <p className="text-xs text-gray-500">{exp.period}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Button variant="default">Select</Button>
            <Button variant="outline">Contact</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={review.avatar} alt={review.author} />
                <AvatarFallback>{review.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{review.author}</h4>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{review.content}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Here is Your Bio</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsEditingBio(!isEditingBio)}>
            {isEditingBio ? 'Cancel' : 'Edit'}
          </Button>
        </CardHeader>
        <CardContent>
          {isEditingBio ? (
            <div className="space-y-4">
              <textarea
                className="w-full h-32 p-2 border rounded-md"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <Button onClick={handleSaveBio}>Save changes</Button>
            </div>
          ) : (
            <p className="text-sm text-gray-600">{bio}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function StudentSettingsPage() {
  // Sample data - in a real application, this would come from your backend
  const userInfo: UserInfo = {
    name: "John Doe",
    email: "john@example.com",
    tel: "+250 786 564 924",
    courses: ["Music and Song Production", "Arts and Fashion Design"],
    introVideoUrl: "/videos/video.mp4", // Replace with actual intro video URL
  }

  const coachInfo: CoachInfo = {
    name: "Dr. Jane",
    avatar: "https://i.pravatar.cc/150?img=3?height=40&width=40",
    rating: 4,
    reviewCount: 42,
    originalPrice: 67,
    discountedPrice: 40,
    bio: "Bio info about the coach on his background and also some experience info to give the student and more about info, about info can be added to make the student interested in the coach",
    experience: [
      { title: "Musician Manager At Hope Music", period: "2018 - 2024" },
      { title: "Musician Manager At Hope Music", period: "2018 - 2024" },
      { title: "Musician Manager At Hope Music", period: "2018 - 2024" },
      { title: "Musician Manager At Hope Music", period: "2018 - 2024" },
    ],
  }

  const reviews: Review[] = [
    {
      id: "1",
      author: "Jabari Banks",
      avatar: "https://i.pravatar.cc/150?img=6?height=40&width=40",
      rating: 3,
      content: "I loved how caring she is! It's really amazing👍",
      date: "5 Days ago",
    },
    // Add more reviews as needed
  ]

  const handleSaveBio = (newBio: string) => {
    // In a real application, you would send this to your backend
    // console.log("Saving new bio:", newBio)
  }

  return <UserProfile userInfo={userInfo} coachInfo={coachInfo} reviews={reviews} onSaveBio={handleSaveBio} />
}