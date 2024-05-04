import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DashboardBackgroundImage from '../images/LabBackground.jpeg';
import RiskChart from './RiskChart';
import './Dashboard.css';

const Dashboard = () => {
  const [patientCount, setPatientCount] = useState(0);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || ''); 

  useEffect(() => {
    fetchPatientCount();
  }, []);

  useEffect(() => {
    // Save userRole to local storage whenever it changes
    localStorage.setItem('userRole', userRole);
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, [userRole]); 

  const fetchPatientCount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4000/patient-count');
      const data = await response.json();
      setPatientCount(data.count);
    } catch (error) {
      console.error('Error fetching patient count:', error);
    }
  };


  return (
    <div className='dash-class'>
      <Container className="mt-5">
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
        {/* Render RiskChart component here */}
        <Row className="justify-content-center">
          <Col md={8} className="mb-4">
            <RiskChart />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
