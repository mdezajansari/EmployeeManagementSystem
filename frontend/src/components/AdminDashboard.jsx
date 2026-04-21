import React from 'react';
import { Users, Building2, Banknote, FileText, CheckCircle, Hourglass, XCircle } from 'lucide-react';

const SummaryCard = ({ icon, title, count, colorClass }) => (
  <div className="bg-white flex items-stretch shadow-sm rounded-xl overflow-hidden border border-gray-100">
    <div className={`${colorClass} w-20 flex items-center justify-center text-white shrink-0`}>
      {icon}
    </div>
    <div className="p-4 flex flex-col justify-center">
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-xl font-bold text-gray-800">{count}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="space-y-8 max-w-5xl">
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard 
            icon={<Users size={28} />} 
            title="Total Employees" 
            count="4" 
            colorClass="bg-indigo-600" 
          />
          <SummaryCard 
            icon={<Building2 size={28} />} 
            title="Total Departments" 
            count="3" 
            colorClass="bg-yellow-500" 
          />
          <SummaryCard 
            icon={<Banknote size={28} />} 
            title="Monthly Pay" 
            count="$1900" 
            colorClass="bg-red-600" 
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Leave Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryCard 
            icon={<FileText size={28} />} 
            title="Leave Applied" 
            count="2" 
            colorClass="bg-indigo-600" 
          />
          <SummaryCard 
            icon={<CheckCircle size={28} />} 
            title="Leave Approved" 
            count="2" 
            colorClass="bg-green-500" 
          />
          <SummaryCard 
            icon={<Hourglass size={28} />} 
            title="Leave Pending" 
            count="1" 
            colorClass="bg-yellow-500" 
          />
          <SummaryCard 
            icon={<XCircle size={28} />} 
            title="Leave Rejected" 
            count="1" 
            colorClass="bg-red-600" 
          />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
