import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Route path="/forgot" element={<Layout showNavbar={false} showFooter={false}><Forgot /></Layout>} />
        <Route path="/donate" element={<Layout showNavbar={false} showFooter={false}><Donate /></Layout>} />
      </Routes>
    </Router>
  );
};

const About = () => <div>About Page</div>;
const Careers = () => <div>Careers Page</div>;
const Members = () => <div>Members Page</div>;

export default App;
