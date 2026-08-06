import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👔</span>
          <h1 className="text-xl font-bold">Employee Management System</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, <b>{user?.username}</b> ({user?.role})</span>
          <button onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg text-sm transition">Logout</button>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-4xl mb-3">👋</div>
            <h2 className="text-2xl font-bold text-gray-800">Hello, {user?.username}!</h2>
            <p className="text-gray-500 mt-1">Role: <span className="font-bold text-blue-600">{user?.role}</span></p>
          </div>
          {user?.role === 'admin' && (
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="text-4xl mb-3">👑</div>
              <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
              <p className="text-gray-500 mt-1 mb-4">Manage all employees</p>
              <button onClick={() => navigate('/employees')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
                View Employees
              </button>
            </div>
          )}
          {user?.role === 'user' && (
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="text-4xl mb-3">👤</div>
              <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
              <p className="text-gray-500 mt-1">You are logged in as an employee</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;