import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import useAdminStatistics from "@/hooks/admin/home/useHomeData";


const AdminStatistics: React.FC = () => {
  const { statistics, loading, error } = useAdminStatistics();
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const stats = [
    {
      image: "/svgs/courses.svg",
      value: statistics?.studentCount || 0,
      color: "text-blue-500",
      title: "All Students",
      status: "Registered",
    },
    {
      image: "/svgs/mentors.svg",
      value: statistics?.mentorCount || 0,
      color: "text-green-500",
      title: "All Mentors",
      status: "Registered",
    },
    {
      image: "/svgs/courses.svg",
      value: statistics?.courseCount || 0,
      color: "text-orange-500",
      title: "All Courses",
      status: "Offered",
    },
    {
      image: "/svgs/courses.svg",
      value: statistics?.cohortCount || 0,
      color: "text-purple-500",
      title: "All Cohorts",
      status: "Available",
    },
    {
      image: "/svgs/courses.svg",
      value: statistics?.approvedStudents || 0,
      color: "text-green-500",
      title: "Students",
      status: "Approved",
    },
    {
      image: "/svgs/courses.svg",
      value: statistics?.waitlistedStudents || 0,
      color: "text-yellow-500",
      title: "Students",
      status: "Waitlisted",
    },
    {
      image: "/svgs/courses.svg",
      value: statistics?.approvedMentors || 0,
      color: "text-green-500",
      title: "Mentors",
      status: "Approved",
    },
    {
      image: "/svgs/courses.svg",
      value: statistics?.waitlistedMentors || 0,
      color: "text-yellow-500",
      title: "Mentors",
      status: "Waitlisted",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 xl:gap-[5%]">
      {stats.map((stat, index) => (
        <Card key={index} className="flex items-center justify-center px-8 py-4 gap-x-3 rounded-lg text-center">
          <CardContent className="flex gap-2 items-center py-3">
            <div>
              <img src={stat.image} alt={stat.title} />
            </div>
            <div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm font-medium text-nowrap">{stat.title}</div>
              <div className="text-xs text-muted-foreground">{stat.status}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStatistics;
