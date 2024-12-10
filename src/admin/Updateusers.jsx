import React, { useEffect, useState } from 'react';
import  db  from '../lib/firebase'; // Make sure to import your Firebase setup
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const Updateusers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch unverified users from Firebase
    const fetchUsers = async () => {
      const q = query(collection(db, 'users'));
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
    await updateDoc(userRef, { disq: false });
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
      <h2 className="text-2xl font-bold mb-4"> Users</h2>
      
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
                {user.paymentProofUrl && (
                  <img
                    src={user.paymentProofUrl}
                    alt="Payment Proof"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                )}
              </td>
              <td className="p-4">
                <button
                  onClick={() => verifyUser(user.id)}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md mr-2"
                >
                  <span className="material-icons">check_circle</span> callback
                </button>
                <button
                  onClick={() => disapproveUser(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                >
                  <span className="material-icons">cancel</span> kick
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Updateusers;
