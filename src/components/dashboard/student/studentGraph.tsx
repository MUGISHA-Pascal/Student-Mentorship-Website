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
  // Example Data
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Study Hours',
        data: [10, 20, 30, 25, 40, 50],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Assessment Scores',
        data: [60, 65, 70, 68, 80, 90],
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
        display: true,
        text: 'Performance Statistics',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Performance Statistics</h2>
        <select className="border rounded-lg p-2">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div>
        <p className="text-3xl font-bold text-blue-500">5,000.00</p>
        <p className="text-gray-500 mb-4">50 Orders</p>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default StudentGraph;