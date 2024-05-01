import React, { useState } from 'react';
import './SettingPage.css'; // Import the CSS file for styling
import UserProfileCreation from '../accoutCreatatingFrom/AcFrom'; // Import the UserProfileCreation component

const Settings = () => {
  const [activeTab, setActiveTab] = useState(null); // State to manage active tab

  // Function to handle tab click
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
          <li>
            <a href="#" onClick={() => handleTabClick("report")}>
              <i className="zmdi zmdi-link"></i> Analysis Report
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleTabClick("creation")}>
              <i className="zmdi zmdi-widgets"></i> User Profile Creation
            </a>
          </li>
          <li>
            <a href="#">
              <i className="zmdi zmdi-info-outline"></i> About
            </a>
          </li>
          <li>
          </li>
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

        {/* Render UserProfileCreation component if activeTab is "creation" */}
        {activeTab === "creation" && <UserProfileCreation />}
      </div>
    </div>
  );
}

export default Settings;
