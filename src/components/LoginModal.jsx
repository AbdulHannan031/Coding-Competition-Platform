import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Assuming Firebase setup is exported from this file
import { useLocalContext } from '../context/context';
import { FaTimes } from 'react-icons/fa'; // Import Font Awesome icon for close button
import { doc, getDoc } from 'firebase/firestore';
import db from '../lib/firebase'; // Assuming you have Firestore set up

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to show spinner
  const [error, setError] = useState(null); // Error state for handling login errors

  const { setUser } = useLocalContext(); // Assuming you are storing user info in context

  const handleLogin = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, 'users', user.uid); // Assuming user data is stored under 'users' collection
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      if (userData.disq === false) {
        setUser(user); // Update context with the logged-in user details
        onClose(); // Close modal on successful login
      } else {
        setUser(null);
        setError('Sorry, you are disqualified.');
      }
       // Close modal on successful login
    } }catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      console.error('Login Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-90 z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="relative bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        {/* Red "X" Close Button in the top-right corner */}
        <button onClick={onClose} className="absolute top-3 right-3 text-red-500 hover:text-red-700">
          <FaTimes size={20} />
        </button>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-left">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-left">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Error message */}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
