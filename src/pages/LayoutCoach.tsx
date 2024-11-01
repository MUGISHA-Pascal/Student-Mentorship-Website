import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Video, BellDot, Home, Users, Calendar, MessageSquare, FileText } from 'lucide-react'
import DarkModeToggle from './DarkModeToggle'
import ProfileSetupPopup from './Coach/ProfileSetupPopup'

const Sidebar = ({ expanded, setExpanded, activeSection, onSectionChange }: { expanded: boolean; setExpanded: (expanded: boolean) => void; activeSection: string; onSectionChange: (section: string) => void }) => {

  const handleResize = () => {
    if (window.innerWidth >= 768 && window.innerWidth < 1024) {
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
        <SidebarLink icon={<Home />} label="Home" isActive={activeSection === '/mentor/dashboard'} onClick={() => onSectionChange('/mentor/dashboard')} to="/mentor/dashboard" expanded={expanded} />
        <SidebarLink icon={<Users />} label="Students" isActive={activeSection === '/mentor/dashboard/students'} onClick={() => onSectionChange('/mentor/dashboard/students')} to="/mentor/dashboard/students" expanded={expanded} />
        <SidebarLink icon={<Calendar />} label="Calendar" isActive={activeSection === '/mentor/dashboard/calendar'} onClick={() => onSectionChange('/mentor/dashboard/calendar')} to="/mentor/dashboard/calendar" expanded={expanded} />
        <SidebarLink icon={<MessageSquare />} label="Chats" isActive={activeSection === '/mentor/dashboard/chats'} onClick={() => onSectionChange('/mentor/dashboard/chats')} to="/mentor/dashboard/chats" badge="2" expanded={expanded} />
        <SidebarLink icon={<FileText />} label="Docs" isActive={activeSection === '/mentor/dashboard/docs'} onClick={() => onSectionChange('/mentor/dashboard/docs')} to="/mentor/dashboard/docs" expanded={expanded} />
      </nav>
      {/* <SidebarLink icon={<Settings />} label="Settings" isActive={activeSection === '/mentor/dashboard/settings'} onClick={() => onSectionChange('/dashboard/settings')} to="/mentor/dashboard/settings" expanded={expanded} /> */}
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
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center p-4 border-b border-border bg-background">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-background rounded-full shadow-sm border border-border"
          onClick={() => {
            navigate('/meeting')
          }}
        >
          <Video className="w-6 h-6 text-destructive" />
        </button>
        {/* <Button variant="default" className="text-primary-foreground bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />New Action
        </Button> */}
        <button className="p-2 bg-background rounded-full shadow-sm border border-border">
          <BellDot className="w-6 h-6 text-foreground" />
        </button>
        <DarkModeToggle />
        <img src="/svgs/avatar1.svg" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </header>
  )
}

export default function LayoutCoach() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(true);

  const onSectionChange = (section: string) => {
    // Handle section change logic here
    console.log('Section changed:', section);
  };

  const titles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/mentor/dashboard': 'Mentor',
    '/mentor/dashboard/students': 'Your Students',
    '/mentor/dashboard/calendar': 'Your Calendar',
    '/mentor/dashboard/chats': 'Chats',
    '/mentor/dashboard/docs': 'Your Documents',
    '/mentor/dashboard/settings': 'Your Profile',
  }
  const getTitle = (path: string) => {
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4">
          <Outlet />
        </main>
        <ProfileSetupPopup isOpen={isProfileSetupOpen} onClose={() => setIsProfileSetupOpen(false)} />
      </div>
    </div>
  )
}