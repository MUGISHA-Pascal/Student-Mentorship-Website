import React from 'react';
import AdminStatistics from './adminStatistics';

interface DashboardAdminOverviewProps {
    name: string;
    currentDate: string;
    currentTask: string;
}

const DashboardAdminOverview: React.FC<DashboardAdminOverviewProps> = ({
    name,
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
            <div className="mt-10">
                <AdminStatistics />
            </div>
        </div>
    );
};

export default DashboardAdminOverview;