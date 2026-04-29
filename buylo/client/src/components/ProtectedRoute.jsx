import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div className="container">Checking access...</div>;

  // 1. Check if user exists at all
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  
  if (adminOnly && user.user_role !== 'manager') {
    console.warn("Access denied: User is not a manager");
    return <Navigate to="/" replace />;
  }

  // If everything is okay, render the page
  return children; 
};

export default ProtectedRoute;