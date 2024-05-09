import React, { useEffect, useState } from 'react';
import './LoginHome.css';
import { Container, Card } from 'react-bootstrap';
import WelcomeBackground from '../images/welcome_background.jpeg';
import Propic from '../images/propic.png';
import { Link } from 'react-router-dom';


function WelcomePage() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url(${WelcomeBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    opacity: fadeIn ? 1 : 0,
    transition: 'opacity 1s ease-in-out',
  };

  return (
    <Container fluid className="welcomehome" style={backgroundImageStyle}>
      <Card className='title-card-two'>
        <h1 className="fw-bold mb-2 home-title-class">C A R D I O C A R E <span className='cardio-care'>+</span></h1>
        <Link to="/login">
           <img src={Propic} alt="Profile" className="propic" style={{ height: '50px', width: '50px' }} />
        </Link>

      </Card>


      <Card className='Para-card'>
        <h1 className='title-card-one-welcome'>Welcome</h1>
        <p className='content'>
          Welcome to Cardiovascular Risk Prediction System At Cardio Care, where we prioritize your heart health above all else. Our innovative risk prediction system integrates state-of-the-art technology with unparalleled medical expertise to offer comprehensive insights tailored specifically to your cardiovascular health. Through meticulous analysis and advanced algorithms, we delve deep into your medical history, lifestyle factors, and genetic predispositions to generate a detailed profile of your individual risk factors.
        </p>
        <div className="mt-4">
          <Link to="/login">
            <button className='btn welcome-button'>Sign In</button>
          </Link>
        </div>
      </Card>
    </Container>
  );
}

export default WelcomePage;
