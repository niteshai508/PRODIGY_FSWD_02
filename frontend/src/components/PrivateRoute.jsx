import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="text-white text-2xl font-bold animate-pulse">Loading...</div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && user.role !== 'admin') return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-red-600">Access Denied!</h2>
        <p className="text-gray-500 mt-2">Sirf Admins is page ko dekh sakte hain!</p>
        <a href="/dashboard" className="mt-4 inline-block text-blue-600 hover:underline">Dashboard pe wapas jao</a>
      </div>
    </div>
  );

  return children;
};

export default PrivateRoute;