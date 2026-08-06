import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployee() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', department: '', position: '', salary: '', joinDate: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5001/api/employees/${id}`)
      .then(res => setForm(res.data))
      .catch(() => setError('Employee not found!'));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/employees/${id}`, form);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👔</span>
          <h1 className="text-xl font-bold">Employee Management System</h1>
        </div>
        <button onClick={() => navigate('/employees')}
          className="bg-white text-blue-700 hover:bg-gray-100 px-4 py-1 rounded-lg text-sm font-semibold transition">← Back</button>
      </nav>
      <div className="max-w-2xl mx-auto mt-10 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">✏️ Edit Employee</h2>
          {error && <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Full Name', name: 'name', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Phone', name: 'phone', type: 'text' },
              { label: 'Department', name: 'department', type: 'text' },
              { label: 'Position', name: 'position', type: 'text' },
              { label: 'Salary', name: 'salary', type: 'number' },
              { label: 'Join Date', name: 'joinDate', type: 'date' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input name={field.name} type={field.type} value={form[field.name] || ''}
                  onChange={handleChange} required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            ))}
            <button type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition duration-200">
              Update Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;