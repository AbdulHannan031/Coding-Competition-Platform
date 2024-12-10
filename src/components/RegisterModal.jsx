import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useLocalContext } from '../context/context';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import db from '../lib/firebase';

const RegisterModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('C++');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aff, setAff] = useState('');
  const [paymentProof, setPaymentProof] = useState(null); // New state for payment proof image
  const { setUser } = useLocalContext();

   
  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            setError("Username already taken. Please choose another one.");
            setLoading(false);
            return;
        }

        // Check if a payment proof file is selected
        if (!paymentProof) {
            setError("Payment proof is required.");
            setLoading(false);
            return;
        }

        // Convert the payment proof file to Base64
        const fileBase64 = await convertToBase64(paymentProof);

        // Create user without auto-login
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            username,
            email,
            affiliation: aff,
            language,
            paymentProofBase64: fileBase64, // Save the file as Base64
            approved: false,
            disq: false, // New user is not approved initially
        });

        // Notify user about verification process, without logging in
        setError("Account is under verification process. Please wait.");
    } catch (error) {
        setError("Registration failed. Please try again.");
        console.error("Registration Error:", error.message);
    } finally {
        setLoading(false);
    }
};

// Utility function to convert file to Base64
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
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
        className="relative bg-gray-900 p-8 rounded-lg shadow-lg w-80"
      >
        {/* Close icon at the top-right */}
        <button onClick={onClose} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Account Info */}
        <div className="mb-4 text-yellow-500 text-sm font-semibold text-center">
          Payment Account: Nayapay 03069881063

        </div>
        <div className="mb-4 text-green-500 text-sm font-semibold text-center">
          Amount: Rs 1500

        </div>


        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-left">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded text-black"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-left">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded text-black"
                required
              />
            </div>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-left">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded text-black"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-left">Affiliation</label>
              <input
                type="text"
                value={aff}
                onChange={(e) => setAff(e.target.value)}
                className="w-full px-3 py-2 border rounded text-black"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-left">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            >
              <option>cpp</option>
              <option>python</option>
              <option>java</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-left">Payment Proof</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPaymentProof(e.target.files[0])}
              className="w-full px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <button
            onClick={handleRegister}
            className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default RegisterModal;
