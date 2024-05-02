import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SettingPage.css'; 
import UserProfileCreation from '../accoutCreatatingFrom/AcFrom'; 
import Profile from './Profile'; 
import UserProfiles from './UserProfiles'; 

const Settings = ({ loggedInUsername, userRole }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      // Navigate to login page
      navigate('/login');
    }
  };

  return (
    <div id="viewport">
      <div id="sidebar">
        <header>
          <h4 className="fw-bold mb-2 text-uppercase setting-title">C A R D I O C A R E <span className='cardio-care cario-span'>+</span></h4>
        </header>
        <ul className="nav">
          <li>
            <a href="#" onClick={() => handleTabClick("profile")}>
              <i className="zmdi zmdi-view-dashboard"></i> Profile
            </a>
          </li>
          {userRole === "manager" && (
            <li>
              <a href="#" onClick={() => handleTabClick("report")}>
                <i className="zmdi zmdi-link"></i> Analysis Report
              </a>
            </li>
          )}
          {userRole === "manager" && (
            <li>
              <a href="#" onClick={() => handleTabClick("creation")}>
                <i className="zmdi zmdi-widgets"></i> User Creation
              </a>
            </li>
          )}
          <li>
            <a href="#" onClick={() => handleTabClick("userProfiles")}>
              <i className="zmdi zmdi-account"></i> User Profiles
            </a>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              <i className="zmdi zmdi-power"></i> Logout
            </a>
          </li>
          <li>
            <a href="#">
              <i className="zmdi zmdi-info-outline"></i> About
            </a>
          </li>
        </ul>
      </div>
      {/* Content */}
      <div id="content">
        {activeTab === "profile" && <Profile username={loggedInUsername} />}
        {activeTab === "report" && userRole === "manager" && <div>Analysis Report</div>}
        {activeTab === "creation" && userRole === "manager" && <UserProfileCreation username={loggedInUsername} />}
        {activeTab === "userProfiles" && userRole === "manager" && <UserProfiles />}
      </div>
    </div>
  );
}

export default Settings;
