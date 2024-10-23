import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import React from 'react';
import MentorStatistics from './mentorStatistics';

interface DashboardMentorOverviewProps {
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

// interface Stat {
//     image: string;
//     value: string | number;
//     color: string;
//     title: string;
//     status: string;
// }

const DashboardMentorOverview: React.FC<DashboardMentorOverviewProps> = ({
    name,
    ongoingCourse,
    startDate,
    currentDate,
    currentTask
}) => {

    return (
        <div className="p-6 rounded-xl">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-3 justify-between items-start">
                <div>
                    <div>
                        <h1 className="text-3xl font-bold">Good Morning, {name}</h1>
                        <p className="text-muted-foreground">We are happy that you came back</p>
                    </div>
                    <Card className='mt-8 w-full lg:w-4/5'>
                        <CardContent className="py-6 px-3">
                            <h3 className="font-semibold mb-2">On-going: <span className="text-blue-600 font-semibold">{ongoingCourse}</span></h3>
                            <Progress value={40} className="mb-2" />
                            <p className="text-sm text-muted-foreground">Start: <span className="font-semibold">{startDate}</span></p>
                        </CardContent>
                    </Card>
                </div>
                <div className="bg-blue-50 dark:bg-transparent dark:border px-3 py-6 rounded-lg flex">
                    <div>
                        <img src='/svgs/calendarDashboard.svg' alt="Calendar Illustration" className="" />
                    </div>
                    <div>
                        <p className="text-2xl font-semibold text-muted-foreground">What are you doing Today?</p>
                        <p className="text-blue-600 font-semibold mt-2">{currentDate}</p>
                        <p className="mt-2 text-green-600 flex items-center">

                            <span className="inline-block w-4 h-4 mr-2 bg-green-500 rounded-full"></span>
                            {currentTask}
                        </p>
                    </div>
                </div>
            </div>
            {/* <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 lg:gap-[5%] mt-10">
                {stats.map((stat, index) => (
                    <Card key={index} className="flex items-center justify-center px-8 py-4 gap-x-3 rounded-lg text-center">
                        <CardContent className="flex items-center p-6">
                            <div>
                                <img src={stat.image} alt={stat.title} className="" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-orange-500">{stat.value}</div>
                                <div className="text-sm font-medium">{stat.title}</div>
                                <div className="text-xs text-muted-foreground">{stat.status}</div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div> */}
            <div className="mt-10">
                <MentorStatistics />
            </div>
        </div>
    );
};

export default DashboardMentorOverview;