

import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const fetchUserProfiles = async () => {
    try {
      const response = await fetch('http://localhost:4000/user-profiles');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch user profiles');
      }
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    }
  };

  const handleUpdate = (user) => {
    setUpdatedUser(user);
    setShowModal(true);
  };

  const handleSave = async () => {
    // Implement saving updated user data
    console.log('Updated user:', updatedUser);
    setShowModal(false);
    // You may want to refresh the user profiles after updating
    fetchUserProfiles();
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDelete = async (user) => {
    try {
      const response = await fetch(`http://localhost:4000/user-profiles/${user.username}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('User deleted successfully');
        // You may want to refresh the user profiles after deleting
        fetchUserProfiles();
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      <h2>User Profile</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Address</th>
            <th>User Role</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.address}</td>
              <td>{user.userRole}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>
                <Button variant="primary" onClick={() => handleUpdate(user)}>Update</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(user)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update User Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Add form fields for updating user data */}
            {/* Example:
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={updatedUser ? updatedUser.name : ''} onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })} />
            </Form.Group>
            */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserProfile;
