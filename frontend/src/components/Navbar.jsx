import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const [userData, setUserData] = useState(null);

  const location = useLocation();
  const navigate = useNavigate(); 

  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/register/${username}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      fetchUserData(username);
    }
  }, []);

  const handleSignout = () => {
    const confirmSignout = window.confirm("Are you sure you want to sign out?");
    if (confirmSignout) {
      console.log("Signout button clicked");
      localStorage.clear();
      setUserData(null);
      navigate('/home');
    }
  };

  const isLoginPage = location.pathname === '/login';
  const isLoginHome = location.pathname === '/home';

  const isReportPage = location.pathname === '/reports';
  const isCommunicationPage = location.pathname === '/communication';
  const isSettingsPage = location.pathname === '/settings';
  const isPredictionPage = location.pathname === '/prediction';
  const isRegisterPage = location.pathname === '/register';


  return (
    !isLoginPage && !isLoginHome && (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">
            <h6 className="fw-bold mb-2 text-uppercase navbar-text">
              C A R D I O C A R E <span className='cardio-care'>+</span>
            </h6>
          </Link>
          {(isReportPage || isCommunicationPage || isSettingsPage || isPredictionPage || isRegisterPage) && (
            <div className="d-flex justify-content-center w-100">
              <h5 className="fw-bold mb-2 navbar-text text-nav-center">
                {isReportPage && 'Patient Reports'}
                {isCommunicationPage && 'Communication'}
                {isSettingsPage && 'Settings'}
                {isPredictionPage && 'Prediction'}
                {isRegisterPage && 'Register'}
              </h5>
            </div>
          )}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {userData && (
                  <div className="nav-item dropdown">
                    <button className="btn dropdown-toggle" type="button" id="profileDropdown"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      <img
                        src={`http://127.0.0.1:4000${userData.profilePicUrl}`}
                        alt="Profile"
                        className="rounded-circle me-1"
                        style={{ width: '40px', height: '40px' }}
                      />
                      {userData.name}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                      <li><a className="dropdown-item" href="http://localhost:3000/settings">Profile</a></li>
                      <li><button className="dropdown-item" onClick={handleSignout}>Logout</button></li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  );
};

export default Navbar;
