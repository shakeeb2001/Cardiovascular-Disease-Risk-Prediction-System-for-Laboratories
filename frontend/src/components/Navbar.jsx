// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const location = useLocation(); // Get the current route

  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/register/${username}`);
      console.log('Response:', response.data); 
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch user data when the component mounts and whenever the username changes
  useEffect(() => {
    if (username) {
      fetchUserData(username);
    }
  }, [username]);

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  // Function to update user data in Navbar
  const updateNavbar = (userData) => {
    setUserData(userData);
  };

  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/login';

  // Render the Navbar only if it's not the login page
  return (
    !isLoginPage && (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h6 className="fw-bold mb-2 text-uppercase navbar-text">
              C A R D I O C A R E <span className='cardio-care'>+</span>
            </h6>
          </Link>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                {userData && (
                  <div>
                    <img
                      src={`http://127.0.0.1:4000${userData.profilePicUrl}`} 
                      alt="Profile"
                      className="rounded-circle me-1"
                      style={{ width: '40px', height: '40px' }}
                    />
                    {userData.name}
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
