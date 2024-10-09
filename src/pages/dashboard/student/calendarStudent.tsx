import { useEffect, useState } from "react";
import RecentActivities from "./recentActivities";
import UpcomingActivities from "../../../components/dashboard/student/upcomingActivities";

interface Event {
  title: string;
  subtitle: string;
}

const CalendarStudent = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);
  const events: Event[] = [
    { title: 'Meeting With The Students', subtitle: 'More Students this year' },
    { title: 'Meeting With The Students', subtitle: 'More Students this year' },
    { title: 'Meeting With The Students', subtitle: 'More Students this year' },
  ];

  const currentTask = "Meeting with the students"
  return (
    <div>
      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-4/5 h-4/5 bg-blue-50 p-4 rounded-lg flex">
            <div>
              <img src='/svgs/calendarDashboard.svg' alt="Calendar Illustration" className="" />
            </div>
            <div>
              <p className="text-gray-700">What are you doing Today?</p>
              <p className="text-blue-600 font-semibold mt-2">{currentDate}</p>
              <p className="mt-2 text-green-600 flex items-center">

                <span className="inline-block w-4 h-4 mr-2 bg-green-500 rounded-full"></span>
                {currentTask}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="p-6 w-full">
            <div className="space-y-4 flex flex-col items-center justify-center">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="w-4/5 flex items-center justify-between bg-white py-3 px-14 shadow-md border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img src="/svgs/upcoming.svg" alt="event icon" className="" />
                    <div>
                      <p className="font-semibold text-gray-700">{event.title}</p>
                      <p className="text-sm text-gray-400">{event.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <RecentActivities />
      <UpcomingActivities />
    </div>
  )
}

export default CalendarStudent