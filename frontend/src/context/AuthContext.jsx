import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  // Load user if token exists
  useEffect(() => {
    if (token) {
      getUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const getUserProfile = async () => {
    try {
      const res = await axios.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error(err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (formData) => {
    const res = await axios.post("/api/auth/login", formData);
    const { token, user } = res.data;
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  };

  // Register
  const register = async (formData) => {
    const res = await axios.post("/api/auth/register", formData);
    const { token, user } = res.data;
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  };

  // Logout
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = () => useContext(AuthContext);
