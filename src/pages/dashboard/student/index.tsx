import { FaHome, FaStickyNote, FaTasks, FaFlag, FaCalendarAlt, FaLifeRing, FaCogs } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import Sidebar, { SidebarItem } from "../../../components/dashboard/sidebar"
import { Route, Routes } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar>
          <SidebarItem icon={<FaHome size={20} />} text="Home" linkTo="/home" alert />
          <SidebarItem icon={<AiFillDashboard size={20} />} text="Mentor" linkTo="/mentor" />
          <SidebarItem icon={<FaCalendarAlt size={20} />} text="Calendar" linkTo="/calendar" />
          <SidebarItem icon={<FaTasks size={20} />} text="Chats" linkTo="/chats" />
          <SidebarItem icon={<FaStickyNote size={20} />} text="Docs" linkTo="/docs" />
          <SidebarItem icon={<FaFlag size={20} />} text="Parent" linkTo="/parent" />
          <SidebarItem icon={<FaCogs size={20} />} text="Settings" linkTo="/settings" />
          <SidebarItem icon={<FaLifeRing size={20} />} text="Profile" linkTo="/profile" />
        </Sidebar>
        <main className="flex-1">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/mentor" element={<Mentor />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/parent" element={<Parent />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
      <div>
        Component
      </div>
    </div>
  )
}

export default StudentDashboard