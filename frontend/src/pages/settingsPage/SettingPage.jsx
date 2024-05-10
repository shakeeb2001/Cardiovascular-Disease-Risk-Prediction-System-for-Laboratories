// Settings.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SettingPage.css'; 
import UserProfileCreation from '../accoutCreatatingFrom/AcFrom'; 
import Profile from './Profile'; 
import UserProfiles from './UserProfiles'; 
import Analysis from './Analysis'; 

const Settings = ({ loggedInUsername,patientCountByMonth }) => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || ''); 
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate(); 

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, [userRole]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
              <a href="#" className={activeTab === "analysis" ? "active" : ""} onClick={() => handleTabClick("analysis")}>
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
           
          </li>
        </ul>
      </div>
      {/* Content */}
      <div id="content">
        {activeTab === "profile" && <Profile username={loggedInUsername} />}
        {activeTab === "analysis" && userRole === "manager" && <Analysis patientCountByMonth={patientCountByMonth} />}
        {activeTab === "creation" && userRole === "manager" && <UserProfileCreation username={loggedInUsername} />}
        {activeTab === "userProfiles" && userRole === "manager" && <UserProfiles />}
      </div>
    </div>
  );
}

export default Settings;
