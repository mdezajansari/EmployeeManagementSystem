import React, { useState } from 'react';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    // Future: const response = await axios.put('/api/setting/change-password', { email: 'Admin@gmail.com', oldPassword: formData.oldPassword, newPassword: formData.newPassword })
    
    // Simulating backend response for demo
    if (formData.oldPassword === 'password') { // Assuming 'password' is the mock old password
      setMessage('Password updated successfully!');
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      setError('Incorrect old password.');
    }
  };

  return (
    <div className="max-w-md mx-auto w-full font-sans mt-12">
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>
        
        {message && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2" htmlFor="oldPassword">
              Old Password
            </label>
            <input 
              type="password" 
              name="oldPassword"
              id="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Old Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input 
              type="password" 
              name="newPassword"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input 
              type="password" 
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-200"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
