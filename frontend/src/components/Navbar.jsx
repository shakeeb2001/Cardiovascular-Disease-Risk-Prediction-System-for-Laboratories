import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"> <h6 className="fw-bold mb-2 text-uppercase navbar-text">C A R D I O C A R E <span className='cardio-care'>+</span></h6></Link>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
