import { Calendar as CalendarIcon } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import RecentMentorActivities from '../dashboard/mentor/recentMentorActivities'
import UpcomingMentorActivities from '../dashboard/mentor/upcomingMentorActivities'

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

export default function CalendarPage() {
  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TodayCard />
          <div>
          <div className="flex flex-col">
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
              <h2 className="text-xl font-semibold mb-">Upcoming Activities</h2>
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
      </div> */}
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
        <RecentMentorActivities />
      </div>
      <div className="">
        <UpcomingMentorActivities />
      </div>
    </div>
  )
}