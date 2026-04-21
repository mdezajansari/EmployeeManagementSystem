import React, { useState } from 'react';

const MOCK_SALARY_DATA = [
  {
    id: 1,
    empId: 'yousaf222',
    salary: 1000,
    allowance: 50,
    deduction: 40,
    total: 1010,
    payDate: '9/11/2024'
  }
];

const SalaryHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [salaryData, setSalaryData] = useState(MOCK_SALARY_DATA);

  // Future integration with backend:
  // useEffect(() => {
  //   fetch(`/api/salary?employeeId=${searchTerm}`)
  //     .then(res => res.json())
  //     .then(data => setSalaryData(data));
  // }, [searchTerm]);

  return (
    <div className="max-w-6xl w-full mx-auto font-sans">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Salary History</h2>
      
      <div className="flex justify-end mb-6">
        <input 
          type="text" 
          placeholder="Search By Emp ID" 
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">SNO</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">EMP ID</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">SALARY</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">ALLOWANCE</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">DEDUCTION</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">TOTAL</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">PAY DATE</th>
              </tr>
            </thead>
            <tbody>
              {salaryData.map((row, index) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm text-gray-600">{index + 1}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.empId}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.salary}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.allowance}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.deduction}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.total}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.payDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalaryHistory;
