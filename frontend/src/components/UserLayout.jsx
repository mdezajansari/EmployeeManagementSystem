import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, Calendar, DollarSign, Settings } from 'lucide-react';

const UserLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white flex flex-col h-full shadow-lg z-10">
        <div className="h-16 flex items-center justify-center border-b border-slate-700 bg-indigo-600">
          <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Employee MS</h2>
        </div>
        
        <nav className="flex-1 py-6 space-y-2">
          <NavLink to="/user/dashboard" className={({ isActive }) => `flex items-center px-6 py-3 transition-colors ${isActive ? 'bg-indigo-600 text-white border-l-4 border-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
            <LayoutDashboard size={20} className="mr-4" />
            <span className="font-medium">Dashboard</span>
          </NavLink>
          
          <NavLink to="/user/profile" className={({ isActive }) => `flex items-center px-6 py-3 transition-colors ${isActive ? 'bg-indigo-600 text-white border-l-4 border-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
            <User size={20} className="mr-4" />
            <span className="font-medium">My Profile</span>
          </NavLink>
          
          <NavLink to="/user/leaves" className={({ isActive }) => `flex items-center px-6 py-3 transition-colors ${isActive ? 'bg-indigo-600 text-white border-l-4 border-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
            <Calendar size={20} className="mr-4" />
            <span className="font-medium">Leave</span>
          </NavLink>
          
          <NavLink to="/user/salary" className={({ isActive }) => `flex items-center px-6 py-3 transition-colors ${isActive ? 'bg-indigo-600 text-white border-l-4 border-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
            <DollarSign size={20} className="mr-4" />
            <span className="font-medium">Salary</span>
          </NavLink>
          
          <NavLink to="/user/settings" className={({ isActive }) => `flex items-center px-6 py-3 transition-colors ${isActive ? 'bg-indigo-600 text-white border-l-4 border-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
            <Settings size={20} className="mr-4" />
            <span className="font-medium">Setting</span>
          </NavLink>
        </nav>

        {/* Ownership */}
        <div className="px-6 py-4 border-t border-slate-700">
          <p className="text-xs text-slate-500 text-center leading-relaxed">
            Built by{' '}
            <span className="text-indigo-400 font-semibold">MD EZAJ</span>
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-indigo-600 shadow-sm flex items-center justify-between px-8 z-0">
          <div className="text-white font-medium">Welcome, Employee</div>
          <button 
            onClick={handleLogout}
            className="bg-slate-800 text-white px-5 py-1.5 rounded-lg text-sm hover:bg-slate-700 transition"
          >
            Logout
          </button>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
