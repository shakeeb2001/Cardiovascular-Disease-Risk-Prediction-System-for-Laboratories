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

  const handleUpdate = async (user) => {
    try {
      const response = await fetch(`http://localhost:4000/user-profiles/${user.username}`);
      if (response.ok) {
        const userData = await response.json();
        setUpdatedUser(userData);
        setShowModal(true);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:4000/user-profiles/${updatedUser.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        console.log('User updated successfully');
        setShowModal(false);
        fetchUserProfiles();
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
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
        fetchUserProfiles();
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" name="name" value={updatedUser ? updatedUser.name : ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={updatedUser ? updatedUser.email : ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" placeholder="Enter mobile number" name="mobileNumber" value={updatedUser ? updatedUser.mobileNumber : ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter address" name="address" value={updatedUser ? updatedUser.address : ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formUserRole">
              <Form.Label>User Role</Form.Label>
              <Form.Control as="select" name="userRole" value={updatedUser ? updatedUser.userRole : ''} onChange={handleChange}>
                <option value="manager">Manager</option>
                <option value="assistant">Assistant</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name="username" value={updatedUser ? updatedUser.username : ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" name="password" value={updatedUser ? updatedUser.password : ''} onChange={handleChange} />
            </Form.Group>
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
