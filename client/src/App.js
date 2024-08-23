import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import CreateParcel from './Components/CreateParcel';
import EditParcel from './Components/UpdateParcel';
import TrackParcel from './Components/TrackParcel';
import LandingPage from './Components/LandingPage';
import AboutPage from './Components/AboutPage';
import ServicesPage from './Components/ServicesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-parcel" element={<CreateParcel />} />
        <Route path="/edit-parcel/:id" element={<EditParcel />} />
        <Route path="/track-parcel" element={<TrackParcel />} />
      </Routes>
    </Router>
  );
}

export default App;
