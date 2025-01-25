// import { Calendar as CalendarIcon } from 'lucide-react'
// import { Card, CardContent } from "@/components/ui/card"
import RecentMentorActivities from '../dashboard/mentor/recentMentorActivities'
import UpcomingMentorActivities from '../dashboard/mentor/upcomingMentorActivities'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/store/userStore'
import { useCoachActivities } from '@/hooks/coach/home/useHomeData'
import { UpcomingEvent } from './HomePage'

// const UpcomingMeeting = ({ title, date, time }: { title: string; date: string; time: string }) => (
//   <Card className="mb-4">
//     <CardContent className="flex items-center p-4">
//       <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full mr-4">
//         <CalendarIcon className="w-6 h-6 text-orange-500 dark:text-orange-300" />
//       </div>
//       <div>
//         <h3 className="font-semibold">{title}</h3>
//         <p className="text-sm text-muted-foreground">{date}</p>
//         <p className="text-sm text-muted-foreground">{time}</p>
//       </div>
//     </CardContent>
//   </Card>
// )

export default function CalendarPage() {
  const { role, fetchUser } = useUserStore();
  const [coachId, setCoachId] = useState<string>('');
  const [currentDate] = useState(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  });

  useEffect(() => {
    const loadUser = async () => {
      if (!role) {
        await fetchUser();
      }
      if (role) {
        setCoachId(role.id);
      }
    };

    const timeout = setTimeout(loadUser, 1000);

    return () => clearTimeout(timeout);
  }, [fetchUser, role]);

  const { ongoingCourses, groupedActivities } = useCoachActivities(coachId);

  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-2 gap-x-5 items-center">
        <div className="bg-blue-50 dark:bg-transparent dark:border px-3 py-6 rounded-lg flex">
          <div>
            <img src='/svgs/calendarDashboard.svg' alt="Calendar Illustration" className="" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-muted-foreground">What are you doing Today?</p>
            <p className="text-blue-600 font-semibold mt-2">{currentDate}</p>
            <p className="mt-2 text-green-600 flex items-center">
              <span className="inline-block w-4 h-4 mr-2 bg-green-500 rounded-full"></span>
              {/* {todayActivities.length > 0 ? todayActivities[0].name : "No task scheduled today"} */}
              {ongoingCourses.length > 0 ? ongoingCourses[0].name : "No ongoing course"}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          {/* <UpcomingMeeting title="Meeting With The Mentors" date="9/12/2024" time="3:00 pm" />
          <UpcomingMeeting title="Meeting With The Mentors" date="9/12/2024" time="3:00 pm" /> */}
          {groupedActivities.upcoming.length > 0 ? (
            groupedActivities.upcoming.slice(0, 2).map((activity) => (
              <UpcomingEvent
                key={activity.id}
                title={activity.name}
                subtitle={`Scheduled on ${new Date(activity.date).toLocaleDateString()}`}
              />
            ))
          ) : (
            <p>No upcoming activities</p>
          )}

        </div>
      </div>
      <div className="">
        <RecentMentorActivities coachId={coachId} />
      </div>
      <div className="">
        <UpcomingMentorActivities />
      </div>
    </div>
  )
}