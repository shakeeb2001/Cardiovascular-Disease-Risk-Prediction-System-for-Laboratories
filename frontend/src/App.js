import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import NewLog from './pages/temp/newLog'
import Navbar from './components/Navbar';
import LoginHome from './pages/loginForm/LoginHome';
import Settings from './pages/settingsPage/SettingPage';
 import Communication from './pages/communication/Communication';
import Dashboard from './pages/dashBoard/Dashboard';
import Reports from './pages/Reports/Report';
import LoginForm from './pages/loginForm/LoginForm';
import SignOutForm from './pages/signout/signout';
import InputForm from './pages/predicationForm/InputForm';
import Result from './pages/predicationForm/Result';
import ReportPage from './pages/Reports/Report'; 
import AcForm from './pages/accoutCreatatingFrom/AcFrom';

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState(null); // State to store logged-in username
  const [results, setResults] = useState(null);
  const [userRole, setUserRole] = useState(null); // State to store user role

  const handleLogin = (username, userRole) => {
    setLoggedInUsername(username);
    setUserRole(userRole);

  };

  


  return (
    <Router>
      <Navbar/>
    <Routes>
     
      <Route path="/home" element={<LoginHome />} />
      <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
      <Route path="/" element={<Dashboard username={loggedInUsername} userRole={userRole} />} />
      <Route path="/reports" element={<Reports userRole={userRole} /> } />
      <Route path="/settings" element={<Settings userRole={userRole} />} />
      <Route path="/communication" element={<Communication userRole={userRole} username={loggedInUsername}/>} />
      <Route path="/signout" element={<SignOutForm />} />
      <Route path="/prediction" element={<InputForm setResults={setResults} userRole={userRole} />} />
      <Route path="/result" element={<Result results={results} userRole={userRole} />} />
      <Route path="/report" element={<ReportPage userRole={userRole} />} /> 
      <Route path="/register" element={<AcForm userRole={userRole} />} /> 
    </Routes>
  </Router>
  );
}

export default App;