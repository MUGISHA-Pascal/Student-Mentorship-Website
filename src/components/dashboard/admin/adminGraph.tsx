import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useAdminStatistics } from "@/hooks/admin/home/useHomeData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminGraph: React.FC = () => {
  const { statistics, loading, error } = useAdminStatistics(); // Fetching data using the custom hook
  const [chartType, setChartType] = useState<"Bar" | "Pie">("Bar");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!statistics) return <div>No statistics available</div>;

  const {
    studentCount,
    mentorCount,
    courseCount,
    cohortCount,
    approvedStudents,
    waitlistedStudents,
    approvedMentors,
    waitlistedMentors,
  } = statistics;

  const labels = [
    "Students",
    "Mentors",
    "Courses",
    "Cohorts",
    "Approved Students",
    "Waitlisted Students",
    "Approved Mentors",
    "Waitlisted Mentors",
  ];

  const barData = {
    labels,
    datasets: [
      {
        label: "Admin Statistics",
        data: [
          studentCount,
          mentorCount,
          courseCount,
          cohortCount,
          approvedStudents,
          waitlistedStudents,
          approvedMentors,
          waitlistedMentors,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
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
          mentorCount,
          courseCount,
          cohortCount,
          approvedStudents,
          waitlistedStudents,
          approvedMentors,
          waitlistedMentors,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
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
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Admin Statistics Overview",
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
          text: "Count",
        },
      },
      x: {
        title: {
          display: true,
          text: "Metrics",
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Admin Statistics Distribution",
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Performance Overview</h2>

      <div className="flex justify-end mb-4">
        <select
          className="bg-muted border rounded-lg p-2 cursor-pointer"
          value={chartType}
          onChange={(e) => setChartType(e.target.value as "Bar" | "Pie")}
        >
          <option value="Bar" className="bg-muted-foreground text-muted">Bar</option>
          <option value="Pie" className="bg-muted-foreground text-muted">Pie</option>
        </select>
      </div>

      {chartType === "Bar" ? (
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

export default AdminGraph;
