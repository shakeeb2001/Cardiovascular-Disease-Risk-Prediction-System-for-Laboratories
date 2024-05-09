// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WecomeBackground from '../images/LabBackground.jpeg';
import RiskChart from './RiskChart';
import './Dashboard.css';

const Dashboard = () => {
  const [patientCount, setPatientCount] = useState(0);
  const [predictionCount, setPredictionCount] = useState(0);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [managerNotificationCount, setManagerNotificationCount] = useState(0);
  const [assistantNotificationCount, setAssistantNotificationCount] = useState(0);

  useEffect(() => {
    fetchPatientCount();
    fetchPredictionCount();
    fetchMessages();
  }, []);

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
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

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:4000/messages');
      const data = await response.json();
      
      let managerCount = 0;
      let assistantCount = 0;
      data.forEach(msg => {
        if (msg.sender === 'assistant' && userRole === 'manager') {
          managerCount++;
        } else if (msg.sender === 'manager' && userRole === 'assistant') {
          assistantCount++;
        }
      });
      
      setManagerNotificationCount(managerCount);
      setAssistantNotificationCount(assistantCount);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchPredictionCount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4000/prediction-count');
      const data = await response.json();
      setPredictionCount(data.count);
    } catch (error) {
      console.error('Error fetching prediction count:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='dash-class'>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={3} className="mb-4">
            <Card as={Link} to="/prediction" className="text-center dashboard-card-link">
              <Card.Body>
                <Card.Title className='card-title'>Prediction</Card.Title>
                <Card.Text className='count'>{predictionCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-4">
            <Card as={Link} to="/reports" className="text-center dashboard-card-link">
              <Card.Body>
                <Card.Title className='card-title'>Reports</Card.Title>
                <Card.Text className='count'>{patientCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-4">
            <Card as={Link} to="/communication" className="text-center dashboard-card-link">
              <Card.Body>
                <Card.Title className='card-title'>Communication</Card.Title>
                {userRole === 'manager' && managerNotificationCount > 0 && <div className="notification notify-size">{managerNotificationCount} new messages from assistant</div>}
                {userRole === 'assistant' && assistantNotificationCount > 0 && <div className="notification notify-size">{assistantNotificationCount} new messages from manager</div>}
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-4">
            <Card as={Link} to="/settings" className="text-center dashboard-card-link">
              <Card.Body>
                <Card.Title className='card-title'>Settings</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
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
