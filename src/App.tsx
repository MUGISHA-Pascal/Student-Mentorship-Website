/* eslint-disable @typescript-eslint/no-unused-vars */
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
import AdminDashboard from './pages/dashboard/admin';
import EmployerDashboard from './pages/dashboard/employer';
import FamilyDashboard from './pages/dashboard/family';
import LayoutCoach from './pages/LayoutCoach'
import LayoutStudent from './pages/LayoutStudent'
import HomePageStudent from './pages/Student/Homepage';
import StudentChatsPage from './pages/Student/studentchatsPage';
import StudentMentorProfil from './pages/Student/studentMentorProfil'
import StudentCalendarPage from './pages/Student/studentCalendarPage '
import StudentDocsPage from './pages/Student/studentDocsPage'
import StudentSettingsPage from './pages/Student/studentSettingsPage'
import HomePage from "./pages/Coach/HomePage";
import StudentsPage from "./pages/Coach/studentsPage";
import CalendarPage from "./pages/Coach/calendarPage ";
import ChatsPage from "./pages/Coach/chatsPage";
import DocsPage from "./pages/Coach/docsPage";
import SettingsPage from "./pages/Coach/settimgsPage";
import MeetingPage from "./pages/Meeting/MeetingView";
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
  console.log('isAuthenticated:', isAuthenticated);
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


const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/login"
          element={
            <Layout showNavbar={false} showFooter={false}>
              <Login />
            </Layout>
          }
        />
        <Route path="/register"
          element={
            <Layout showNavbar={false} showFooter={false}>
              <Register />
            </Layout>
          }
        />
        <Route path="/forgot"
          element={
            <Layout showNavbar={false} showFooter={false}>
              <Forgot />
            </Layout>
          }
        />
        <Route path="/donate"
          element={
            <Layout showNavbar={false} showFooter={false}>
              <Donate />
            </Layout>
          }
        />

        <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/employer/dashboard" element={<ProtectedRoute element={<EmployerDashboard />} />} />
        <Route path="/family/dashboard" element={<ProtectedRoute element={<FamilyDashboard />} />} />


        <Route path="/student/dashboard" element={<ProtectedRoute element={<LayoutStudent />} />}>
          <Route index element={<HomePageStudent />} />
          <Route path="chat" element={<StudentChatsPage />} />
          <Route path="mentor" element={<StudentMentorProfil />} />
          <Route path="docs" element={<StudentDocsPage />} />
          <Route path="calendar" element={<StudentCalendarPage />} />
          <Route path="settings" element={<StudentSettingsPage />} />
        </Route>


        <Route path="/mentor/dashboard" element={<ProtectedRoute element={<LayoutCoach />} />}>
          <Route index element={<HomePage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="chats" element={<ChatsPage />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        {/* <Route path="/form" element={<JotFormEmbed />} /> */}
        <Route path="/meeting" element={<ProtectedRoute element={<MeetingPage />} />} />
      </Routes>
    </Router>
  );
};

export default App;