import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/employees/EmployeeList';
import AddEmployee from './pages/employees/AddEmployee';
import EditEmployee from './pages/employees/EditEmployee';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/employees" element={<PrivateRoute adminOnly={true}><EmployeeList /></PrivateRoute>} />
          <Route path="/employees/add" element={<PrivateRoute adminOnly={true}><AddEmployee /></PrivateRoute>} />
          <Route path="/employees/edit/:id" element={<PrivateRoute adminOnly={true}><EditEmployee /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;