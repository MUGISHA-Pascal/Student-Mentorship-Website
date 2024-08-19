import React, { Suspense, lazy, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { Digital } from "react-activity";
import "react-activity/dist/library.css";
import Dashboard from './pages/dashboard';

const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
const Contact = lazy(() => import('./pages/contact'));
const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));
const Join = lazy(() => import('./pages/join'));
const Welcome = lazy(() => import('./pages/welcome'));
const Blog = lazy(() => import('./pages/blog'));
const Forgot = lazy(() => import('./pages/forgot'));
const NotFound = lazy(() => import('./pages/notFound'));

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNavbar = true, showFooter = true }) => {
  return (
    <div>
      {showNavbar && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="text-center mt-4 h-screen w-full flex items-center justify-center">
            <Digital size={60} speed={0.6} />
          </div>
        }
      >
        <Routes>
          <Route path="login" element={<Layout showNavbar={false} showFooter={false}><Login /></Layout>} />
          <Route path="register" element={<Layout showNavbar={false} showFooter={false}><Register /></Layout>} />
          <Route path="welcome" element={<Layout showNavbar={false} showFooter={false}><Welcome /></Layout>} />
          <Route path="forgot" element={<Layout showNavbar={false} showFooter={false}><Forgot /></Layout>} />
          <Route path="dashboard" element={<Layout showNavbar={false} showFooter={false} ><Dashboard /></Layout>} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="about" element={<Layout><About /></Layout>} />
          <Route path="contact" element={<Layout><Contact /></Layout>} />
          <Route path="join" element={<Layout><Join /></Layout>} />
          <Route path="blog" element={<Layout><Blog /></Layout>} />
          <Route path="*" element={<Layout showNavbar={false} showFooter={false}><NotFound /></Layout>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
