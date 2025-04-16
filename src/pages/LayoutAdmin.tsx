/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Video, BellDot, Home, Users, Calendar, MessageSquare, Plus, FileText } from 'lucide-react'
import axios from 'axios'
import DarkModeToggle from './DarkModeToggle'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { initializeMeetingClient } from './Meeting/meetingProvider'
import { StreamVideoClient } from '@stream-io/video-react-sdk';
import { useUserStore } from '@/store/userStore'

const Sidebar = ({ expanded, setExpanded, activeSection, onSectionChange }: { expanded: boolean; setExpanded: (expanded: boolean) => void; activeSection: string; onSectionChange: (section: string) => void }) => {

  const handleResize = useCallback(() => {
    if (window.innerWidth > 468 && window.innerWidth < 1024) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [setExpanded]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

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
        <SidebarLink icon={<Home />} label="Home" isActive={activeSection === '/admin/dashboard'} onClick={() => onSectionChange('/admin/dashboard')} to="/admin/dashboard" expanded={expanded} />
        <SidebarLink icon={<Users />} label="Students" isActive={activeSection === '/admin/dashboard/students'} onClick={() => onSectionChange('/admin/dashboard/students')} to="/admin/dashboard/students" expanded={expanded} />
        <SidebarLink icon={<Users />} label="Mentors" isActive={activeSection === '/admin/dashboard/mentors'} onClick={() => onSectionChange('/admin/dashboard/mentors')} to="/admin/dashboard/mentors" expanded={expanded} />
        <SidebarLink icon={<FileText />} label="Blogs" isActive={activeSection.startsWith('/admin/dashboard/blogs')} onClick={() => onSectionChange('/admin/dashboard/blogs')} to="/admin/dashboard/blogs" expanded={expanded} />
        <SidebarLink icon={<Calendar />} label="Calendar" isActive={activeSection === '/admin/dashboard/calendar'} onClick={() => onSectionChange('/admin/dashboard/calendar')} to="/admin/dashboard/calendar" expanded={expanded} />
        <SidebarLink icon={<Users />} label="Assessments" isActive={activeSection === '/admin/dashboard/assessments'} onClick={() => onSectionChange('/admin/dashboard/assessments')} to="/admin/dashboard/assessments" expanded={expanded} />
        <SidebarLink icon={<MessageSquare />} label="Chats" isActive={activeSection === '/admin/dashboard/chats'} onClick={() => onSectionChange('/admin/dashboard/chats')} to="/admin/dashboard/chats" expanded={expanded} />
      </nav>
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
  const [
    // client
    , setClient] = useState<StreamVideoClient | null>(null);
  const [
    // call
    , setCall] = useState<unknown>(null);
  const navigate = useNavigate();
  const { user } = useUserStore();
  const handleCreateInstantMeeting = async () => {

    try {
      const clientInstance = await initializeMeetingClient();
      const callInstance = clientInstance.call('default', user?.id || 'default-call-id');

      await callInstance.join({ create: true });

      // Set Stream video client and call to state
      setClient(clientInstance);
      setCall(callInstance);

      // Optionally navigate to the meeting page (if required)
      navigate(`/meeting/${callInstance.id}`);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };
  return (
    <header className="flex justify-between items-center p-4 border-b border-border bg-background">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center space-x-4">
        <Dialog>
          <DialogTrigger asChild>
            <button className="p-2 bg-background rounded-full shadow-sm border border-border">
              <Video className="w-6 h-6 text-destructive" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start a Meeting</DialogTitle>
              <DialogDescription>Select an option to proceed:</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Button
                onClick={() => {
                  // Logic for creating a meeting for later
                }}
                className="w-full"
              >
                Create a Meeting for Later
              </Button>
              <Button
                onClick={handleCreateInstantMeeting}
                className="w-full"
              >
                Create an Instant Meeting
              </Button>
              <Button
                onClick={() => {
                  // Logic for scheduling a meeting
                }}
                className="w-full"
              >
                Schedule for Later
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button variant="default" className="text-primary-foreground bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />New Action
        </Button>
        <button className="p-2 bg-background rounded-full shadow-sm border border-border">
          <BellDot className="w-6 h-6 text-foreground" />
        </button>
        <DarkModeToggle />
        <img src="/svgs/avatar1.svg" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </header>
  )
}

export default function LayoutAdmin() {
  const [expanded, setExpanded] = useState(true);
  const [
    // isProfileSetupOpen
    , setIsProfileSetupOpen] = useState(true);
  const location = useLocation();



  const onSectionChange = () => {
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Token not found');
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
    '/dashboard': 'Dashboard',
    '/admin/dashboard': 'Admin',
    '/admin/dashboard/students': 'Students',
    '/admin/dashboard/mentors': 'Mentors',
    '/admin/dashboard/calendar': 'Calendar',
    '/admin/dashboard/blogs': 'Blogs',
    '/admin/dashboard/blogs/new': 'Create New Blog',
    '/admin/dashboard/assessments': 'Assessments',
    '/admin/dashboard/chats': 'Chats',
    '/admin/dashboard/docs': 'Documents',
    '/admin/dashboard/settings': 'Your Profile',
  }
  const getTitle = (path: string) => {
    if (location.pathname.startsWith('/admin/dashboard/blogs/edit')) {
      return 'Edit A Blog';
    }
    return titles[path as keyof typeof titles] || 'Dashboard'
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar
        expanded={expanded}
        setExpanded={setExpanded}
        activeSection={location.pathname}
        onSectionChange={onSectionChange}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getTitle(location.pathname)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background md:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}