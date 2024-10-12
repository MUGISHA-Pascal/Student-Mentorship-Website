import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import { ReactNode } from "react";
import Donate from "./pages/donate";
import Register from "./pages/register";
import Forgot from "./pages/forgot";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoachHome from "./pages/coach";

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showNavbar = true,
  showFooter = true,
}) => {
  return (
    <div className="overflow-x-hidden">
      {showNavbar && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </div>
  );
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
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/members" element={<Members />} />
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
          path="/coach"
          element={
            <AppLayout>
              <CoachHome />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

const About = () => <div>About Page</div>;
const Careers = () => <div>Careers Page</div>;
const Members = () => <div>Members Page</div>;

export default App;
