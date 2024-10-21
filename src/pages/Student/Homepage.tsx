import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Users, Award, BookOpen, ChevronRight, Plus } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const performanceData = [
  { name: 'Jan', Content: 20, "Content ": 30 },
  { name: 'Feb', Content: 30, "Content ": 40 },
  { name: 'Mar', Content: 40, "Content ": 45 },
  { name: 'Apr', Content: 20, "Content ": 25 },
  { name: 'May', Content: 30, "Content ": 30 },
  { name: 'Jun', Content: 40, "Content ": 40 },
]

export default function HomePageStudent() {
  return (
    <div className="p-6 space-y-6 bg-background text-foreground">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
        <div>
          <h1 className="text-3xl font-bold">Good Morning, John Doe</h1>
          <p className="text-muted-foreground">We are happy that you came back</p>
        </div>
        <Card className="w-full lg:w-auto mt-4 lg:mt-0">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">What are you doing Today?</h3>
            <p className="text-orange-500 font-semibold">9th/10/2024</p>
            <div className="flex items-center mt-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Meeting with the Team</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">On-going: Intermediate Piano Course</h3>
          <Progress value={40} className="mb-2" />
          <p className="text-sm text-muted-foreground">Start: 4th/September/2024</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <ClipboardList className="h-8 w-8 text-orange-500 mr-4" />
            <div>
              <div className="text-2xl font-bold text-orange-500">12</div>
              <div className="text-sm font-medium">Activities</div>
              <div className="text-xs text-muted-foreground">Last week</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <div className="text-2xl font-bold text-green-500">80%</div>
              <div className="text-sm font-medium">Mentor-rate</div>
              <div className="text-xs text-muted-foreground">Last week</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Award className="h-8 w-8 text-red-500 mr-4" />
            <div>
              <div className="text-2xl font-bold text-red-500">3</div>
              <div className="text-sm font-medium">Medals</div>
              <div className="text-xs text-muted-foreground">Corrected</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <BookOpen className="h-8 w-8 text-blue-500 mr-4" />
            <div>
              <div className="text-2xl font-bold text-blue-500">12</div>
              <div className="text-sm font-medium">Courses</div>
              <div className="text-xs text-muted-foreground">Provided</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Performance Statistics</CardTitle>
            <Button variant="ghost">This Week <ChevronRight className="ml-2 h-4 w-4" /></Button>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={performanceData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Bar dataKey="Content" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                <Bar dataKey="Content " fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary opacity-40" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming</CardTitle>
            <Button variant="ghost">Full Calendar</Button>
          </CardHeader>
          <CardContent>
            {[1, 2, 3, 4].map((_, i) => (
              <Card key={i} className="mb-4">
                <CardContent className="flex items-center p-4">
                  <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full mr-4">
                    <Users className="h-6 w-6 text-orange-500 dark:text-orange-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Meeting With The Students</h3>
                    <p className="text-sm text-muted-foreground">More Students this year</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>What is New?</CardTitle>
          <Button variant="ghost">Full Calendar</Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Available Course For You</CardTitle>
          <Button variant="ghost">Full Calendar</Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-20 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center mb-2">
                  <BookOpen className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
                <span className="text-sm text-center">course_{i}.pdf</span>
                <Badge variant="secondary" className="mt-1">PDF</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}