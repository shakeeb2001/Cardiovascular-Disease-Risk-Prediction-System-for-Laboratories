import React, { useState } from 'react';
import './LoginForm.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
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
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in');
    }
  };

  
  return (
    <MDBContainer fluid className='h-100'>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='text-white my-5 mx-auto login-form' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h3 className="fw-bold mb-2 text-uppercase">C A R D I O C A R E <span className='cardio-care'>+</span></h3>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <MDBInput 
                wrapperClass='mb-4 mx-5 w-100' 
                labelClass='text-white' 
                placeholder='Username' 
                id='username' 
                type='text' 
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <MDBInput 
                wrapperClass='mb-4 mx-5 w-100' 
                labelClass='text-white' 
                placeholder='Password' 
                id='password' 
                type='password' 
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBBtn outline className='mx-2 px-5 login-button' onClick={handleLogin}>
                Login
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginForm;
