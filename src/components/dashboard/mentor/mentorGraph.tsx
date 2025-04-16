import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

interface MentorGraphProps {
    statistics: {
        studentCount: number;
        courseCount: number;
        completedActivities: number;
        ongoingActivities: number;
        upcomingActivities: number;
    };
}

const MentorGraph: React.FC<MentorGraphProps> = ({ statistics }) => {
    const { studentCount, courseCount, completedActivities, ongoingActivities, upcomingActivities } = statistics;

    const [chartType, setChartType] = useState<'Bar' | 'Pie'>('Bar');

    const labels = [
        'Student Count',
        'Course Count',
        'Completed Activities',
        'Ongoing Activities',
        'Upcoming Activities',
    ];

    const totalActivities = completedActivities + ongoingActivities + upcomingActivities;

    const barData = {
        labels,
        datasets: [
            {
                label: 'Mentor Statistics',
                data: [
                    studentCount,
                    courseCount,
                    completedActivities,
                    ongoingActivities,
                    upcomingActivities,
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                ],
                borderColor: [
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels,
        datasets: [
            {
                data: [
                    studentCount,
                    courseCount,
                    completedActivities,
                    ongoingActivities,
                    upcomingActivities,
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                ],
                borderColor: [
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Mentor Activities Overview',
                font: {
                    size: 18,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Count',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Metrics',
                },
            },
        },
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Mentor Statistics Distribution',
                font: {
                    size: 18,
                },
            },
        },
    };

    return (
        <div className="p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                    <p className="text-lg font-semibold">Total Activities</p>
                    <p className="text-3xl font-bold text-blue-500">{totalActivities}</p>
                </div>
            </div>

            <div className="flex justify-end mb-4">
                <select
                    className="bg-muted border rounded-lg p-2 cursor-pointer"
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value as 'Bar' | 'Pie')}
                >
                    <option value="Bar" className="bg-muted-foreground text-muted">Bar</option>
                    <option value="Pie" className="bg-muted-foreground text-muted">Pie</option>
                </select>
            </div>

            {chartType === 'Bar' ? (
                <div className="h-[400px]">
                    <Bar data={barData} options={barOptions} />
                </div>
            ) : (
                <div className="h-[400px]">
                    <Pie data={pieData} options={pieOptions} />
                </div>
            )}
        </div>
    );
};

export default MentorGraph;
