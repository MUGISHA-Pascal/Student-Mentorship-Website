import { Calendar as CalendarIcon, Clock, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const TodayCard = () => (
  <Card className="bg-blue-50 mb-6">
    <CardContent className="flex flex-col sm:flex-row items-center p-4 sm:p-6">
      <div className="mb-4 sm:mb-0 sm:mr-6">
        <img src="/svgs/calendar.svg?height=100&width=100" alt="Calendar illustration" className="w-20 h-20 sm:w-24 sm:h-24" />
      </div>
      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">What are you doing Today?</h2>
        <p className="text-lg font-semibold text-blue-600 mb-2">9th/10/2024</p>
        <div className="flex justify-center sm:justify-start">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Meeting With The Musicians
          </Badge>
        </div>
      </div>
    </CardContent>
  </Card>
)

const UpcomingMeeting = ({ title, date, time }: { title: string; date: string; time: string }) => (
  <Card className="mb-4">
    <CardContent className="flex items-center p-4">
      <div className="bg-orange-100 p-3 rounded-full mr-4">
        <CalendarIcon className="w-6 h-6 text-orange-500" />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </CardContent>
  </Card>
)

const RecentActivity = ({ title, date }: { title: string; date: string }) => (
  <div className="flex items-center justify-between py-2 border-b">
    <div className="flex items-center">
      <input type="checkbox" className="mr-2" />
      <span className="text-sm sm:text-base">{title}</span>
    </div>
    <div className="flex items-center">
      <span className="text-xs sm:text-sm text-gray-500 mr-2">{date}</span>
      <Button variant="ghost" size="sm" className="text-red-500">
        -
      </Button>
    </div>
  </div>
)

const UpcomingActivity = ({ title, date, time }: { title: string; date: string; time: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b">
    <div className="mb-2 sm:mb-0">
      <h4 className="font-semibold">{title}</h4>
      <div className="flex items-center text-sm text-gray-500">
        <CalendarIcon className="w-4 h-4 mr-1" />
        <span>{date}</span>
        <Clock className="w-4 h-4 ml-2 mr-1" />
        <span>{time}</span>
      </div>
    </div>
    <Button className="w-full sm:w-auto mt-2 sm:mt-0">Add To Schedule</Button>
  </div>
)

const StudentAvailability = ({ name, status }: { name: string; status: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b">
    <div className="flex items-center mb-2 sm:mb-0">
      <Badge variant={status === 'Available' ? 'default' : status === 'Unavailable' ? 'destructive' : 'outline'} className="mr-2" />
      <span>{name}</span>
    </div>
    <div className="flex flex-col sm:flex-row sm:space-x-2">
      <Button variant="outline" className="mb-2 sm:mb-0">Message</Button>
      <Button>Accept</Button>
    </div>
  </div>
)

const CalendarView = () => {
  const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
  const dates = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Sep 2022</h3>
          <div className="flex">
            <Button variant="ghost" size="sm"><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map(day => (
            <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-500">{day}</div>
          ))}
          {dates.map(date => (
            <Button key={date} variant={date === 25 ? 'default' : 'ghost'} className="w-full text-xs sm:text-sm p-1 sm:p-2">
              {date}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function CalendarPage() {
  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TodayCard />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Recent Activities</h3>
                    <Button variant="link">Clear All</Button>
                  </div>
                  <RecentActivity title="Visit At The Piano school" date="9/16/2024" />
                  <RecentActivity title="Visit At The Piano school" date="9/16/2024" />
                  <RecentActivity title="Visit At The Piano school" date="9/16/2024" />
                  <RecentActivity title="Visit At The Piano school" date="9/16/2024" />
                </CardContent>
              </Card>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Upcoming Activities</h2>
              <Card>
                <CardContent className="p-4">
                  <UpcomingActivity title="UI/UX Design Course By John Doe" date="9/17/2024" time="3:00 pm" />
                  <UpcomingActivity title="UI/UX Design Course By John Doe" date="9/17/2024" time="3:00 pm" />
                  <UpcomingActivity title="UI/UX Design Course By John Doe" date="9/17/2024" time="3:00 pm" />
                  <div className="mt-4">
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" /> Add Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
          <UpcomingMeeting title="Meeting With The Students" date="9/12/2024" time="3:00 pm" />
          <UpcomingMeeting title="Meeting With The Students" date="9/12/2024" time="3:00 pm" />
          <UpcomingMeeting title="Meeting With The Students" date="9/12/2024" time="3:00 pm" />
          <CalendarView />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Students Availability</h2>
        <Card>
          <CardContent className="p-4">
            <StudentAvailability name="Meeting With Students" status="Unavailable" />
            <StudentAvailability name="Meeting With Students" status="Available" />
            <StudentAvailability name="Meeting With Students" status="Excused" />
            <StudentAvailability name="Meeting With Students" status="Unavailable" />
            <StudentAvailability name="Meeting With Students" status="Available" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
