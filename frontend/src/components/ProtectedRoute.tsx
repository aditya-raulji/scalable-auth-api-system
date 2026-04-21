import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-6 text-sm text-gray-600">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
