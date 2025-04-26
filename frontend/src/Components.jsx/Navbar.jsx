import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          BookNest 📚
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6">
          {token ? (
            <>
              {/* Profile Link (based on role) */}
              {user?.role === 'admin' ? (
                <Link
                  to="/admin-dashboard"
                  className="text-gray-700 hover:text-indigo-600 font-semibold"
                >
                  Admin Panel
                </Link>
              ) : (
                <Link
                  to="/user-dashboard"
                  className="text-gray-700 hover:text-indigo-600 font-semibold"
                >
                  Profile
                </Link>
              )}

              {/* Other Links */}
              <Link to="/books" className="text-gray-700 hover:text-indigo-600 font-semibold">
                Books List
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="text-gray-700 hover:text-indigo-600 font-semibold">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-semibold">
                About
              </Link>
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
