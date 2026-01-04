import React, { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  LogOut,
  UserCircle,
  Menu,
  X,
  BookAIcon,
  Backpack,
  HomeIcon,
} from "lucide-react";

import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loader from "../Components/Loader/Loader";
import { Link, NavLink, useOutlet } from "react-router";
import DashMessage from "./DashMessage";

// Mock Data for Chart

const Dashboard = () => {
  const { user, signOutUser } = useAuth();
  const [role, isRoleLoading] = useRole();
  const outlet = useOutlet();

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isRoleLoading) return <Loader />;

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* --- SIDEBAR --- */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 text-white transition-all duration-300 flex flex-col`}
      >
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/dashboard/statictis">
            {({ isActive }) => (
              <NavItem
                icon={<LayoutDashboard size={20} />}
                label="Statictis"
                isOpen={isSidebarOpen}
                active={isActive}
              />
            )}
          </NavLink>

          <NavLink to="/dashboard/users">
            {({ isActive }) => (
              <NavItem
                icon={<Users size={20} />}
                label="Users"
                isOpen={isSidebarOpen}
                active={isActive}
              />
            )}
          </NavLink>

          {role === "admin" && (
            <NavLink to="/dashboard/mybooks">
              {({ isActive }) => (
                <NavItem
                  icon={<BookAIcon size={20} />}
                  label="My Books"
                  isOpen={isSidebarOpen}
                  active={isActive}
                />
              )}
            </NavLink>
          )}

          <Link to={`/`}>
            <NavItem
              icon={<HomeIcon size={20} />}
              label="Home"
              isOpen={isSidebarOpen}
            />
          </Link>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-40">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-4">
            {/* Profile Dropdown Container */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full transition border border-transparent active:border-gray-200"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="h-8 w-8 rounded-full border shadow-sm"
                  />
                ) : (
                  <UserCircle size={32} className="text-gray-400" />
                )}
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 w-52 bg-white border border-gray-100 shadow-2xl rounded-xl py-2 mt-2 z-50 animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-3 border-b bg-gray-50/30">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {user?.displayName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to={`/dashboard/myprofile`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition"
                    >
                      Profile
                    </Link>
                    <Link
                      to={`/dashboard`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition"
                    >
                      Dashboard Home
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={signOutUser}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium transition"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-gray-50/50">
          {outlet || <DashMessage></DashMessage>}
        </main>
      </div>
    </div>
  );
};

// --- Helper Components ---
const NavItem = ({ icon, label, active = false, isOpen }) => (
  <div
    className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
      active
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
        : "hover:bg-slate-800 text-slate-400 hover:text-white"
    }`}
  >
    {icon}
    {isOpen && <span className="font-medium">{label}</span>}
  </div>
);

export default Dashboard;
