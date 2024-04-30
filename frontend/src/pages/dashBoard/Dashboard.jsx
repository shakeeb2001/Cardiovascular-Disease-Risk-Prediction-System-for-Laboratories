import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DashboardBackgroundImage from '../images/LabBackground.jpeg';
import './Dashboard.css';

const Dashboard = () => {
  const [patientCount, setPatientCount] = useState(0);

  useEffect(() => {
    fetchPatientCount();
  }, []);

  const fetchPatientCount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4000/patient-count');
      const data = await response.json();
      setPatientCount(data.count);
    } catch (error) {
      console.error('Error fetching patient count:', error);
    }
  };

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
                <div className="d-flex justify-content-between">
                  <div className="text-left">
                    <Card.Title className='card-title'>Reports</Card.Title>
                  </div>
                  <div className="text-right">
                    <Card.Text className='count'> {patientCount}</Card.Text>
                  </div>
                </div>
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
