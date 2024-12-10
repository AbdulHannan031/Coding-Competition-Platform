import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import  db  from '../lib/firebase'; // Adjust the import path to your `firebase.js`
import Navbar from '../components/Navbar';

const UserScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userData = querySnapshot.docs.map(doc => doc.data());
      setUsers(userData);
      setFilteredUsers(userData);
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(
      users.filter((user) =>
        user.username?.toLowerCase().includes(term) || user.affiliation?.toLowerCase().includes(term)
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
        {/* Search Input */}
        <div className="w-full max-w-2xl mb-6 flex items-center">
          <input
            type="text"
            placeholder="Search for matching users"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:border-gray-500"
          />
          <button className="px-4 bg-red-600 text-white rounded-r-lg font-semibold">
            🔍
          </button>
        </div>

        {/* User Table */}
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">User</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Affiliation</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 text-gray-800">{user.username || 'N/A'}</td>
                  <td className="px-4 py-2 text-gray-800">{user.affiliation || 'N/A'}</td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="2" className="px-4 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserScreen;
