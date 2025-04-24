import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#36454F] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold text-[#B2E0D6]">
        BookVerse
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/books" className="hover:text-[#B2E0D6]">
          Books
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="hover:text-[#B2E0D6]">
              Login
            </Link>
            <Link to="/register" className="hover:text-[#B2E0D6]">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="hover:text-[#B2E0D6]">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-[#B2E0D6] text-[#36454F] px-4 py-1 rounded hover:bg-opacity-90"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
