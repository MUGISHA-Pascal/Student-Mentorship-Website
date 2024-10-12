import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Plus, Video, BellDot, Home, Users, Calendar, MessageSquare, FileText, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import React from 'react';
import ProfileSetupPopup from './coach-profil';

function Sidebar({ activeSection, onSectionChange }: { activeSection: string; onSectionChange: (section: string) => void }) {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4 flex flex-col">
      <div className="flex items-center mb-8">
      <img src="/icons/logo.svg" alt="GOYA Logo" className="w-10 h-10 mr-2" />
        <span className="text-2xl font-bold text-blue-600">GOYA</span>
      </div>
      <nav className="space-y-2 flex-grow">
        <SidebarLink icon={<Home />} label="Home" isActive={activeSection === '/dashboard/home'} onClick={() => onSectionChange('/dashboard/home')} to="/dashboard/home" />
        <SidebarLink icon={<Users />} label="Students" isActive={activeSection === '/dashboard/students'} onClick={() => onSectionChange('/dashboard/students')} to="/dashboard/students" />
        <SidebarLink icon={<Calendar />} label="Calendar" isActive={activeSection === '/dashboard/calendar'} onClick={() => onSectionChange('/dashboard/calendar')} to="/dashboard/calendar" />
        <SidebarLink icon={<MessageSquare />} label="Chats" isActive={activeSection === '/dashboard/chats'} onClick={() => onSectionChange('/dashboard/chats')} to="/dashboard/chats" badge="2" />
        <SidebarLink icon={<FileText />} label="Docs" isActive={activeSection === '/dashboard/docs'} onClick={() => onSectionChange('/dashboard/docs')} to="/dashboard/docs" />
      </nav>
      <SidebarLink icon={<Settings />} label="Settings" isActive={activeSection === '/dashboard/settings'} onClick={() => onSectionChange('/dashboard/settings')} to="/dashboard/settings" />
    </div>
  )
}

function SidebarLink({ icon, label, to, isActive, badge, onClick }: { icon: React.ReactNode; label: string; badge?: string; to: string; isActive: boolean; onClick: () => void }) {
  return (
    
    <Link to={to} onClick={onClick} className={`flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-200 cursor-pointer'}`}>
      {icon}
      <span>{label}</span>
      <a
        href="#"
        className={`flex items-center space-x-3 p-2 rounded-lg ${
          isActive
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        {badge && (
          <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </a>
    </Link>
    
          
 /*    OG FUNTION
 function SidebarLink({ icon, label, to, isActive, onClick }: { icon: React.ReactNode; label: string; to: string; isActive: boolean; onClick: () => void }) {
  return (
    <Link to={to} onClick={onClick} className={`flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-200 cursor-pointer'}`}>
    {icon}
    <span>{label}</span>
  </Link> */
  );
}


function Header({ title }: { title: string }) {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center space-x-4">
          {/* Record Button */}
          <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow" >
              <Video className="w-6 h-6  text-red-500 dark:text-gray-400" />
            </button>
        {/* Action Button */}
        <Button variant="outline" className="text-white bg-blue-400 rounded-lg" >
        <Plus />New Action</Button>
        {/* Alerts Button */}
        <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow" >
              <BellDot className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
        
          {/* Add sun/moon icon here */}
        
        {/* <div className="w-10 h-10 rounded-full bg-gray-300"></div> */}
        {/* Profil Avatar */}
        <img src="/svgs/avatar1.svg" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </header>
  )
}


/*   const getTitle = (path: string) => {
    switch (path) {
      case '/':
        return 'Home'
      case '/students':
        return 'Students'
      case '/calendar':
        return 'Calendar'
      case '/chats':
        return 'Chats'
      case '/docs':
        return 'Docs'
      case '/settings':
        return 'Settings'
      default:
        return 'GOYA'
    }
  } */

    const LayoutCoach = () => {
      const location = useLocation();
      const [activeSection, setActiveSection] = useState(location.pathname);
      // const [darkMode, setDarkMode] = useState(false);
      const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(true); // Ensure this is true initially

      // const toggleDarkMode = () => setDarkMode(!darkMode);

      // Use useEffect to set isProfileSetupOpen to true when the component mounts
      React.useEffect(() => {
        setIsProfileSetupOpen(true); // Show the popup on initial load
      }, []);

      /* Handles Pages Tittle Changes */
    const titles: { [key: string]: string } = {
      '/dashboard': 'Dashboard',
      '/dashboard/home': 'Mentor',
      '/dashboard/students': 'Your Students',
      '/dashboard/calendar': 'Your Calendar',
      '/dashboard/chats': 'Chats',
      '/dashboard/docs': 'Your Documents',
      '/dashboard/settings': 'Your Profil',
    }
    const getTitle = (path: string) => {
      return titles[path as keyof typeof titles] || 'Dashboard'
    }

  
  return (
    <div className="flex h-screen bg-white">
     <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getTitle(activeSection)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <Outlet />  {/* This is where the nested routes will render */}
        </main>
        <ProfileSetupPopup isOpen={isProfileSetupOpen} onClose={() => setIsProfileSetupOpen(false)} />
      </div>
    </div>
  )
}

<ProfileSetupPopup isOpen={false} onClose={function (): void {
  throw new Error('Function not implemented.');
} } />

export default LayoutCoach