/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, BookOpen, Users, Download } from 'lucide-react'
import CoachIntro from '@/components/dashboard/student/coachIntro'
import MentorExperience from '@/components/dashboard/student/mentorExperience'
import Reviews from '@/components/dashboard/student/reviews'
import coachImage from "/images/mentor_profile.png";

export default function StudentMentorProfil() {
  const [newReview, setNewReview] = useState('')

  interface StatCardProps {
    icon: React.ReactNode;
    value: string | number;
    label: string;
    subtitle: string;
  }
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))
  }
  const StatCard: React.FC<StatCardProps> = ({ icon, value, label, subtitle }) => (
    <Card className="bg-card text-card-foreground">
      <CardContent className="flex items-center p-6">
        <div className="mr-4 p-3 bg-primary/10 rounded-full">{icon}</div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm font-medium text-muted-foreground">{label}</div>
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        </div>
      </CardContent>
    </Card>
  )

  const renderExperienceTimeline = () => {
    const experiences = [
      { title: 'Musician Manager At Hope Music', period: '2018 - 2024' },
      { title: 'Musician Manager At Hope Music', period: '2018 - 2024' },
      { title: 'Musician Manager At Hope Music', period: '2018 - 2024' },
      { title: 'Musician Manager At Hope Music', period: '2018 - 2024' },
      { title: 'Musician Manager At Hope Music', period: '2018 - 2024' },
      { title: 'Musician Manager At Hope Music', period: '2018 - 2024' },
    ]

    return experiences.map((exp, index) => (
      <div key={index} className="flex items-center mb-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          {index + 1}
        </div>
        <div>
          <h4 className="font-semibold">{exp.title}</h4>
          <p className="text-sm text-gray-500">{exp.period}</p>
        </div>
      </div>
    ))
  }

  const renderReviews = () => {
    const reviews = [
      { name: 'John Doe', date: '2 days ago', content: 'I was really impressed by this mentor due how caring he is', rating: 3 },
      { name: 'John Doe', date: '2 days ago', content: 'I was really impressed by this mentor due how caring he is', rating: 3 },
      { name: 'John Doe', date: '2 days ago', content: 'I was really impressed by this mentor due how caring he is', rating: 3 },
      { name: 'John Doe', date: '2 days ago', content: 'I was really impressed by this mentor due how caring he is', rating: 3 },
      { name: 'John Doe', date: '2 days ago', content: 'I was really impressed by this mentor due how caring he is', rating: 3 },
    ]

    return reviews.map((review, index) => (
      <Card key={index} className="mb-4">
        <CardContent className="pt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">{review.name}</h4>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <p className="text-sm mb-2">{review.content}</p>
          <div className="flex">{renderStars(review.rating)}</div>
        </CardContent>
      </Card>
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <img src="/images/profil1.png?height=300&width=300" alt="Dr. Marcus" className="w-full h-auto rounded-lg mb-4" />
              <h2 className="text-2xl font-bold mb-2">Dr. Marcus</h2>
              <div className="flex items-center mb-4">
                {renderStars(3)}
                <span className="ml-2 text-sm text-blue-600">31 Reviews</span>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Full Name:</strong> Dr. John Doe</p>
                <p><strong>Phone Number:</strong> +250 780 000 000</p>
                <p><strong>Specialisation:</strong> Experience</p>
              </div>
              <p className="mt-4 text-sm">Bio info about the coach on his background and also some expreince info to give the student and more about info. about info can be added to make the student interested in the coach</p>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Experience Timeline</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </div>
              {renderExperienceTimeline()}
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
            <StatCard icon={<BookOpen className="h-6 w-6 text-orange-500" />} value="12" label="Courses" subtitle="Provided" />
            </Card>
            <Card>
            <StatCard icon={<Users className="h-6 w-6 text-green-500" />} value="80%" label="Mentor-rate" subtitle="Last week" />
            </Card>          
          </div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">31 Reviews</h3>
              <div className="mb-4">
                <Textarea
                  placeholder="Add a review"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="w-full mb-2"
                />
                <div className="flex justify-between items-center">
                  <div className="flex">
                    {renderStars(0)}
                  </div>
                  <Button>Post</Button>
                </div>
              </div>
              {renderReviews()}
              <Button variant="outline" className="w-full mt-4">Hide All</Button>
            </CardContent>
          </Card>
        </div>
      </div> */}
      <CoachIntro
        image={coachImage}
        name="Dr. Marcus"
        fullName="Dr. John Doe"
        phoneNumber="+250 780 000 000"
        specialization="IT Monetization"
        bio="Bio info about the coach on his background and also some experience info to give the student more interest."
        reviews={31}
      />
      <MentorExperience />
      <Reviews />
    </div>
  )
}