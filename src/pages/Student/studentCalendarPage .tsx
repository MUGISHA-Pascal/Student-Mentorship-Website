import { Calendar as CalendarIcon } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import RecentActivities from '../dashboard/student/recentActivities'
import UpcomingActivities from '@/components/dashboard/student/upcomingActivities'

const UpcomingMeeting = ({ title, date, time }: { title: string; date: string; time: string }) => (
  <Card className="mb-4">
    <CardContent className="flex items-center p-4">
      <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full mr-4">
        <CalendarIcon className="w-6 h-6 text-orange-500 dark:text-orange-300" />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{date}</p>
        <p className="text-sm text-muted-foreground">{time}</p>
      </div>
    </CardContent>
  </Card>
)

export default function StudentCalendarPage() {
  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-2 gap-x-5 items-center">
        <div className="bg-blue-50 dark:bg-transparent dark:border px-3 py-6 rounded-lg flex">
          <div>
            <img src='/svgs/calendarDashboard.svg' alt="Calendar Illustration" className="" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-muted-foreground">What are you doing Today?</p>
            <p className="text-blue-600 font-semibold mt-2">10/22/2024</p>
            <p className="mt-2 text-green-600 flex items-center">
              <span className="inline-block w-4 h-4 mr-2 bg-green-500 rounded-full"></span>
              Meeting with students
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
          <UpcomingMeeting title="Meeting With The Mentors" date="9/12/2024" time="3:00 pm" />
          <UpcomingMeeting title="Meeting With The Mentors" date="9/12/2024" time="3:00 pm" />
        </div>
      </div>
      <div className="">
        <RecentActivities />
      </div>
      <div className="">
        <UpcomingActivities />
      </div>
    </div>
  )
}