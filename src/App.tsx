import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import { ReactNode, useEffect } from 'react';
import Donate from './pages/donate';
import Register from './pages/register';
import Forgot from './pages/forgot';
import Footer from './components/footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './pages/dashboard/admin';
import StudentDashboard from './pages/dashboard/student';
import MentorDashboard from './pages/dashboard/mentor';
import EmployerDashboard from './pages/dashboard/employer';
import FamilyDashboard from './pages/dashboard/family';
import { useAuthStore } from './store/authStore';
import HomeStudent from './pages/dashboard/student/homeStudent';
import MentorStudent from './pages/dashboard/student/mentorStudent';
import CalendarStudent from './pages/dashboard/student/calendarStudent';
import ChatStudent from './pages/dashboard/student/chatStudent';
import DocsStudent from './pages/dashboard/student/docsStudent';
import ParentStudent from './pages/dashboard/student/ParentStudent';
import SettingsStudent from './pages/dashboard/student/settingsStudent';
import ProfileStudent from './pages/dashboard/student/profileStudent';

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNavbar = true, showFooter = true }) => {
  return (
    <div className='overflow-x-hidden'>
      {showNavbar && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </div>
  );
};

const ProtectedRoute = ({ element }: { element: ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
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
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout showNavbar={false} showFooter={false}><Login /></Layout>} />
        <Route path="/register" element={<Layout showNavbar={false} showFooter={false}><Register /></Layout>} />
        <Route path="/forgot" element={<Layout showNavbar={false} showFooter={false}><Forgot /></Layout>} />
        <Route path="/donate" element={<Layout showNavbar={false} showFooter={false}><Donate /></Layout>} />

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
      </Routes>
    </Router>
  );
};

export default App;