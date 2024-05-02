import React, { useState } from 'react';
import './SettingPage.css'; // Import the CSS file for styling
import UserProfileCreation from '../accoutCreatatingFrom/AcFrom'; // Import the UserProfileCreation component
import Profile from './Profile'; // Import the Profile component

const Settings = ({ loggedInUsername, userRole }) => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
          {userRole === "manager" && ( // Render "Analysis Report" tab only for managers
            <li>
              <a href="#" onClick={() => handleTabClick("report")}>
                <i className="zmdi zmdi-link"></i> Analysis Report
              </a>
            </li>
          )}
          {userRole === "manager" && ( // Render "User Profile Creation" tab only for managers
            <li>
              <a href="#" onClick={() => handleTabClick("creation")}>
                <i className="zmdi zmdi-widgets"></i> User Profile Creation
              </a>
            </li>
          )}
          <li>
            <a href="#">
              <i className="zmdi zmdi-info-outline"></i> About
            </a>
          </li>
          <li></li>
          <li></li>
        </ul>
      </div>
      {/* Content */}
      <div id="content">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#"><i className="zmdi zmdi-notifications text-danger"></i></a>
              </li>
            </ul>
          </div>
        </nav>
        {activeTab === "creation" && userRole === "manager" && <UserProfileCreation username={loggedInUsername} />}
        {activeTab === "profile" && <Profile username={loggedInUsername} />}
      </div>
    </div>
  );
}

export default Settings;
