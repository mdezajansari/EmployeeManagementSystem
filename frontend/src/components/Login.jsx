import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('Admin@gmail.com');
  const [password, setPassword] = useState('password');
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Future: use real endpoint
      // const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      // const { token, role } = response.data;
      
      // Mocking the response for development
      const role = email.toLowerCase().includes('admin') ? 'ROLE_ADMIN' : 'ROLE_USER';
      const token = 'mock-jwt-token';
      
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'ROLE_ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans"
      style={{
        background: 'linear-gradient(to bottom, #4f46e5 50%, #f8fafc 50%)',
      }}
    >
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm mx-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="Email"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="password">
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  style={{ paddingRight: '2.5rem' }}
                  placeholder="Password"
                  required
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2 rounded-lg text-indigo-600 focus:ring-indigo-500" />
                Remember me
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
            >
              Login
            </button>
            </form>

            {/* Test Credentials */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3 text-center">
                Test Credentials
              </p>
              <div className="flex gap-3">
                {/* Admin */}
                <div className="flex-1 bg-indigo-50 rounded-lg px-3 py-2.5">
                  <p className="text-xs font-bold text-indigo-600 mb-1">👤 Admin</p>
                  <p className="text-xs text-gray-600"><span className="font-medium text-gray-500">Email:</span> Admin@gmail.com</p>
                  <p className="text-xs text-gray-600"><span className="font-medium text-gray-500">Pass:</span> password</p>
                </div>
                {/* User */}
                <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2.5 border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 mb-1">👤 User</p>
                  <p className="text-xs text-gray-600"><span className="font-medium text-gray-500">Email:</span> user@gmail.com</p>
                  <p className="text-xs text-gray-600"><span className="font-medium text-gray-500">Pass:</span> password</p>
                </div>
              </div>
            </div>
        </div>

      {/* Ownership */}
      <p className="text-xs text-slate-400 mt-4 text-center">
        Built by <span className="text-indigo-300 font-semibold">MD EZAJ</span>
      </p>
    </div>
  );
};

export default Login;
