import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import { ReactNode } from 'react';
import Donate from './pages/donate';
import Register from './pages/register';
import Forgot from './pages/forgot';
import Footer from './components/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LayoutCoach from './pages/LayoutCoach'
import HomePage from './pages/Coach/HomePage'
import StudentsPage from './pages/Coach/studentsPage';
import CalendarPage from './pages/Coach/calendarPage ';
import ChatsPage from './pages/Coach/chatsPage';
import DocsPage from './pages/Coach/docsPage';
import SettingsPage from './pages/Coach/settimgsPage';

import LayoutStudent from './pages/LayoutStudent'
import HomePageStudent from './pages/Student/Homepage';
import StudentChatsPage from './pages/Student/studentchatsPage';
import StudentMentorProfil from './pages/Student/studentMentorProfil'
import StudentCalendarPage from './pages/Student/studentCalendarPage '
import StudentDocsPage from './pages/Student/studentDocsPage'
import StudentSettingsPage from './pages/Student/studentSettingsPage'

// import JotFormEmbed from './components/home/formPage'


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

// // Placeholder for authentication check
// const isAuthenticated = () => {
//   // Replace this with your actual authentication check
//   return localStorage.getItem('token') !== null;
// };

/* const PrivateRoute = ({ children }: { children: ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/dashboard" replace />;
}; */

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/members" element={<Members />} />
        <Route path="/login" element={<Layout showNavbar={false} showFooter={false}><Login /></Layout>} />
        <Route path="/register" element={<Layout showNavbar={false} showFooter={false}><Register /></Layout>} />
        {/* <Route path="/form" element={<JotFormEmbed />} /> */}
        <Route path="/forgot" element={<Layout showNavbar={false} showFooter={false}><Forgot /></Layout>} />
        <Route path="/donate" element={<Layout showNavbar={false} showFooter={false}><Donate /></Layout>} />

        {/* Protected dashboard routes */}
        {/* <Route path="/dashboard" element={<PrivateRoute><LayoutCoach /></PrivateRoute>}> */}
          <Route path="/dashboard/coach" element={<LayoutCoach />}>
          <Route index element={<Navigate replace to="/dashboard/coach/home" />} />
          <Route path="home" element={<HomePage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="chats" element={<ChatsPage />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="settings" element={<SettingsPage />} /> 
        </Route>
        
        <Route path="/dashboard/student" element={<LayoutStudent />}>
          <Route index element={<Navigate replace to="/dashboard/student/home" />} />
          <Route path="home" element={<HomePageStudent />} /> 
          <Route path="chat" element={<StudentChatsPage />} /> 
          <Route path="mentor" element={<StudentMentorProfil />} /> 
          <Route path="docs" element={<StudentDocsPage />} />
          <Route path="calendar" element={<StudentCalendarPage />} /> 
          <Route path="settings" element={<StudentSettingsPage />} /> 
           
          
        </Route>


      </Routes>
    </Router>
  )
}

const About = () => <div>About Page</div>;
const Careers = () => <div>Careers Page</div>;
const Members = () => <div>Members Page</div>;

export default App;
