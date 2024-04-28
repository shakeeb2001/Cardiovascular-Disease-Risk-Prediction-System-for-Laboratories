import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginHome from './pages/loginForm/LoginHome';
import Dashboard from './pages/dashBoard/Dashboard';
import LoginForm from './pages/loginForm/LoginForm';
import SignOutForm from './pages/signout/signout';
import InputForm from './pages/predicationForm/InputForm';
import Result from './pages/predicationForm/Result';
import ReportPage from './pages/reports/report'; 
import AcForm from './pages/accoutCreatatingFrom/AcFrom';

function App() {
  const [results, setResults] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<LoginHome />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signout" element={<SignOutForm />} />
        <Route path="/prediction" element={<InputForm setResults={setResults} />} />
        <Route path="/result" element={<Result results={results} />} />
        <Route path="/report" element={<ReportPage />} /> 
        <Route path="/register" element={<AcForm />} /> 
      </Routes>
    </Router>
  );
}

export default App;
