import React, { useState } from 'react';
import VerifyUsersScreen from './Verifyusers';
import Disqualified from './Disqualified';
import Updateusers from './Updateusers';
import UploadQuestions from './UploadQuestions';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('verify'); // Track active component
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Handle login
  const handleLogin = () => {
    if (username === 'hannan' && password === '03086844505a') {
      setIsAuthenticated(true); // Set authentication to true
      setError('');
    } else {
      setError('Invalid username or password.');
    }
  };

  if (!isAuthenticated) {
    // Render login form if not authenticated
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="p-6 bg-white rounded shadow-md w-80">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded p-2 w-full mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 w-full mb-4"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white rounded px-4 py-2 w-full"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar Container */}
      <div
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 bg-gray-800 text-white h-screen p-5 fixed md:relative`}
      >
        {/* Toggle Button for Sidebar */}
        <button
          onClick={toggleSidebar}
          className="bg-gray-600 text-white p-2 rounded-full mb-5"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>

        {/* Sidebar Menu Items */}
        <ul className="space-y-5">
          <li>
            <button
              onClick={() => setActiveComponent('verify')}
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md w-full"
            >
              <span className="material-icons">check_circle</span>
              {isOpen && <span>Verify Users</span>}
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('disqualified')}
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md w-full"
            >
              <span className="material-icons">cancel</span>
              {isOpen && <span>Disqualified Users</span>}
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('update')}
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md w-full"
            >
              <span className="material-icons">edit</span>
              {isOpen && <span>Update Users</span>}
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('upload')}
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md w-full"
            >
              <span className="material-icons">upload</span>
              {isOpen && <span>Upload Questions</span>}
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-20 w-full p-5">
        {/* Render active component */}
        {activeComponent === 'verify' && <VerifyUsersScreen />}
        {activeComponent === 'disqualified' && <Disqualified />}
        {activeComponent === 'update' && <Updateusers />}
        {activeComponent === 'upload' && <UploadQuestions />}
      </div>
    </div>
  );
};

export default Sidebar;
