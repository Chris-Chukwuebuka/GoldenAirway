import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import UpdateParcel from './Components/UpdateParcel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update-parcel/:_id" element={<UpdateParcel />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
