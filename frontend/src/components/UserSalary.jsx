import React, { useState } from 'react';

const MOCK_SALARY = [
  { id: 2, empId: 'asif113', salary: 40000, allowance: 5000, deduction: 1000, total: 44000, payDate: '2024-09-01' }
];

const UserSalary = () => {
  const [salaries] = useState(MOCK_SALARY);

  return (
    <div className="max-w-6xl w-full mx-auto font-sans">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Salary History</h2>

      <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">SNO</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">SALARY</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">ALLOWANCE</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">DEDUCTION</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">TOTAL</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">PAY DATE</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((salary, index) => (
                <tr key={salary.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm text-gray-600">{index + 1}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">${salary.salary}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">${salary.allowance}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">${salary.deduction}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 font-medium">${salary.total}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{salary.payDate}</td>
                </tr>
              ))}
              {salaries.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-4 px-6 text-sm text-center text-gray-500">No salary history found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserSalary;
