import React, { useState } from 'react';

const INITIAL_DEPARTMENTS = [
  { id: 1, name: 'IT' },
  { id: 2, name: 'Database' },
  { id: 3, name: 'Logistic' },
];

const ManageDepartments = () => {
  const [searchTerm, setSearchTerm]       = useState('');
  const [departments, setDepartments]     = useState(INITIAL_DEPARTMENTS);

  // Add modal
  const [showAddModal, setShowAddModal]   = useState(false);
  const [newDeptName, setNewDeptName]     = useState('');
  const [addError, setAddError]           = useState('');
  const [addSuccess, setAddSuccess]       = useState('');

  // Edit modal
  const [editTarget, setEditTarget]       = useState(null); // { id, name }
  const [editName, setEditName]           = useState('');
  const [editError, setEditError]         = useState('');

  // Delete confirm modal
  const [deleteTarget, setDeleteTarget]   = useState(null); // { id, name }

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = departments.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ── Add handlers ───────────────────────────────────────────────────────────
  const openAdd = () => { setNewDeptName(''); setAddError(''); setAddSuccess(''); setShowAddModal(true); };
  const closeAdd = () => { setShowAddModal(false); setNewDeptName(''); setAddError(''); setAddSuccess(''); };

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = newDeptName.trim();
    if (!trimmed) { setAddError('Department name is required.'); return; }
    if (departments.some((d) => d.name.toLowerCase() === trimmed.toLowerCase())) {
      setAddError('A department with this name already exists.'); return;
    }
    const next = { id: Date.now(), name: trimmed };
    setDepartments((prev) => [...prev, next]);
    setAddSuccess(`"${trimmed}" department added successfully!`);
    setNewDeptName('');
    setTimeout(() => closeAdd(), 1400);
  };

  // ── Edit handlers ──────────────────────────────────────────────────────────
  const openEdit = (dept) => { setEditTarget(dept); setEditName(dept.name); setEditError(''); };
  const closeEdit = () => { setEditTarget(null); setEditName(''); setEditError(''); };

  const handleEdit = (e) => {
    e.preventDefault();
    const trimmed = editName.trim();
    if (!trimmed) { setEditError('Department name is required.'); return; }
    if (
      departments.some(
        (d) => d.name.toLowerCase() === trimmed.toLowerCase() && d.id !== editTarget.id
      )
    ) {
      setEditError('A department with this name already exists.'); return;
    }
    setDepartments((prev) =>
      prev.map((d) => (d.id === editTarget.id ? { ...d, name: trimmed } : d))
    );
    closeEdit();
  };

  // ── Delete handlers ────────────────────────────────────────────────────────
  const openDelete = (dept) => setDeleteTarget(dept);
  const closeDelete = () => setDeleteTarget(null);
  const confirmDelete = () => {
    setDepartments((prev) => prev.filter((d) => d.id !== deleteTarget.id));
    closeDelete();
  };

  // ── Shared styles ──────────────────────────────────────────────────────────
  const inputCls = (hasError) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
      hasError ? 'border-red-400 bg-red-50' : 'border-gray-300'
    }`;

  const Overlay = ({ onClose, children }) => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {children}
    </div>
  );

  return (
    <div className="max-w-5xl w-full mx-auto font-sans">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Manage Departments</h2>

      {/* ── Toolbar ─────────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search By Department"
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          id="btn-add-department"
          onClick={openAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition font-medium shadow"
        >
          Add New Department
        </button>
      </div>

      {/* ── Table ───────────────────────────────────────────────────────────── */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-6 text-sm font-bold text-gray-700">S No</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Department</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((dept, index) => (
                <tr key={dept.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm text-gray-600">{index + 1}</td>
                  <td className="py-4 px-6 text-sm text-gray-800 font-medium">{dept.name}</td>
                  <td className="py-4 px-6 flex space-x-3">
                    <button
                      onClick={() => openEdit(dept)}
                      className="bg-green-500 hover:bg-green-600 text-white text-xs px-4 py-1.5 rounded-lg transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDelete(dept)}
                      className="bg-red-400 hover:bg-red-500 text-white text-xs px-4 py-1.5 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-6 text-center text-sm text-gray-400">
                    No departments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="py-3 px-6 flex items-center justify-end text-sm text-gray-500 space-x-6 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <span>Rows per page:</span>
            <select className="border-none bg-transparent focus:outline-none focus:ring-0 text-gray-600">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <span>1-{filtered.length} of {filtered.length}</span>
          <div className="flex space-x-4">
            <button className="text-gray-400 hover:text-gray-600">{'|<'}</button>
            <button className="text-gray-400 hover:text-gray-600">{'<'}</button>
            <button className="text-gray-400 hover:text-gray-600">{'>'}</button>
            <button className="text-gray-400 hover:text-gray-600">{'>|'}</button>
          </div>
        </div>
      </div>

      {/* ══ Add Department Modal ═══════════════════════════════════════════════ */}
      {showAddModal && (
        <Overlay onClose={closeAdd}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Add New Department</h3>
              <button onClick={closeAdd} className="text-gray-400 hover:text-gray-600 text-2xl leading-none" aria-label="Close">
                &times;
              </button>
            </div>

            {/* Success */}
            {addSuccess && (
              <div className="mx-6 mt-4 px-4 py-2 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm font-medium text-center">
                ✓ {addSuccess}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleAdd} noValidate className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Department Name <span className="text-red-500">*</span>
                </label>
                <input
                  autoFocus
                  value={newDeptName}
                  onChange={(e) => { setNewDeptName(e.target.value); setAddError(''); }}
                  placeholder="e.g. Marketing"
                  className={inputCls(!!addError)}
                />
                {addError && <p className="text-red-500 text-xs mt-1">{addError}</p>}
              </div>

              <div className="flex justify-end space-x-3 pt-1">
                <button
                  type="button"
                  onClick={closeAdd}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition shadow"
                >
                  Add Department
                </button>
              </div>
            </form>
          </div>
        </Overlay>
      )}

      {/* ══ Edit Department Modal ══════════════════════════════════════════════ */}
      {editTarget && (
        <Overlay onClose={closeEdit}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Edit Department</h3>
              <button onClick={closeEdit} className="text-gray-400 hover:text-gray-600 text-2xl leading-none" aria-label="Close">
                &times;
              </button>
            </div>

            <form onSubmit={handleEdit} noValidate className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Department Name <span className="text-red-500">*</span>
                </label>
                <input
                  autoFocus
                  value={editName}
                  onChange={(e) => { setEditName(e.target.value); setEditError(''); }}
                  className={inputCls(!!editError)}
                />
                {editError && <p className="text-red-500 text-xs mt-1">{editError}</p>}
              </div>

              <div className="flex justify-end space-x-3 pt-1">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </Overlay>
      )}

      {/* ══ Delete Confirm Modal ═══════════════════════════════════════════════ */}
      {deleteTarget && (
        <Overlay onClose={closeDelete}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4">
            <div className="px-6 py-5 text-center space-y-3">
              <div className="text-5xl">🗑️</div>
              <h3 className="text-lg font-bold text-gray-800">Delete Department?</h3>
              <p className="text-sm text-gray-500">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-gray-700">"{deleteTarget.name}"</span>?
                This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-3 px-6 pb-5">
              <button
                onClick={closeDelete}
                className="px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition shadow"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default ManageDepartments;
