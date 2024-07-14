import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import CreateFourball from './components/CreateFourball';
import ViewFourballs from './components/ViewFourballs';
import ViewScores from './components/ViewScores';
import EnterScore from './components/EnterScore';
import FourballDashboard from './components/FourballDashboard';
import Homepage from './components/Homepage/Homepage';
import { Navigate } from 'react-router-dom';
import HallOfFame from './components/HallOfFame';
import AdminHallOfFame from './components/AdminHallOfFame';
import AdminNewsFlash from './components/AdminNewsFlash';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/halloffame" element={<HallOfFame />} />
          <Route path="/dashboard" element={<PrivateRoute><FourballDashboard /></PrivateRoute>} />
          <Route path="/create-fourball" element={<CreateFourball />} />
          <Route path="/view-fourballs" element={<ViewFourballs />} />
          <Route path="/view-scores/:fourballId" element={<ViewScores />} />
          <Route path="/enter-score" element={<EnterScore />} />
          <Route path="/edit-hall-of-fame" element={<AdminHallOfFame />} />
          <Route path="/news-flash" element={<AdminNewsFlash />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;