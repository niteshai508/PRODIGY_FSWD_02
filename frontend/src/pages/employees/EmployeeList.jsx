import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { fetchEmployees(); }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/employees/${id}`);
      fetchEmployees();
    } catch (err) { console.error(err); }
  };

  const handleLogout = async () => { await logout(); navigate('/login'); };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👔</span>
          <h1 className="text-xl font-bold">Employee Management System</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')}
            className="bg-white text-blue-700 hover:bg-gray-100 px-4 py-1 rounded-lg text-sm font-semibold transition">Dashboard</button>
          <button onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg text-sm transition">Logout</button>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto mt-10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">👥 All Employees</h2>
          <button onClick={() => navigate('/employees/add')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition">
            + Add Employee
          </button>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : employees.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-gray-500">No employees found! Add one.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Department</th>
                  <th className="py-3 px-4 text-left">Position</th>
                  <th className="py-3 px-4 text-left">Salary</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr key={emp.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">{emp.name}</td>
                    <td className="py-3 px-4">{emp.email}</td>
                    <td className="py-3 px-4">{emp.department}</td>
                    <td className="py-3 px-4">{emp.position}</td>
                    <td className="py-3 px-4">₹{emp.salary.toLocaleString()}</td>
                    <td className="py-3 px-4 flex gap-2">
                      <button onClick={() => navigate(`/employees/edit/${emp.id}`)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs transition">✏️ Edit</button>
                      <button onClick={() => handleDelete(emp.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs transition">🗑️ Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;