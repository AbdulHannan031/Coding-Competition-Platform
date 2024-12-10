import React, { useState } from 'react';
import { FaUserPlus, FaSignInAlt, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import { useLocalContext } from '../context/context';
import db, { auth } from '../lib/firebase';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

function Navbar() {
  const { user, setUser } = useLocalContext(); // Get user and setUser from context
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (!confirmLogout) return;

    try {
      await signOut(auth);
      setUser(null);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Links */}
        <div className="flex items-center space-x-8">
          <span className="text-lg font-semibold">
            <Link to="/">SSCIT Coding Arena</Link>
          </span>

          {/* Links for large screens */}
          <ul className="hidden lg:flex space-x-6">
            <li>
              <Link to="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/users" className="hover:text-gray-300">Users</Link>
            </li>
            <li>
              <Link to="/scoreboard" className="hover:text-gray-300">Scoreboard</Link>
            </li>
            <li>
              <Link to="/challenges" className="hover:text-gray-300">Challenges</Link>
            </li>
          </ul>
        </div>

        {/* Register/Login and Profile/Logout Toggle */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <button onClick={handleLogout} className="flex items-center hover:text-gray-300">
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex space-x-4">
              <button onClick={() => setIsRegisterModalOpen(true)} className="flex items-center hover:text-gray-300">
                <FaUserPlus className="mr-1" /> Register
              </button>
              <button onClick={() => setIsLoginModalOpen(true)} className="flex items-center hover:text-gray-300">
                <FaSignInAlt className="mr-1" /> Login
              </button>
            </div>
          )}

          <button onClick={toggleDrawer} className="lg:hidden text-white focus:outline-none">
            {isDrawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Drawer for small screens */}
      {isDrawerOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex flex-col lg:hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <span className="text-lg font-semibold">SSCIT Coding Arena</span>
            <button onClick={toggleDrawer} className="text-white focus:outline-none">
              <FaTimes size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-4 p-6">
            <Link to="/about" onClick={toggleDrawer} className="hover:text-gray-300">
              About
            </Link>
            <Link to="/users" onClick={toggleDrawer} className="hover:text-gray-300">
              Users
            </Link>
            <Link to="/scoreboard" onClick={toggleDrawer} className="hover:text-gray-300">
              Scoreboard
            </Link>
            <Link to="/challenges" onClick={toggleDrawer} className="hover:text-gray-300">
              Challenges
            </Link>
          </div>
          <div className="flex flex-col items-start space-y-4 p-6 border-t border-gray-700">
            {user ? (
              <>
                <button onClick={handleLogout} className="flex items-center hover:text-gray-300">
                  <FaSignOutAlt className="mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    toggleDrawer();
                    setIsRegisterModalOpen(true);
                  }}
                  className="flex items-center hover:text-gray-300"
                >
                  <FaUserPlus className="mr-1" /> Register
                </button>
                <button
                  onClick={() => {
                    toggleDrawer();
                    setIsLoginModalOpen(true);
                  }}
                  className="flex items-center hover:text-gray-300"
                >
                  <FaSignInAlt className="mr-1" /> Login
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Modals */}
      {isRegisterModalOpen && (
        <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
      )}
      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      )}
    </nav>
  );
}

export default Navbar;
