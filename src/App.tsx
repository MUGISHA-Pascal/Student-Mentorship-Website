/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { ReactNode, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuthStore } from './store/authStore';

import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Donate from "./pages/donate";
import Register from "./pages/register";
import Forgot from "./pages/forgot";
import Footer from "./components/footer";
import CoachHome from "./pages/coach";
import AdminDashboard from './pages/dashboard/admin';
import StudentDashboard from './pages/dashboard/student';
import MentorDashboard from './pages/dashboard/mentor';
import EmployerDashboard from './pages/dashboard/employer';
import FamilyDashboard from './pages/dashboard/family';
import HomeStudent from './pages/dashboard/student/homeStudent';
import MentorStudent from './pages/dashboard/student/mentorStudent';
import CalendarStudent from './pages/dashboard/student/calendarStudent';
import ChatStudent from './pages/dashboard/student/chatStudent';
import DocsStudent from './pages/dashboard/student/docsStudent';
import SettingsStudent from './pages/dashboard/student/settingsStudent';
import ProfileStudent from './pages/dashboard/student/profileStudent';
import ParentStudent from './pages/dashboard/student/parentStudent';
import LayoutCoach from './pages/LayoutCoach'
import LayoutStudent from './pages/LayoutStudent'
import HomePageStudent from './pages/Student/Homepage';
import StudentChatsPage from './pages/Student/studentchatsPage';
import StudentMentorProfil from './pages/Student/studentMentorProfil'
import StudentCalendarPage from './pages/Student/studentCalendarPage '
import StudentDocsPage from './pages/Student/studentDocsPage'
import StudentSettingsPage from './pages/Student/studentSettingsPage'
import HomePage from "./pages/coach/HomePage";
import StudentsPage from "./pages/coach/studentsPage";
import CalendarPage from "./pages/coach/calendarPage ";
import ChatsPage from "./pages/coach/chatsPage";
import DocsPage from "./pages/coach/docsPage";
import SettingsPage from "./pages/coach/settimgsPage";
// import JotFormEmbed from './components/home/formPage'

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}

interface DarkModeContextType {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

// Provide a default value when creating the context
const DarkModeContext = React.createContext<DarkModeContextType | undefined>(undefined);

const Layout: React.FC<LayoutProps> = ({
  children,
  showNavbar = true,
  showFooter = true,
}) => {
  const [dark, setDark] = useState(false);
  return (
    <DarkModeContext.Provider value={{ dark, setDark }}>
      <div className={`${dark ? 'dark' : ''} overflow-x-hidden`}>
        {showNavbar && <Navbar />}
        {children}
        {showFooter && <Footer />}
      </div>
    </DarkModeContext.Provider>
  );
};


const ProtectedRoute = ({ element }: { element: ReactNode }) => {
  const isAuthenticated = useAuthStore((state: { isAuthenticated: any; }) => state.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to access that page!', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  }, [isAuthenticated]);
  return isAuthenticated ? element : <Navigate to="/login" />;
};
const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-screen h-screen overflow-hidden">
      <section className="w-full h-full flex">
        <aside className="w-64 h-full bg-sky-100"></aside>
        <aside className="w-full flex flex-col h-full">
          <header className="w-full h-10 bg-rose-200">s</header>
          <section className="flex p-2 min-h-full w-full overflow-y-auto">
            {children}
          </section>
        </aside>
      </section>
    </main>
  );
};
const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout showNavbar={false} showFooter={false}>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout showNavbar={false} showFooter={false}>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/forgot"
          element={
            <Layout showNavbar={false} showFooter={false}>
              <Forgot />
            </Layout>
          }
        />
        <Route
          path="/donate"
          element={
            <Layout showNavbar={false} showFooter={false}>
              <Donate />
            </Layout>
          }
        />
        <Route
          path="/mentor/dash"
          element={
            <AppLayout>
              <CoachHome />
            </AppLayout>
          }
        />

        <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/student/dashboard" element={<ProtectedRoute element={<StudentDashboard />} />} >
          <Route path="/student/dashboard" element={<HomeStudent />} />
          <Route path="/student/dashboard/mentor" element={<MentorStudent />} />
          <Route path="/student/dashboard/calendar" element={<CalendarStudent />} />
          <Route path="/student/dashboard/chats" element={<ChatStudent />} />
          <Route path="/student/dashboard/docs" element={<DocsStudent />} />
          <Route path="/student/dashboard/parent" element={<ParentStudent />} />
          <Route path="/student/dashboard/settings" element={<SettingsStudent />} />
          <Route path="/student/dashboard/profile" element={<ProfileStudent />} />
        </Route>
        <Route path="/mentor/dashboard" element={<ProtectedRoute element={<MentorDashboard />} />} />
        <Route path="/employer/dashboard" element={<ProtectedRoute element={<EmployerDashboard />} />} />
        <Route path="/family/dashboard" element={<ProtectedRoute element={<FamilyDashboard />} />} />
        <Route path="/dashboard/student" element={<LayoutStudent />}>
          <Route index element={<Navigate replace to="/dashboard/student/home" />} />
          <Route path="home" element={<HomePageStudent />} />
          <Route path="chat" element={<StudentChatsPage />} />
          <Route path="mentor" element={<StudentMentorProfil />} />
          <Route path="docs" element={<StudentDocsPage />} />
          <Route path="calendar" element={<StudentCalendarPage />} />
          <Route path="settings" element={<StudentSettingsPage />} />
        </Route>
        <Route path="/dashboard/coach" element={<LayoutCoach />}>
          <Route index element={<Navigate replace to="/dashboard/coach/home" />} />
          <Route path="home" element={<HomePage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="chats" element={<ChatsPage />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        {/* <Route path="/form" element={<JotFormEmbed />} /> */}
      </Routes>
    </Router>
  );
};

export default App;