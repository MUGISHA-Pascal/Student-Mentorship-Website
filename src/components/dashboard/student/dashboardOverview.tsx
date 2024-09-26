import React from 'react';

interface DashboardOverviewProps {
    name: string;
    ongoingCourse: string;
    startDate: string;
    currentDate: string;
    currentTask: string;
    activities: number;
    mentorRate: number;
    medals: number;
    courses: number;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
    name,
    ongoingCourse,
    startDate,
    currentDate,
    currentTask,
    activities,
    mentorRate,
    medals,
    courses,
}) => {
    const stats = [
        {
            image: '/svgs/activities.svg',
            value: activities,
            color: 'text-orange-500',
            title: 'Activities',
            status: 'Last week',
        },
        {
            image: '/svgs/mentors.svg',
            value: `${mentorRate}%`,
            color: 'text-green-500',
            title: 'Mentor-rate',
            status: 'Last week',
        },
        {
            image: '/svgs/medal.svg',
            value: medals,
            color: 'text-red-500',
            title: 'Medals',
            status: 'Corrected',
        },
        {
            image: '/svgs/courses.svg',
            value: courses,
            color: 'text-orange-500',
            title: 'Courses',
            status: 'Provided',
        },
    ]
    return (
        <div className="p-6 bg-white rounded-xl">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-3 justify-between items-start">
                <div>
                    <p className="text-lg text-gray-700">
                        Good Morning, <span className="text-blue-600 font-semibold">{name}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">We are happy that you came back</p>
                    <div className="mt-4">
                        <p className="text-gray-600">
                            On-going: <span className="text-blue-600 font-semibold">{ongoingCourse}</span>
                        </p>
                        <div className="mt-2 flex items-center">
                            <div className="w-32 h-2 bg-gray-300 rounded-full">
                                <div className="w-24 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                            <span className="ml-2 text-gray-500">Progress</span>
                        </div>
                        <p className="text-gray-600 mt-2">
                            Start: <span className="text-blue-600 font-semibold">{startDate}</span>
                        </p>
                    </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg flex">
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
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 lg:gap-[5%] mt-8">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-center gap-x-3 bg-blue-50 px-4 py-8 rounded-lg text-center">
                        <div>
                            <img src={stat.image} alt={stat.title} className="" />
                        </div>
                        <div>
                            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                            <p className="text-blue-600 text-xl font-semibold">{stat.title}</p>
                            <p className="text-sm text-gray-400">{stat.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardOverview;