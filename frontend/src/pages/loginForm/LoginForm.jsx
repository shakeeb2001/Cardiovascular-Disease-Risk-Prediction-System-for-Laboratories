import React, { useState } from 'react';
import './LoginForm.css';
import { Button, Container, Row, Col, Card, Form, Spinner, Modal } from 'react-bootstrap'; // Import Modal component
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin, updateNavbar }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true); 
    setError(null); 
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        // Store the username and userRole in local storage
        localStorage.setItem('username', username);
        localStorage.setItem('userRole', data.userRole);
        // Call the onLogin function passed as prop
        onLogin(username, data.userRole);
        navigate('/');
        updateNavbar(data.userData);
      } else {
        setError(data.message); // Set error message when login fails
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in'); // Set error message for other errors
    } finally {
      setIsLoading(false); // Set loading to false when login process finishes
    }
  };
  
  
  
  

  const handleCloseErrorModal = () => {
    setError(null); // Close the error modal
  };

  return (
    <Container fluid className='h-100'>
      <Row className='justify-content-center align-items-center h-100'>
        <Col xs={12}>
          <Card className='text-white my-5 mx-auto login-form' style={{ borderRadius: '1rem', maxWidth: '800px',maxHeight: '500px' }}>
            <Card.Body className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h3 className="fw-bold mb-2 text-uppercase">C A R D I O C A R E <span className='cardio-care'>+</span></h3>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <Form.Group className='mb-4 mx-5 w-100'>
                <Form.Control
                  className='text-white'
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className='mb-4 mx-5 w-100'>
                <Form.Control
                  className='text-white'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant='outline-light' className='mx-2 login-button' size='lg' onClick={handleLogin} disabled={isLoading}>
                {isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  'Login'
                )}
              </Button>

              {/* Error Modal */}
              <Modal show={error !== null} onHide={handleCloseErrorModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseErrorModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
