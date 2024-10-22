import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const StudentGraph: React.FC = () => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Study Hours',
                data: [11, 15, 18, 23, 26, 29, 26, 20, 27, 22, 38, 32, 21, 22]
                ,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                tension: 0.4,
            },
            {
                label: 'Assessment Scores',
                data: [4, 5, 7, 15, 17, 20, 39, 14, 60, 29, 70, 23, 17, 17, 48, 43, 3, 41, 10, 39],
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-6 rounded-lg">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Performance Statistics</h2>
            </div>

            <div className='border shadow-sm px-3 py-6 rounded-xl'>
                <div className='flex justify-between'>
                    <div>
                        <p className="text-3xl font-bold text-blue-500">5,000.00</p>
                        <p className="text-muted-foreground mb-4">50 Orders</p>
                    </div>
                    <div>
                        <select className="dark:bg-transparent dark:text-muted-foreground border rounded-lg p-2 cursor-pointer">
                            <option className="cursor-pointer">This Week</option>
                            <option>Last Week</option>
                            <option>This Month</option>
                        </select>
                    </div>
                </div>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default StudentGraph;