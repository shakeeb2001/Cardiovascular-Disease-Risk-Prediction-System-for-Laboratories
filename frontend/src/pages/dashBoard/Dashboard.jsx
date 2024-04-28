import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DashboardBackgroundImage from '../images/LabBackground.jpeg'; // Corrected the import
import './Dashboard.css';

const Dashboard = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${DashboardBackgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',

  };

  return (
    <div className='dash-class' style={backgroundImageStyle}>
      <Container className="mt-5">
        <h1 className="text-left mb-4">Dashboard</h1>
        <Row className="justify-content-center">
          <Col md={3} className="mb-4">
            <Card as={Link} to="/prediction" className="text-center dashboard-card-link">
              <Card.Body>
                <Card.Title>Prediction</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card as={Link} to="/reports" className="text-center dashboard-card-link">
              <Card.Body>
                <Card.Title>Reports</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card as={Link} to="/communication" className="text-center dashboard-card-link">
              <Card.Body>
                <Card.Title>Communication</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card as={Link} to="/settings" className="text-center dashboard-card-link">
              <Card.Body>
                <Card.Title>Settings</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
