import { Outlet } from "react-router-dom";
import { ReactNode } from 'react';
import Sidebar, { SidebarItem } from "../../../components/dashboard/sidebar";
import { studentRoutes } from "../../../utils/studentRoutes";

interface LayoutProps {
  children: ReactNode;
}

const StudentDashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar>
        {studentRoutes.map((route) => (
          <SidebarItem key={route.route} icon={route.icon} text={route.label} linkTo={route.route} />
        ))}
      </Sidebar>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

const StudentDashboard = () => {
  return (
    <StudentDashboardLayout>
      <Outlet />
    </StudentDashboardLayout>
  );
};

export default StudentDashboard;