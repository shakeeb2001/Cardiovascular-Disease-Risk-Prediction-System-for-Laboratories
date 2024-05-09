import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SettingPage.css'; 
import UserProfileCreation from '../accoutCreatatingFrom/AcFrom'; 
import Profile from './Profile'; 
import UserProfiles from './UserProfiles'; 

const Settings = ({ loggedInUsername }) => {
  const [userData, setUserData] = useState(null);
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

  return (
    <div id="viewport">
      <div id="sidebar">
        <ul className="nav">
          <li>
            <a href="#" className={activeTab === "profile" ? "active" : ""} onClick={() => handleTabClick("profile")}>
              <i className="zmdi zmdi-view-dashboard"></i>
              <i className="fas fa-user"></i> Profile
            </a>
          </li>
          {userRole === "manager" && (
            <li>
              <a href="#" className={activeTab === "report" ? "active" : ""} onClick={() => handleTabClick("report")}>
                <i className="zmdi zmdi-link"></i>
                <i className="fas fa-chart-line"></i> Analysis Report
              </a>
            </li>
          )}
          {userRole === "manager" && (
            <li>
              <a href="#" className={activeTab === "creation" ? "active" : ""} onClick={() => handleTabClick("creation")}>
                <i className="zmdi zmdi-widgets"></i>
                <i className="fas fa-user-plus"></i> User Creation
              </a>
            </li>
          )}
          {userRole === "manager" && (
            <li>
              <a href="#" className={activeTab === "userProfiles" ? "active" : ""} onClick={() => handleTabClick("userProfiles")}>
                <i className="zmdi zmdi-account"></i>
                <i className="fas fa-users"></i> User Profiles
              </a>
            </li>
          )}
          <li>
            <a href="#" className={activeTab === "about" ? "active" : ""} onClick={() => handleTabClick("about")}>
              <i className="zmdi zmdi-info-outline"></i>
              <i className="fas fa-info-circle"></i> About
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
        {activeTab === "about" && <div>About</div>}
      </div>
    </div>
  );
}

export default Settings;
