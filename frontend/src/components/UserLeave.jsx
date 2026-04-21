import React, { useState } from 'react';

const LEAVE_TYPES = ['Sick Leave', 'Casual Leave', 'Annual Leave', 'Maternity Leave', 'Emergency Leave'];

const INITIAL_LEAVES = [
  { id: 1, leaveType: 'Sick Leave',   days: 1, status: 'Rejected', from: '2024-08-01', to: '2024-08-01', reason: 'Fever' },
  { id: 2, leaveType: 'Annual Leave', days: 2, status: 'Rejected', from: '2024-09-10', to: '2024-09-11', reason: 'Family trip' },
];

const EMPTY_FORM = { leaveType: '', from: '', to: '', reason: '' };

/* ── Overlay backdrop ──────────────────────────────────────────────────────── */
const Overlay = ({ onClose, children }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  >
    {children}
  </div>
);

/* ── Status badge ─────────────────────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const cls =
    status === 'Approved' ? 'bg-green-100 text-green-700' :
    status === 'Rejected' ? 'bg-red-100 text-red-700'    :
    'bg-yellow-100 text-yellow-700';
  return <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${cls}`}>{status}</span>;
};

const UserLeave = () => {
  const [leaves, setLeaves]       = useState(INITIAL_LEAVES);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [errors, setErrors]       = useState({});
  const [success, setSuccess]     = useState('');

  /* ── Helpers ──────────────────────────────────────────────────────────────── */
  const ic = (hasErr) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
      hasErr ? 'border-red-400 bg-red-50' : 'border-gray-300'
    }`;

  const diffDays = (from, to) => {
    if (!from || !to) return 0;
    const d = (new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24) + 1;
    return d > 0 ? d : 0;
  };

  /* ── Form handlers ────────────────────────────────────────────────────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.leaveType)      errs.leaveType = 'Please select a leave type';
    if (!form.from)           errs.from      = 'Start date is required';
    if (!form.to)             errs.to        = 'End date is required';
    else if (form.from && form.to && new Date(form.to) < new Date(form.from))
      errs.to        = 'End date cannot be before start date';
    if (!form.reason.trim())  errs.reason    = 'Reason is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const newLeave = {
      id:        Date.now(),
      leaveType: form.leaveType,
      from:      form.from,
      to:        form.to,
      days:      diffDays(form.from, form.to),
      reason:    form.reason,
      status:    'Pending',
    };
    setLeaves((p) => [...p, newLeave]);
    setSuccess('Leave application submitted successfully!');
    setTimeout(() => { setShowModal(false); setSuccess(''); setForm(EMPTY_FORM); setErrors({}); }, 1400);
  };

  const closeModal = () => { setShowModal(false); setForm(EMPTY_FORM); setErrors({}); setSuccess(''); };

  /* ── Render ───────────────────────────────────────────────────────────────── */
  return (
    <div className="max-w-6xl w-full mx-auto font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Leaves</h2>
        <button
          id="btn-apply-leave"
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition shadow-sm"
        >
          Apply Leave
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-6 text-sm font-bold text-gray-700">S No</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Leave Type</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">From</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">To</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Days</th>
                <th className="py-4 px-6 text-sm font-bold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave, index) => (
                <tr key={leave.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm text-gray-600">{index + 1}</td>
                  <td className="py-4 px-6 text-sm text-gray-800 font-medium">{leave.leaveType}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{leave.from || '—'}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{leave.to || '—'}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{leave.days}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={leave.status} />
                  </td>
                </tr>
              ))}
              {leaves.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-sm text-gray-400">No leaves found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ════ Apply Leave Modal ════════════════════════════════════════════════ */}
      {showModal && (
        <Overlay onClose={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Apply for Leave</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>

            {/* Success */}
            {success && (
              <div className="mx-6 mt-4 px-4 py-2 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm font-medium text-center">
                ✓ {success}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="px-6 py-5 space-y-4">

              {/* Leave Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Leave Type <span className="text-red-500">*</span>
                </label>
                <select name="leaveType" value={form.leaveType} onChange={handleChange} className={ic(!!errors.leaveType)}>
                  <option value="">-- Select Leave Type --</option>
                  {LEAVE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.leaveType && <p className="text-red-500 text-xs mt-1">{errors.leaveType}</p>}
              </div>

              {/* Date range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    From <span className="text-red-500">*</span>
                  </label>
                  <input name="from" type="date" value={form.from} onChange={handleChange} className={ic(!!errors.from)} />
                  {errors.from && <p className="text-red-500 text-xs mt-1">{errors.from}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    To <span className="text-red-500">*</span>
                  </label>
                  <input name="to" type="date" value={form.to} onChange={handleChange} className={ic(!!errors.to)} />
                  {errors.to && <p className="text-red-500 text-xs mt-1">{errors.to}</p>}
                </div>
              </div>

              {/* Auto-calculated days */}
              {form.from && form.to && diffDays(form.from, form.to) > 0 && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-2 text-sm text-indigo-700 font-medium">
                  📅 Total days: <strong>{diffDays(form.from, form.to)}</strong>
                </div>
              )}

              {/* Reason */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="Briefly describe the reason for leave..."
                  rows={3}
                  className={ic(!!errors.reason) + ' resize-none'}
                />
                {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition shadow"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default UserLeave;
