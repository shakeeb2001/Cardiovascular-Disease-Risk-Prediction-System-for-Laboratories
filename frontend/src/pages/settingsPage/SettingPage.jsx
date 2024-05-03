import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SettingPage.css'; 
import UserProfileCreation from '../accoutCreatatingFrom/AcFrom'; 
import Profile from './Profile'; 
import UserProfiles from './UserProfiles'; 

const Settings = ({ loggedInUsername }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || ''); 
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Save userRole to local storage whenever it changes
    localStorage.setItem('userRole', userRole);
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, [userRole]); // Add userRole to dependencies to update activeTab when userRole changes

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Store active tab in localStorage if user is a manager
    if (userRole === "manager") {
      localStorage.setItem("activeTab", tab);
    }
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
        <ul className="nav">
          <li>
            <a href="#" className={activeTab === "profile" ? "active" : ""} onClick={() => handleTabClick("profile")}>
              <i className="zmdi zmdi-view-dashboard"></i> Profile
            </a>
          </li>
          {userRole === "manager" && (
            <li>
              <a href="#" className={activeTab === "report" ? "active" : ""} onClick={() => handleTabClick("report")}>
                <i className="zmdi zmdi-link"></i> Analysis Report
              </a>
            </li>
          )}
          {userRole === "manager" && (
            <li>
              <a href="#" className={activeTab === "creation" ? "active" : ""} onClick={() => handleTabClick("creation")}>
                <i className="zmdi zmdi-widgets"></i> User Creation
              </a>
            </li>
          )}
          {userRole === "manager" && (
            <li>
              <a href="#" className={activeTab === "userProfiles" ? "active" : ""} onClick={() => handleTabClick("userProfiles")}>
                <i className="zmdi zmdi-account"></i> User Profiles
              </a>
            </li>
          )}
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
