import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const UpcomingActivities: React.FC = () => {
  return (
    <div className="p-4 space-y-8 mt-5 mb-20">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <ScheduledActivities />
        <Meetings />
      </div>
    </div>
  );
};

// ScheduledActivities Component
const ScheduledActivities: React.FC = () => {
  const activities = [
    { id: 1, title: 'UI/UX Design Course By John Doe', date: '9/17/2024', time: '3:00 pm' },
    { id: 2, title: 'UI/UX Design Course By John Doe', date: '9/17/2024', time: '3:00 pm' },
    { id: 3, title: 'UI/UX Design Course By John Doe', date: '9/17/2024', time: '3:00 pm' },
  ];

  return (
    <div className="flex-1 space-y-4">
      {activities.map(activity => (
        <div key={activity.id} className="flex items-center justify-between p-4 border rounded-md shadow-md">
          <div className="flex items-center space-x-4">
            <div className="text-blue-500">
              <FaCalendarAlt />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{activity.title}</h3>
              <p>{activity.date} - {activity.time}</p>
            </div>
          </div>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md">
            Add To Schedule
          </button>
        </div>
      ))}
    </div>
  );
};

// Meetings Component
const Meetings: React.FC = () => {
  const meetings = [
    { id: 1, title: 'Meeting With Students', status: 'Unavailable' },
  ];

  return (
    <div className="flex-1">
      <h3 className="text-lg font-semibold">Meetings Today</h3>
      <div className="mt-4 space-y-2">
        {meetings.map(meeting => (
          <div key={meeting.id} className="flex items-center justify-between space-x-4 p-4 border rounded-md shadow-md">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-full">
                {meeting.id}
              </div>
              <div>
                <h4 className="text-md">{meeting.title}</h4>
                <p className="text-red-500">{meeting.status}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="px-3 py-1 text-white bg-red-500 rounded-full">Unavailable</div>
              <div className="px-3 py-1 text-white bg-green-500 rounded-full">Available</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingActivities;