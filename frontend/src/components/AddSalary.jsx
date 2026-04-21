import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock Data
const MOCK_DEPARTMENTS = [
  { id: 1, name: 'IT' },
  { id: 2, name: 'Database' },
  { id: 3, name: 'Logistic' },
];

const MOCK_EMPLOYEES = [
  { id: 1, name: 'yousaf', departmentId: 3 },
  { id: 2, name: 'asif', departmentId: 2 },
  { id: 3, name: 'khalil', departmentId: 1 },
];

const AddSalary = () => {
  const navigate = useNavigate();
  
  const [departments, setDepartments] = useState(MOCK_DEPARTMENTS);
  const [employees, setEmployees] = useState([]);
  
  const [formData, setFormData] = useState({
    departmentId: '',
    employeeId: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    payDate: ''
  });

  // Handle department change to filter employees
  const handleDepartmentChange = (e) => {
    const deptId = e.target.value;
    setFormData({ ...formData, departmentId: deptId, employeeId: '' });
    
    // Future: fetch(`/api/employees/department/${deptId}`)
    if (deptId) {
      const filtered = MOCK_EMPLOYEES.filter(emp => emp.departmentId.toString() === deptId);
      setEmployees(filtered);
    } else {
      setEmployees([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Future: axios.post('/api/salary', requestBody)
    console.log('Submitting salary data:', formData);
    
    // UX: Redirect back to salary history
    navigate('/admin/salary');
  };

  return (
    <div className="max-w-4xl mx-auto w-full font-sans mt-8">
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Add New Salary</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Department */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-medium">Department</label>
              <select 
                name="departmentId"
                value={formData.departmentId}
                onChange={handleDepartmentChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 bg-white"
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>

            {/* Employee */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-medium">Employee</label>
              <select 
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 bg-white"
                required
                disabled={!formData.departmentId}
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>

            {/* Basic Salary */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-medium">Basic Salary</label>
              <input 
                type="number" 
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                placeholder="Insert Salary"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            {/* Allowances */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-medium">Allowances</label>
              <input 
                type="number" 
                name="allowances"
                value={formData.allowances}
                onChange={handleChange}
                placeholder="Monthly Allowances"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            {/* Deductions */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-medium">Deductions</label>
              <input 
                type="number" 
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
                placeholder="Monthly Deductions"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            {/* Pay Date */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-medium">Pay Date</label>
              <input 
                type="date" 
                name="payDate"
                value={formData.payDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-600"
                required
              />
            </div>
            
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200"
          >
            Add Salary
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSalary;
