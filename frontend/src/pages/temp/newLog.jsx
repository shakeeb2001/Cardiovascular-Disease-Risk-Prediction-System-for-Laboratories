// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'; // Import Card from react-bootstrap
// import axios from 'axios'; // You may need to install axios: npm install axios;
// import './newLog.css'; // Make sure the path is correct for your login.css file
// import imageSrc from '../images/temp.jpeg'; // Import your image source here

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate(); // Get history object from React Router

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3001/login', {
//         email,
//         password,
//       });
      
//       // Handle successful login response
//       console.log(response.data);
//       // Navigate to the dashboard after successful login
//       navigate('/');
//     } catch (error) {
//       // Handle login error
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <Container fluid className="login-main">
//       <Row>
//         <Col md={12}>
//           <Card className="login-card">
//             <Row>
//               <Col md={6} className="login-left">
//                 <img src={imageSrc} alt="loginimg" className="image" />
//               </Col>
//               <Col md={6} className="login-right">
//                 <Form onSubmit={handleSubmit} className="login-form">
//                   <h2>Login</h2>
//                   <Form.Group controlId="email">
//                     <Form.Label>Email ID</Form.Label>
//                     <Form.Control
//                       className='form-control'
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </Form.Group>
//                   <Form.Group controlId="password">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </Form.Group>
//                   <Form.Group controlId="remember">
//                     <Form.Check type="checkbox" label="Remember me" />
//                   </Form.Group>
//                   <Button variant="link" onClick={() => console.log('Forgot Password clicked')}>
//                     Forgot Password?
//                   </Button>
//                   <Button variant="primary" type="submit">
//                     LOGIN
//                   </Button>
//                 </Form>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LoginForm;
