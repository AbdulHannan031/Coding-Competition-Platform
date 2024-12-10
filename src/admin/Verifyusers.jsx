import React, { useEffect, useState } from 'react';
import db from '../lib/firebase'; // Ensure your Firebase setup is imported
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const VerifyUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State for the selected image to preview

  useEffect(() => {
    // Fetch unverified users from Firebase
    const fetchUsers = async () => {
      const q = query(collection(db, 'users'), where('approved', '==', false));
      const querySnapshot = await getDocs(q);

      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  // Handle verifying a user
  const verifyUser = async (userId) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { approved: true, disq: false });
    setUsers(users.filter(user => user.id !== userId)); // Remove from list after verification
  };

  // Handle disapproving a user
  const disapproveUser = async (userId) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { disq: true });
    setUsers(users.filter(user => user.id !== userId)); // Remove from list after disapproval
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Verify Users</h2>

      <table className="min-w-full table-auto bg-gray-800 text-white rounded-md">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-4">Username</th>
            <th className="p-4">Email</th>
            <th className="p-4">Payment Proof</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-700">
              <td className="p-4">{user.username}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">
                {user.paymentProofBase64 ? (
                  <img
                    src={user.paymentProofBase64}
                    alt="Payment Proof"
                    className="w-20 h-20 object-cover rounded-md cursor-pointer"
                    onClick={() => setSelectedImage(user.paymentProofBase64)} // Open modal with Base64 image
                  />
                ) : (
                  <span>No Image Available</span>
                )}
              </td>
              <td className="p-4">
                <button
                  onClick={() => verifyUser(user.id)}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md mr-2"
                >
                  Verify
                </button>
                <button
                  onClick={() => disapproveUser(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                >
                  Disapprove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for viewing the full-size image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Payment Proof"
              className="max-w-full max-h-screen rounded-md"
            />
            <button
              className="absolute top-4 right-4 bg-gray-700 text-white p-2 rounded-full"
              onClick={() => setSelectedImage(null)} // Close modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyUsersScreen;
