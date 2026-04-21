import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  CalendarDays, 
  Banknote, 
  Settings 
} from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Employees', path: '/admin/employees', icon: <Users size={20} /> },
    { name: 'Departments', path: '/admin/departments', icon: <Building2 size={20} /> },
    { name: 'Leaves', path: '/admin/leaves', icon: <CalendarDays size={20} /> },
    { name: 'Salary', path: '/admin/salary', icon: <Banknote size={20} /> },
    { name: 'Setting', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      {/* Top Header */}
      <header className="bg-indigo-600 text-white flex items-center justify-between px-6 py-3 shrink-0">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Employee MS</h1>
          <span className="text-sm hidden sm:block">Welcome, Admin</span>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-1.5 rounded-lg text-sm transition"
        >
          Logout
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1e293b] text-slate-300 flex flex-col shrink-0">
          <nav className="flex-1 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname.includes(item.path);
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-6 py-3 text-sm transition-colors ${
                        isActive 
                          ? 'bg-indigo-600 text-white border-l-4 border-indigo-400' 
                          : 'hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Ownership */}
          <div className="px-6 py-4 border-t border-slate-700">
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              Built by{' '}
              <span className="text-indigo-400 font-semibold">MD EZAJ</span>
            </p>
          </div>
        </aside>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
