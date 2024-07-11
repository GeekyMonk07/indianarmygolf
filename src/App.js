import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
// import UserDashboard from './components/UserDashboard';
import CreateFourball from './components/CreateFourball';
import ViewFourballs from './components/ViewFourballs';
import ViewScores from './components/ViewScores';
import EnterScore from './components/EnterScore';
import FourballDashboard from './components/FourballDashboard';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          {/* <Route path="/user" element={<UserDashboard />} /> */}
          <Route path="/dashboard" element={<PrivateRoute><FourballDashboard /></PrivateRoute>} />
          <Route path="/create-fourball" element={<CreateFourball />} />
          <Route path="/view-fourballs" element={<ViewFourballs />} />
          <Route path="/view-scores/:fourballId" element={<ViewScores />} />
          <Route path="/enter-score" element={<EnterScore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;