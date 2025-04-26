import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import API from '../api';

function UserDashboard() {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch User Details
  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/api/users/${user.id}`);
      setUserData(res.data);
      setBio(res.data.bio || '');
    } catch (error) {
      console.error('Failed to fetch user details', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserDetails();
    }
  }, [user]);

  // Handle Bio Update
  const handleBioUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await API.put(`/api/users/${user.id}`, { bio });
      setMessage('Bio updated successfully ✅');
      setUserData(res.data);
    } catch (error) {
      console.error('Failed to update bio', error);
      setMessage('Failed to update bio ❌');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">

        {/* User Info */}
        <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Welcome, {userData?.name} 👋
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-gray-600 font-semibold">Name:</p>
            <p className="text-gray-800">{userData?.name}</p>
          </div>

          <div>
            <p className="text-gray-600 font-semibold">Email:</p>
            <p className="text-gray-800">{userData?.email}</p>
          </div>

          <div>
            <p className="text-gray-600 font-semibold">Role:</p>
            <p className="text-gray-800 capitalize">{userData?.role}</p>
          </div>
        </div>

        {/* Bio Update */}
        <form onSubmit={handleBioUpdate} className="mt-8 space-y-4">
          <label className="block text-gray-700 font-semibold">
            Update Bio:
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            placeholder="Write something about yourself..."
          />

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {updating ? 'Updating...' : 'Update Bio'}
          </button>

          {message && (
            <p className={`text-center font-semibold ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>

        {/* Logout Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default UserDashboard;
