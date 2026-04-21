import React from 'react';
import { Users } from 'lucide-react';

const UserDashboard = () => {
  // In a real app, you would fetch this from the profile endpoint or decode JWT
  const userName = 'asif'; 

  return (
    <div className="w-full font-sans">
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl flex overflow-hidden max-w-4xl">
        <div className="bg-indigo-600 w-24 flex items-center justify-center">
          <Users size={32} className="text-white" />
        </div>
        <div className="p-6">
          <h3 className="text-gray-600 text-lg font-medium">Welcome Back</h3>
          <p className="text-2xl font-bold text-gray-800">{userName}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
