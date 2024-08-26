import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateParcel from './pages/CreateParcel';
import UpdateParcel from './pages/UpdateParcel';
import Login from './pages/Login';
import { AuthProvider } from './Context/AuthContext';

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/parcels/create" element={<CreateParcel />} />
        <Route path="/parcels/edit/:id" element={<UpdateParcel />} />
      </Routes>
    </Router>
  </AuthProvider>
);

console.log('Rendering App component');

export default App;
