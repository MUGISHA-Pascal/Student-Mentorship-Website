/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import DashboardOverview from "../../../components/dashboard/student/dashboardOverview"
import Upcoming from "../../../components/dashboard/student/upcoming";
import StudentGraph from "../../../components/dashboard/student/studentGraph";
import Courses from "../../../components/dashboard/student/courses";

const HomeStudent = () => {
  const [name, setName] = useState("John Doe");
  const [ongoingCourse, setOngoingCourse] = useState("Intermediate Piano Course");
  const [startDate, setStartDate] = useState("4th/September/2024");
  const [currentDate, setCurrentDate] = useState("9th/October/2024");
  const [currentTask, setCurrentTask] = useState("Meeting with the Team");
  const [activities, setActivities] = useState(12);
  const [mentorRate, setMentorRate] = useState(80); // 80% rate
  const [medals, setMedals] = useState(3);
  const [courses, setCourses] = useState(12);

  return (
    <div>
      <DashboardOverview
        name={name}
        ongoingCourse={ongoingCourse}
        startDate={startDate}
        currentDate={currentDate}
        currentTask={currentTask}
        activities={activities}
        mentorRate={mentorRate}
        medals={medals}
        courses={courses}
      />
      <div className="w-full flex flex-col lg:flex-row gap-x-5">
        <div className="lg:w-[65%] w-full">
          <StudentGraph />
        </div>
        <div className="lg:w-[35%] w-full">
          <Upcoming />
        </div>
      </div>
      <Courses />
    </div>
  )
}

export default HomeStudent