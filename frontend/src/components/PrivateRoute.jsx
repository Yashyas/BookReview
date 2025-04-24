import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // User not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, show the page
  return children;
};

export default PrivateRoute;
