import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import ManageEmployees from './components/ManageEmployees';
import SalaryHistory from './components/SalaryHistory';
import AddSalary from './components/AddSalary';
import ManageDepartments from './components/ManageDepartments';
import LeaveList from './components/LeaveList';
import ChangePassword from './components/ChangePassword';

// User imports
import UserLayout from './components/UserLayout';
import UserDashboard from './components/UserDashboard';
import MyProfile from './components/MyProfile';
import UserLeave from './components/UserLeave';
import UserSalary from './components/UserSalary';

// Simple RBAC router wrapper for demo
const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  
  if (!token) return <Navigate to="/login" replace />;
  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role === 'ROLE_ADMIN' ? '/admin/dashboard' : '/user/dashboard'} replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRole="ROLE_ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="employees" element={<ManageEmployees />} />
          <Route path="salary" element={<SalaryHistory />} />
          <Route path="salary/add" element={<AddSalary />} />
          <Route path="departments" element={<ManageDepartments />} />
          <Route path="leaves" element={<LeaveList />} />
          <Route path="settings" element={<ChangePassword />} />
        </Route>

        {/* User Routes */}
        <Route path="/user" element={
          <ProtectedRoute allowedRole="ROLE_USER">
            <UserLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/user/dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="leaves" element={<UserLeave />} />
          <Route path="salary" element={<UserSalary />} />
          <Route path="settings" element={<ChangePassword />} />
        </Route>

        {/* 404 catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
