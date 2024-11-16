// ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  return user?.role === 1 ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
