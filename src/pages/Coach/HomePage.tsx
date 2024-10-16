import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ClipboardList, Users, GraduationCap, BookOpen, Plus } from 'lucide-react'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  subtitle: string;
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

const performanceData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 40 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 50 },
  { name: 'May', value: 55 },
  { name: 'Jun', value: 60 },
  { name: 'Jul', value: 65 },
  { name: 'Aug', value: 70 },
  { name: 'Sep', value: 75 },
  { name: 'Oct', value: 80 },
  { name: 'Nov', value: 85 },
  { name: 'Dec', value: 90 },
]

export default function HomePage() {
  return (
    <div className="p-6 space-y-6 bg-background text-foreground">
      <div className="flex justify-between items-start">
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
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<ClipboardList className="h-6 w-6 text-primary" />} value="12" label="Activities" subtitle="Last week" />
        <StatCard icon={<Users className="h-6 w-6 text-green-500" />} value="80%" label="Mentor-rate" subtitle="Last week" />
        <StatCard icon={<GraduationCap className="h-6 w-6 text-red-500" />} value="3" label="Students" subtitle="Coached" />
        <StatCard icon={<BookOpen className="h-6 w-6 text-orange-500" />} value="12" label="Courses" subtitle="Provided" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Performance Statistics</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Upcoming</CardTitle>
              <Button variant="ghost">Full Calendar</Button>
            </div>
          </CardHeader>
          <CardContent>
            <UpcomingEvent title="Meeting With The Students" subtitle="More Students this year" />
            <UpcomingEvent title="Meeting With The Students" subtitle="More Students this year" />
            <UpcomingEvent title="Meeting With The Students" subtitle="More Students this year" />
            <UpcomingEvent title="Meeting With The Students" subtitle="More Students this year" />
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>What is New?</CardTitle>
            <Button variant="ghost">Full Calendar</Button>
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