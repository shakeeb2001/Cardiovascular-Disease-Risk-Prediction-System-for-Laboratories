import React, { useState } from 'react';
import './profileDropdown.css';
import { BsFillPersonFill } from 'react-icons/bs'; // Import Bootstrap icon for the profile

// Dropdown Component
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = () => {
    // Logic to navigate to profile page
    console.log('Navigating to profile page');
  };

  const handleSignOutClick = () => {
    // Logic to sign out
    console.log('Signing out');
  };

  return (
    <div className="dropdown">
      <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button" 
        onClick={toggleDropdown}
      >
        <BsFillPersonFill className="profile-icon" />
        <span className="username">Username</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={handleProfileClick}>Profile</li>
          <li onClick={handleSignOutClick}>Sign out</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
