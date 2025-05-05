import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function PrivateRoute({ children, role }) {
  const { user,loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-gray-500 text-lg">Checking Authentication...</div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />; // Unauthorized page
  }

  return children;
}

export default PrivateRoute;
