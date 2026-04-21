import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_DEPARTMENTS = ['IT', 'Database', 'Logistic', 'HR', 'Finance'];

const INITIAL_EMPLOYEES = [
  { id: 1, name: 'yousaf', email: 'yousaf@ems.com', dob: '2/13/2007', gender: 'Male', department: 'Database', designation: 'DB Admin',        salary: '45000' },
  { id: 2, name: 'asif',   email: 'asif@ems.com',   dob: '6/29/2022', gender: 'Male', department: 'Database', designation: 'Data Analyst',     salary: '50000' },
  { id: 3, name: 'khalil', email: 'khalil@ems.com', dob: '6/15/2021', gender: 'Male', department: 'Database', designation: 'Backend Dev',       salary: '55000' },
  { id: 4, name: 'Latif',  email: 'latif@ems.com',  dob: '6/9/2020',  gender: 'Male', department: 'IT',       designation: 'Network Engineer',  salary: '60000' },
];

const EMPTY_FORM = { name: '', email: '', dob: '', gender: '', department: '', designation: '', salary: '', password: '' };

/* ── Reusable overlay backdrop ───────────────────────────────────────────── */
const Overlay = ({ onClose, children }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  >
    {children}
  </div>
);

const ManageEmployees = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees]   = useState(INITIAL_EMPLOYEES);

  // ── Add modal ──────────────────────────────────────────────────────────────
  const [showAdd, setShowAdd]       = useState(false);
  const [addForm, setAddForm]       = useState(EMPTY_FORM);
  const [addErrors, setAddErrors]   = useState({});
  const [addSuccess, setAddSuccess] = useState('');

  // ── View modal ─────────────────────────────────────────────────────────────
  const [viewEmp, setViewEmp]       = useState(null);

  // ── Edit modal ─────────────────────────────────────────────────────────────
  const [editEmp, setEditEmp]       = useState(null);
  const [editForm, setEditForm]     = useState(EMPTY_FORM);
  const [editErrors, setEditErrors] = useState({});
  const [editSuccess, setEditSuccess] = useState('');

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = employees.filter((e) =>
    e.id.toString().includes(searchTerm.trim()) ||
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = (form, isEdit = false) => {
    const errs = {};
    if (!form.name.trim())        errs.name        = 'Name is required';
    if (!form.email.trim())       errs.email       = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.dob)                errs.dob         = 'Date of birth is required';
    if (!form.gender)             errs.gender      = 'Gender is required';
    if (!form.department)         errs.department  = 'Department is required';
    if (!form.designation.trim()) errs.designation = 'Designation is required';
    if (!form.salary)             errs.salary      = 'Salary is required';
    if (!isEdit) {
      if (!form.password)         errs.password    = 'Password is required';
      else if (form.password.length < 6) errs.password = 'Min 6 characters';
    }
    return errs;
  };

  // ── Input class helper ─────────────────────────────────────────────────────
  const ic = (hasError) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
      hasError ? 'border-red-400 bg-red-50' : 'border-gray-300'
    }`;

  // ═══════════════════════ ADD handlers ══════════════════════════════════════
  const openAdd  = () => { setAddForm(EMPTY_FORM); setAddErrors({}); setAddSuccess(''); setShowAdd(true); };
  const closeAdd = () => { setShowAdd(false); setAddForm(EMPTY_FORM); setAddErrors({}); setAddSuccess(''); };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm((p) => ({ ...p, [name]: value }));
    if (addErrors[name]) setAddErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const errs = validate(addForm);
    if (Object.keys(errs).length) { setAddErrors(errs); return; }
    const newEmp = { id: Date.now(), ...addForm };
    setEmployees((p) => [...p, newEmp]);
    setAddSuccess(`Employee "${addForm.name}" added successfully!`);
    setTimeout(closeAdd, 1400);
  };

  // ═══════════════════════ EDIT handlers ═════════════════════════════════════
  const openEdit = (emp) => {
    setEditEmp(emp);
    setEditForm({ name: emp.name, email: emp.email, dob: emp.dob, gender: emp.gender,
                  department: emp.department, designation: emp.designation, salary: emp.salary, password: '' });
    setEditErrors({});
    setEditSuccess('');
  };
  const closeEdit = () => { setEditEmp(null); setEditForm(EMPTY_FORM); setEditErrors({}); setEditSuccess(''); };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((p) => ({ ...p, [name]: value }));
    if (editErrors[name]) setEditErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const errs = validate(editForm, true);
    if (Object.keys(errs).length) { setEditErrors(errs); return; }
    setEmployees((p) => p.map((emp) => emp.id === editEmp.id ? { ...emp, ...editForm } : emp));
    setEditSuccess('Changes saved successfully!');
    setTimeout(closeEdit, 1200);
  };

  // ═══════════════════════ Shared form fields renderer ═══════════════════════
  const FormFields = ({ form, errors, onChange, isEdit }) => {
    const [showPwd, setShowPwd] = useState(false);
    return (
    <>
      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name <span className="text-red-500">*</span></label>
          <input name="name" value={form.name} onChange={onChange} placeholder="e.g. John Doe" className={ic(!!errors.name)} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Email <span className="text-red-500">*</span></label>
          <input name="email" type="email" value={form.email} onChange={onChange} placeholder="e.g. john@example.com" className={ic(!!errors.email)} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>
      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Date of Birth <span className="text-red-500">*</span></label>
          <input name="dob" type="date" value={form.dob} onChange={onChange} className={ic(!!errors.dob)} />
          {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Gender <span className="text-red-500">*</span></label>
          <select name="gender" value={form.gender} onChange={onChange} className={ic(!!errors.gender)}>
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
        </div>
      </div>
      {/* Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Department <span className="text-red-500">*</span></label>
          <select name="department" value={form.department} onChange={onChange} className={ic(!!errors.department)}>
            <option value="">-- Select Department --</option>
            {MOCK_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Designation <span className="text-red-500">*</span></label>
          <input name="designation" value={form.designation} onChange={onChange} placeholder="e.g. Software Engineer" className={ic(!!errors.designation)} />
          {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
        </div>
      </div>
      {/* Row 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Salary (PKR) <span className="text-red-500">*</span></label>
          <input name="salary" type="number" min="0" value={form.salary} onChange={onChange} placeholder="e.g. 50000" className={ic(!!errors.salary)} />
          {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
        </div>
        {!isEdit && (
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Password <span className="text-red-500">*</span></label>
            <div style={{ position: 'relative' }}>
              <input
                name="password"
                type={showPwd ? 'text' : 'password'}
                value={form.password}
                onChange={onChange}
                placeholder="Min 6 characters"
                className={ic(!!errors.password)}
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                tabIndex={-1}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0.6rem',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPwd ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
        )}
      </div>
    </>
    );
  };

  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="max-w-6xl w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Manage Employees</h2>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search By Employee ID or Name"
          className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          id="btn-add-employee"
          onClick={openAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition font-medium shadow"
        >
          Add New Employee
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-bold text-gray-700">S No</th>
                <th className="py-3 px-4 text-sm font-bold text-gray-700">Image</th>
                <th className="py-3 px-4 text-sm font-bold text-gray-700">Name</th>
                <th className="py-3 px-4 text-sm font-bold text-gray-700">DOB</th>
                <th className="py-3 px-4 text-sm font-bold text-gray-700">Department</th>
                <th className="py-3 px-4 text-sm font-bold text-gray-700 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, index) => (
                <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>
                  <td className="py-3 px-4">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80&sat=-100"
                      alt="Employee"
                      className="w-10 h-10 rounded-full object-cover grayscale"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">{emp.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{emp.dob}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{emp.department}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-2">
                      {/* VIEW */}
                      <button
                        onClick={() => setViewEmp(emp)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg transition"
                      >
                        View
                      </button>
                      {/* EDIT */}
                      <button
                        onClick={() => openEdit(emp)}
                        className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg transition"
                      >
                        Edit
                      </button>
                      {/* SALARY → /admin/salary */}
                      <button
                        onClick={() => navigate('/admin/salary')}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1.5 rounded-lg transition"
                      >
                        Salary
                      </button>
                      {/* LEAVE → /admin/leaves */}
                      <button
                        onClick={() => navigate('/admin/leaves')}
                        className="bg-red-400 hover:bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg transition"
                      >
                        Leave
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-sm text-gray-400">No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="py-3 px-4 flex items-center justify-end text-sm text-gray-500 space-x-4 border-t border-gray-100">
          <span>Rows per page: 10 ▾</span>
          <span>1-{filtered.length} of {filtered.length}</span>
          <div className="flex space-x-2">
            <button className="text-gray-400 hover:text-gray-600">{'|<'}</button>
            <button className="text-gray-400 hover:text-gray-600">{'<'}</button>
            <button className="text-gray-400 hover:text-gray-600">{'>'}</button>
            <button className="text-gray-400 hover:text-gray-600">{'>|'}</button>
          </div>
        </div>
      </div>

      {/* ════════════ VIEW Modal ════════════════════════════════════════════════ */}
      {viewEmp && (
        <Overlay onClose={() => setViewEmp(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Employee Details</h3>
              <button onClick={() => setViewEmp(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            {/* Avatar + info */}
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=80&h=80&q=80&sat=-100"
                  alt="Employee"
                  className="w-16 h-16 rounded-full object-cover grayscale border-2 border-indigo-100"
                />
                <div>
                  <p className="text-lg font-bold text-gray-800">{viewEmp.name}</p>
                  <p className="text-sm text-indigo-500">{viewEmp.designation}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ['Email',       viewEmp.email],
                  ['Date of Birth', viewEmp.dob],
                  ['Gender',      viewEmp.gender],
                  ['Department',  viewEmp.department],
                  ['Salary',      `PKR ${Number(viewEmp.salary).toLocaleString()}`],
                ].map(([label, value]) => (
                  <div key={label} className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{label}</p>
                    <p className="text-gray-700 font-medium mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setViewEmp(null)}
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition shadow"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Overlay>
      )}

      {/* ════════════ EDIT Modal ════════════════════════════════════════════════ */}
      {editEmp && (
        <Overlay onClose={closeEdit}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Edit Employee — {editEmp.name}</h3>
              <button onClick={closeEdit} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            {editSuccess && (
              <div className="mx-6 mt-4 px-4 py-2 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm font-medium text-center">
                ✓ {editSuccess}
              </div>
            )}
            <form onSubmit={handleEditSubmit} noValidate className="px-6 py-5 space-y-4">
              <FormFields form={editForm} errors={editErrors} onChange={handleEditChange} isEdit={true} />
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={closeEdit}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit"
                  className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition shadow">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </Overlay>
      )}

      {/* ════════════ ADD Modal ═════════════════════════════════════════════════ */}
      {showAdd && (
        <Overlay onClose={closeAdd}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Add New Employee</h3>
              <button onClick={closeAdd} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            {addSuccess && (
              <div className="mx-6 mt-4 px-4 py-2 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm font-medium text-center">
                ✓ {addSuccess}
              </div>
            )}
            <form onSubmit={handleAddSubmit} noValidate className="px-6 py-5 space-y-4">
              <FormFields form={addForm} errors={addErrors} onChange={handleAddChange} isEdit={false} />
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={closeAdd}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition shadow">
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default ManageEmployees;
