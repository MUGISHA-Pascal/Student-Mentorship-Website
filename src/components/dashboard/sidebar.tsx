/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaEllipsisV } from "react-icons/fa";
import logo from "/icons/logo.svg";
import profile from "/images/testimonial.png";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarContextType {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  const handleResize = () => {
    if (window.innerWidth < 768) {
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
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <aside className="h-screen dark:bg-black">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <div className="flex justify-center items-center gap-x-2">
              <img
                src={logo}
                className={`overflow-hidden transition-all ${expanded ? "w-12" : "w-10"}`}
              />
              <p className={`text-2xl font-bold text-blue-600 ${expanded ? "block" : "hidden"}`}>GOYA</p>
            </div>
            {/* <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 hidden lg:block"
            >
              {expanded ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
            </button> */}
          </div>

          {/* <SidebarContext.Provider value={{ expanded }}> */}
          <ul className="flex-1 px-3">{children}</ul>
          {/* </SidebarContext.Provider> */}

          <div className="border-t flex p-3">
            <img src={profile} className="w-10 h-10 rounded-md" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">constGenius</h4>
                <span className="text-xs text-gray-600">constgenius@gmail.com</span>
              </div>
              <FaEllipsisV size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </SidebarContext.Provider>
  );
};

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  linkTo: string;
  active?: boolean;
  alert?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, linkTo, active, alert }) => {
  const { expanded } = useContext(SidebarContext)!;
  const location = useLocation(); 
  const isActive = location.pathname === linkTo;
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${isActive ? "bg-gradient-to-tr from-blue-200 to-indigo-100 text-blue-800" : "hover:bg-blue-50 text-gray-600"
        }`}
    >
      <Link to={linkTo} className="flex items-center w-full">
        {icon}
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
      </Link>
      {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}></div>}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default Sidebar;