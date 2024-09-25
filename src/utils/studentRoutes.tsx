import { FaHome, FaStickyNote, FaTasks, FaFlag, FaCalendarAlt, FaLifeRing, FaCogs } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";

export const studentRoutes = [
  {
    label: "Home",
    route: "/student/dashboard/",
    icon: <FaHome size={20} />,
  },
  {
    label: "Mentor",
    route: "/student/dashboard/mentor",
    icon: <AiFillDashboard size={20} />,
  },
  {
    label: "Calendar",
    route: "/student/dashboard/calendar",
    icon: <FaCalendarAlt size={20} />,
  },
  {
    label: "Chats",
    route: "/student/dashboard/chats",
    icon: <FaTasks size={20} />,
  },
  {
    label: "Docs",
    route: "/student/dashboard/docs",
    icon: <FaStickyNote size={20} />,
  },
  {
    label: "Parent",
    route: "/student/dashboard/parent",
    icon: <FaFlag size={20} />,
  },
  {
    label: "Settings",
    route: "/student/dashboard/settings",
    icon: <FaCogs size={20} />,
  },
  {
    label: "Profile",
    route: "/student/dashboard/profile",
    icon: <FaLifeRing size={20} />,
  },
];