import React from 'react';
import { useNavigate } from 'react-router-dom';
import './signout.css'; // Import custom CSS file

function SignOutPage() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Perform sign out actions here if needed
    alert('Signed out successfully!');
    // Navigate to login page
    navigate('/login');
  };

  const handleCancel = () => {
    // Navigate to another page or perform other actions if needed
    navigate('/');
  };

  return (
    <div className="signout-container">
      <div className="signout-card">
      <h3 className="fw-bold mb-2 text-uppercase">C A R D I O C A R E <span className='cardio-care'>+</span></h3>
        <div className="signout-content">
          <h5 className="signout-title">Are you sure you want to sign out?</h5>
          <div className="signout-buttons">
            <button className="btn btn-secondary" onClick={handleSignOut}>Yes</button>
            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignOutPage;
