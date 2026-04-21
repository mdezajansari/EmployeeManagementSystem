import React, { useState } from 'react';

const MOCK_LEAVES = [
  { id: 1, empId: 'yousaf222', name: 'yousaf', leaveType: 'Sick Leave', department: 'Logistic', days: 4, status: 'Approved' },
  { id: 2, empId: 'yousaf222', name: 'yousaf', leaveType: 'Casual Leave', department: 'Logistic', days: 1, status: 'Approved' },
  { id: 3, empId: 'asif113', name: 'asif', leaveType: 'Sick Leave', department: 'Database', days: 1, status: 'Rejected' },
  { id: 4, empId: 'asif113', name: 'asif', leaveType: 'Annual Leave', department: 'Database', days: 2, status: 'Rejected' }
];

const LeaveList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(''); // empty string means show all
  const [leaves, setLeaves] = useState(MOCK_LEAVES);

  // Future backend logic: fetch(`/api/leaves?status=${filterStatus}&employeeId=${searchTerm}`)

  const filteredLeaves = leaves.filter(leave => {
    const matchStatus = filterStatus ? leave.status === filterStatus : true;
    const matchSearch = searchTerm ? leave.empId.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return matchStatus && matchSearch;
  });

  return (
    <div className="max-w-6xl w-full mx-auto font-sans">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Manage Leaves</h2>
      
      <div className="flex justify-between items-center mb-6">
        <input 
          type="text" 
          placeholder="Search By Emp ID" 
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-3">
          <button 
            onClick={() => setFilterStatus(filterStatus === 'Pending' ? '' : 'Pending')}
            className={`px-4 py-2 rounded-lg transition font-medium text-white ${filterStatus === 'Pending' ? 'bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilterStatus(filterStatus === 'Approved' ? '' : 'Approved')}
            className={`px-4 py-2 rounded-lg transition font-medium text-white ${filterStatus === 'Approved' ? 'bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            Approved
          </button>
          <button 
            onClick={() => setFilterStatus(filterStatus === 'Rejected' ? '' : 'Rejected')}
            className={`px-4 py-2 rounded-lg transition font-medium text-white ${filterStatus === 'Rejected' ? 'bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            Rejected
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-6 text-sm font-bold text-gray-700">S No</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Emp ID</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Name</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Leave Type</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Department</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Days</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Status</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave, index) => (
                <tr key={leave.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm text-gray-600">{index + 1}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{leave.empId}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{leave.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{leave.leaveType}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{leave.department}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{leave.days}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{leave.status}</td>
                  <td className="py-4 px-6 flex justify-center">
                    <button 
                      onClick={() => alert(`View details for leave ID: ${leave.id}`)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-4 py-1.5 rounded-lg transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLeaves.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-4 px-6 text-sm text-center text-gray-500">No leaves found matching the criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="py-3 px-6 flex items-center justify-end text-sm text-gray-500 space-x-6 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <span>Rows per page:</span>
            <select className="border-none bg-transparent focus:outline-none focus:ring-0 text-gray-600">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <span>1-{filteredLeaves.length} of {filteredLeaves.length}</span>
          <div className="flex space-x-4">
            <button className="text-gray-400 hover:text-gray-600">{'|<'}</button>
            <button className="text-gray-400 hover:text-gray-600">{'<'}</button>
            <button className="text-gray-400 hover:text-gray-600">{'>'}</button>
            <button className="text-gray-400 hover:text-gray-600">{'>|'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveList;
