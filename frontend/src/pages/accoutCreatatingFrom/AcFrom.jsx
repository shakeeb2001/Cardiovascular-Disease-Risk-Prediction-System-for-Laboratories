import React, { useState } from 'react';
import './AcFrom.css';

const UserProfileCreation = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  const [userRole, setUserRole] = useState('assistant');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setHasImage(true);
  };

  const removeProfilePic = () => {
    setProfilePic(null);
    setHasImage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('mobileNumber', mobileNumber);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('userRole', userRole);
    formData.append('profilePic', profilePic);

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setModalMessage(data.message);
        setShowModal(true);
        setName('');
        setMobileNumber('');
        setAddress('');
        setEmail('');
        setUsername('');
        setPassword('');
        setProfilePic(null);
        setHasImage(false);
        setUserRole('assistant');
      } else {
        console.error('Registration failed:', response.statusText);
        setModalMessage('Registration failed');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setModalMessage('Registration failed');
      setShowModal(true);
    }
  };

  return (
    <div className="container mt-3 reg-from-container">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="text-center">
            <img className="img-fluid rounded-circle mt-3 mb-3" width="150px" src={hasImage ? URL.createObjectURL(profilePic) : 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'} alt="Profile" />
            <div>
              {hasImage ? (
                <button className="btn btn-danger" onClick={removeProfilePic}>Remove Picture</button>
              ) : (
                <div>
                  <label htmlFor="fileInput" className="btn btn-primary mt-2">
                    Choose Profile Picture
                    <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: 'none' }} />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <form onSubmit={handleSubmit}>
            <h4 className="mb-4 title-profile">User Profile Creation</h4>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
              <input type="text" className="form-control" id="mobileNumber" placeholder="Enter phone number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea className="form-control" id="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email ID</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email ID" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userRole"
                  id="assistantRole"
                  value="assistant"
                  checked={userRole === 'assistant'}
                  onChange={() => setUserRole('assistant')}
                />
                <label className="form-check-label" htmlFor="assistantRole">
                  Lab Assistant
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userRole"
                  id="managerRole"
                  value="manager"
                  checked={userRole === 'manager'}
                  onChange={() => setUserRole('manager')}
                />
                <label className="form-check-label" htmlFor="managerRole">
                  Lab Manager
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Save Profile</button>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registration Status</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>{modalMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfileCreation;
