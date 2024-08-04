// import React, { ReactNode } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/home';
// import About from './pages/about';
// import Contact from './pages/contact';
// import Login from './pages/login';
// import Register from './pages/register';
// import Navbar from './components/navbar';
// import Join from './pages/join';
// import Footer from './components/footer';
// import Welcome from './pages/welcome';
// import Blog from './pages/blog';
// import './App.css';
// import Forgot from './pages/forgot';


// interface LayoutProps {
//   children: ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   return (
//     <div>
//       <Navbar />
//       {children}
//       <Footer />
//     </div>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//         <Route path="welcome" element={<Welcome />} />
//         <Route path="forgot" element={<Forgot />} />
//         <Route
//           path="*"
//           element={
//             <Layout>
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="about" element={<About />} />
//                 <Route path="contact" element={<Contact />} />
//                 <Route path="join" element={<Join />} />
//                 <Route path="blog" element={<Blog />} />
//               </Routes>
//             </Layout>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React, { Suspense, lazy, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './App.css';
import { Digital } from "react-activity";
import "react-activity/dist/library.css";

// Lazy load pages
const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
const Contact = lazy(() => import('./pages/contact'));
const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));
const Join = lazy(() => import('./pages/join'));
const Welcome = lazy(() => import('./pages/welcome'));
const Blog = lazy(() => import('./pages/blog'));
const Forgot = lazy(() => import('./pages/forgot'));

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div
            className="text-center mt-4 h-screen w-full flex items-center justify-center"
          >
            <Digital size={60} speed={0.6} />
          </div>
        }
      >
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="forgot" element={<Forgot />} />
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="join" element={<Join />} />
                  <Route path="blog" element={<Blog />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
