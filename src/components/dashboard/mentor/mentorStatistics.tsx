import React from 'react';
import { Card, CardContent } from '@/components/ui/card';  // Assuming these are your Card components

const MentorStatistics: React.FC = () => {
    // Initialize the values directly inside the component
    const activities = 15;
    const mentorRate = 90; // percentage
    const medals = 8;
    const courses = 3;

    // Define the stats array with the initialized values
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
            title: 'Student-rate',
            status: 'Last week',
        },
        {
            image: '/svgs/medal.svg',
            value: medals,
            color: 'text-red-500',
            title: 'Students',
            status: 'Coached',
        },
        {
            image: '/svgs/courses.svg',
            value: courses,
            color: 'text-orange-500',
            title: 'Courses',
            status: 'Provided',
        },
    ];

    return (
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 lg:gap-[5%]">
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
        </div>
    );
};

export default MentorStatistics;
