import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  // Function to fetch user data
  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/register/${username}`);
      console.log('Response:', response.data); 
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch user data on component mount and when username changes
  useEffect(() => {
    console.log("Username:", username);
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

  return (
    <section className="bg-none">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-4 mb-sm-5 ">
            <div className="card card-style1 border-0">
              <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                <div className="row align-items-center new">
                  <div className="col-lg-6 mb-4 mb-lg-0 profile-pic">
                    {userData && userData.profilePicUrl && (
                      <img 
                      src={`http://127.0.0.1:4000${userData.profilePicUrl}`} 
                      alt="Profile Picture" 
                      style={{ 
                          width: '100%', /* Set width to 100% for responsiveness */
                          maxWidth: '250px', /* Set max width to maintain aspect ratio */
                          height: 'auto', /* Automatically adjust height */
                          borderRadius: '50%' 
                      }}
                  />
                  
                    )}
                  </div>
                  <div className="col-lg-6 px-xl-10">
                    <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                      <h3 className="h2 text-white mb-0 pro-name">{userData && userData.name}</h3>
                      <span className="text-primary">Role: {userData && userData.userRole}</span>
                    </div>
                    <ul className="list-unstyled mb-1-9 ul-list">
                      <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">Email:</span> {userData && userData.email}
                      </li>
                      <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">Address:</span> {userData && userData.address}
                      </li>
                      <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">Phone Number:</span> {userData && userData.mobileNumber}
                      </li>
                      <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">Username:</span> {userData && userData.username}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
