/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Video, BellDot, Home, Users, Calendar, MessageSquare, FileText } from 'lucide-react'
import axios from 'axios'
import StudentProfilSetup from './Student/StudentProfilSetup'
import DarkModeToggle from './DarkModeToggle'
import NewMeetingDialog from '@/components/dashboard/meeting/newMeetingDialog'

const Sidebar = ({ expanded, setExpanded, activeSection, onSectionChange }: { expanded: boolean; setExpanded: (expanded: boolean) => void; activeSection: string; onSectionChange: (section: string) => void }) => {

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setExpanded(false);
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`bg-background border-r border-border h-screen p-4 flex flex-col ${expanded ? 'w-64' : 'w-20'} transition-all duration-300`}>
      <div className="flex items-center mb-8 justify-between">
        <div className="flex items-center">
          <img src="/icons/logo.svg" alt="GOYA Logo" className="w-10 h-10 mr-2" />
          {expanded && <span className="text-2xl font-bold text-primary">GOYA</span>}
        </div>
        {/* <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)}>
          {expanded ? <PanelRightOpen className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button> */}
      </div>
      <nav className="space-y-2 flex-grow">
        <SidebarLink icon={<Home />} label="Home" isActive={activeSection === '/student/dashboard'} onClick={() => onSectionChange('/student/dashboard')} to="/student/dashboard" expanded={expanded} />
        <SidebarLink icon={<Users />} label="Mentor" isActive={activeSection === '/student/dashboard/mentor'} onClick={() => onSectionChange('/student/dashboard/mentor')} to="/student/dashboard/mentor" expanded={expanded} />
        <SidebarLink icon={<Calendar />} label="Calendar" isActive={activeSection === '/student/dashboard/calendar'} onClick={() => onSectionChange('/student/dashboard/calendar')} to="/student/dashboard/calendar" expanded={expanded} />
        <SidebarLink icon={<Video />} label="Meetings" isActive={activeSection === '/student/dashboard/meetings'} onClick={() => onSectionChange('/student/dashboard/meetings')} to="/student/dashboard/meetings" expanded={expanded} />
        <SidebarLink icon={<MessageSquare />} label="Chats" isActive={activeSection === '/student/dashboard/chat'} onClick={() => onSectionChange('/student/dashboard/chat')} to="/student/dashboard/chat" badge="2" expanded={expanded} />
        <SidebarLink icon={<FileText />} label="Docs" isActive={activeSection === '/student/dashboard/docs'} onClick={() => onSectionChange('/student/dashboard/docs')} to="/student/dashboard/docs" expanded={expanded} />
        {/* <SidebarLink icon={<FileText />} label="Parent" isActive={activeSection === '/dashboard/docs'} onClick={() => onSectionChange('/dashboard/docs')} to="/dashboard/docs" expanded={expanded} /> */}
      </nav>
      {/* <SidebarLink icon={<Settings />} label="Settings" isActive={activeSection === '/dashboard/settings'} onClick={() => onSectionChange('/student/dashboard/settings')} to="/student/dashboard/settings" expanded={expanded} /> */}
    </div>
  )
}

function SidebarLink({ icon, label, to, isActive, badge, onClick, expanded }: { icon: React.ReactNode; label: string; badge?: string; to: string; isActive: boolean; onClick: () => void; expanded: boolean }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative flex items-center space-x-2 p-2 rounded-lg group ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent'} ${expanded ? 'justify-start' : 'justify-center'}`}
    >
      <div className={`flex items-center ${expanded ? 'mr-2' : 'mx-auto'}`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      </div>
      {expanded && <span>{label}</span>}
      {!expanded && (
        <div
          className={`absolute left-full -top-10 group-hover:top-2 rounded-md px-2 py-1 ml-6 bg-primary/10 text-primary text-sm invisible opacity-0 -translate-x-3 transition-all duration-800 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {label}
        </div>
      )}
      {expanded && badge && (
        <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-medium px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}

function Header({ title }: { title: string }) {
  const [isMeetingDialogOpen, setIsMeetingDialogOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center p-4 border-b border-border bg-background">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center space-x-4">
        {/* <button
          title='meeting'
          className="p-2 bg-background rounded-full shadow-sm border border-border"
          onClick={() => {
            navigate('/meeting')
          }}
        >
          <Video className="w-6 h-6 text-destructive" />
        </button> */}
        <NewMeetingDialog
          trigger={
            <button
              onClick={() => setIsMeetingDialogOpen(true)}
              className="p-2 bg-background rounded-full shadow-sm border border-border"
            >
              <Video className="w-6 h-6 text-destructive" />
            </button>
          }
        />
        {/* <Button variant="default" className="text-primary-foreground bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />New Action
        </Button> */}
        <button
          title='Notifications'
          className="p-2 bg-background rounded-full shadow-sm border border-border"
        >
          <BellDot className="w-6 h-6 text-foreground" />
        </button>
        <DarkModeToggle />
        <img src="/svgs/avatar1.svg" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </header>
  )
}

export default function LayoutStudent() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(true);

  const onSectionChange = (section: string) => {
    // Handle section change logic here
    console.log('Section changed:', section);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Ensure the token is stored in localStorage
        if (!token) throw new Error('Token not found');
        // console.log("The token is ", token);


        const response = await axios.get('http://localhost:3000/api/v1/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { filledProfile } = response.data.user;

        setIsProfileSetupOpen(!filledProfile)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const titles: { [key: string]: string } = {
    '/student/dashboard': 'Student',
    '/student/dashboard/home': 'Student',
    '/student/dashboard/mentor': 'Your Mentor',
    '/student/dashboard/calendar': 'Your Calendar',
    '/student/dashboard/chat': 'Chats',
    '/student/dashboard/docs': 'Your Documents',
    '/student/dashboard/meetings': 'Your Meetings',
    '/student/dashboard/settings': 'Your Profile',
  }
  const getTitle = (path: string) => {
    return titles[path as keyof typeof titles] || 'Dashboard'
  }

  const isInMeeting = location.pathname.includes('/meeting/');

  return (
    <div className="flex h-screen bg-background text-foreground">
      {!isInMeeting && (
        <Sidebar
          expanded={expanded}
          setExpanded={setExpanded}
          activeSection={location.pathname}
          onSectionChange={onSectionChange}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        {!isInMeeting && <Header title={getTitle(location.pathname)} />}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4">
          <Outlet />
        </main>
        {isProfileSetupOpen && (
          <StudentProfilSetup isOpen={isProfileSetupOpen} onClose={() => setIsProfileSetupOpen(false)} />
        )}
      </div>
    </div>
  )
}