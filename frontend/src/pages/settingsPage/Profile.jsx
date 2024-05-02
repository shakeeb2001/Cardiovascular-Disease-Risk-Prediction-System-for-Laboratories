import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';

const Profile = ({ username }) => {
  const [userData, setUserData] = useState(null);

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
    if (username !== undefined && username !== null) {
      fetchUserData(username);
    }
  }, [username]);
  
  
  

  return (
    <section className="bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-4 mb-sm-5">
            <div className="card card-style1 border-0">
              <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                <div className="row align-items-center">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <img src={userData && userData.profilePicUrl} alt="Profile Picture" />
                  </div>
                  <div className="col-lg-6 px-xl-10">
                    <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                      <h3 className="h2 text-white mb-0">{userData && userData.name}</h3>
                      <span className="text-primary">Role: {userData && userData.userRole}</span>
                    </div>
                    <ul className="list-unstyled mb-1-9">
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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserProfile = ({ username }) => {
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:4000/register/${username}`);
//         setUserData(response.data);
//       } catch (error) {
//         setError('Failed to fetch user profile');
//       }
//     };

//     fetchUserProfile();

//     // Cleanup function
//     return () => {
//       setUserData(null);
//       setError(null);
//     };
//   }, [username]);

//   if (error) {
//     return <div className="alert alert-danger">{error}</div>;
//   }

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">User Profile</h5>
//           <p className="card-text">Name: {userData.name}</p>
//           <p className="card-text">Mobile Number: {userData.mobileNumber}</p>
//           <p className="card-text">Address: {userData.address}</p>
//           <p className="card-text">Email: {userData.email}</p>
//           <p className="card-text">Username: {userData.username}</p>
//           <p className="card-text">User Role: {userData.userRole}</p>
//           {userData.profilePicUrl && (
//             <img src={userData.profilePicUrl} alt="Profile" className="img-fluid" />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;



