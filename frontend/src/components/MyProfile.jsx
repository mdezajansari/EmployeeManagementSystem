import React from 'react';

const MyProfile = () => {
  // Mock Data: In a real app, this would be fetched from /api/user/profile
  const employee = {
    name: 'asif',
    dob: '1990-05-15',
    department: { name: 'Database' },
    imageUrl: null // Or a default image URL
  };

  return (
    <div className="max-w-4xl mx-auto w-full font-sans mt-8">
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">My Profile</h2>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-indigo-500 flex-shrink-0 bg-gray-100">
            {employee.imageUrl ? (
              <img src={employee.imageUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Profile Details */}
          <div className="flex-1 w-full space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <p className="text-sm text-gray-500 font-medium">Name</p>
              <p className="text-lg text-gray-800 font-semibold">{employee.name}</p>
            </div>
            
            <div className="border-b border-gray-100 pb-4">
              <p className="text-sm text-gray-500 font-medium">Date of Birth</p>
              <p className="text-lg text-gray-800 font-semibold">{employee.dob}</p>
            </div>
            
            <div className="border-b border-gray-100 pb-4">
              <p className="text-sm text-gray-500 font-medium">Department</p>
              <p className="text-lg text-gray-800 font-semibold">{employee.department?.name || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
