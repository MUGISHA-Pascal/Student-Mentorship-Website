/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, } from 'lucide-react'
import DashboardMentorOverview from '@/components/dashboard/mentor/dashboardMentorOverview'
import MentorGraph from '@/components/dashboard/mentor/mentorGraph'


interface UpcomingEventProps {
  title: string;
  subtitle: string;
}

const UpcomingEvent: React.FC<UpcomingEventProps> = ({ title, subtitle }) => (
  <Card className="mb-4 bg-card text-card-foreground">
    <CardContent className="flex items-center p-4">
      <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full mr-4">
        <GraduationCap className="h-6 w-6 text-orange-500 dark:text-orange-300" />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </CardContent>
  </Card>
)



export default function HomePage() {

  const [name, setName] = useState("John Doe");
  const [ongoingCourse, setOngoingCourse] = useState("Intermediate Piano Course");
  const [startDate, setStartDate] = useState("4th/September/2024");
  const [currentDate, setCurrentDate] = useState("9th/October/2024");
  const [currentTask, setCurrentTask] = useState("Meeting with the Team");
  const [activities, setActivities] = useState(12);
  const [mentorRate, setMentorRate] = useState(80); // 80% rate
  const [medals, setMedals] = useState(3);
  const [courses, setCourses] = useState(12);

  return (
    <div className="p-6 space-y-6 bg-background text-foreground">
      {/* <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">Good Morning, Dr. Marcus <span className="text-yellow-500">★★★☆☆</span></h2>
          <p className="text-muted-foreground">We are happy that you came back</p>
        </div>
        <Card className="w-64 bg-card text-card-foreground">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">What are you doing Today?</h3>
            <p className="text-orange-500 font-semibold">9th/10/2024</p>
            <div className="flex items-center mt-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Meeting With The Musicians</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card text-card-foreground">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">On-going: Intermediate Piano Course</h3>
          <Progress value={40} className="mb-2" />
          <p className="text-sm text-muted-foreground">Start: 4th/September/2024</p>
        </CardContent>
      </Card> */}

      <DashboardMentorOverview
        name={name}
        ongoingCourse={ongoingCourse}
        startDate={startDate}
        currentDate={currentDate}
        currentTask={currentTask}
        activities={activities}
        mentorRate={mentorRate}
        medals={medals}
        courses={courses}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <MentorGraph />
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Upcoming</CardTitle>
              {/* <Button variant="ghost">Full Calendar</Button> */}
              <a href="/mentor/dashboard/calendar" className="text-blue-500 font-medium">Full Calendar</a>
            </div>
          </CardHeader>
          <CardContent>
            <UpcomingEvent title="Meeting With The Students" subtitle="More Students this year" />
            <UpcomingEvent title="Meeting With The Students" subtitle="More Students this year" />
            <UpcomingEvent title="Meeting With The Students" subtitle="More Students this year" />
            <UpcomingEvent title="Meeting With The Students" subtitle="More Students this year" />
            <UpcomingEvent title="Meeting With The Students" subtitle="More Students this year" />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>What is New?</CardTitle>
            {/* <Button variant="ghost">Full Calendar</Button> */}
            <a href="/mentor/dashboard/calendar" className="text-blue-500 font-medium">Full Calendar</a>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-card text-card-foreground">
                <CardContent className="p-0">
                  <img
                    src="/images/image.png"
                    alt="Event"
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold">Event Title</h4>
                    <p className="text-sm text-muted-foreground">Event description</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}