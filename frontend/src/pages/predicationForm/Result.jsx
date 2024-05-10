import React from 'react';
import PercentageCircle from './PercentageCircle'; 
import './Result.css';
import WecomeBackground from '../images/LabBackground.jpeg';

function Result({ results }) {
    const { risk_level_percentage, result, stress_level } = results;

    // Determine card color based on result and stress levels
    let riskColorClass = '';
    let stressColorClass = '';
    if (result === 'Low') {
        riskColorClass = 'low-risk';
    } else if (result === 'Medium') {
        riskColorClass = 'medium-risk';
    } else if (result === 'High') {
        riskColorClass = 'high-risk';
    }
    if (stress_level === 'Low') {
        stressColorClass = 'low-stress';
    } else if (stress_level === 'Medium') {
        stressColorClass = 'medium-stress';
    }

    const backgroundImageStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url(${WecomeBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };

    return (
        <div style={backgroundImageStyle}>
            <div className="container mt-7 main-con-result">
                {/* Display Risk Level Percentage as a Circular Progress Bar */}
                <div className={`card result-item mb-3 ${riskColorClass}`}>
                <div className="card-body d-flex flex-column align-items-center">
    <h3 className="card-title">Risk Level Percentage</h3>
    <PercentageCircle percent={risk_level_percentage} circleSize={150} style={{ alignSelf: 'center' }} />
</div>

                </div>

                {/* Display Risk Level and Stress Level in the same row */}
                <div className="row">
                    <div className="col-md-6">
                        <div className={`card result-item mb-4 risk-category ${riskColorClass}`}>
                            <div className="card-body">
                                <h3 className="card-title">Risk Level</h3>
                                <p className="card-text text-center">{result}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={`card result-item mb-4 stress-level ${stressColorClass}`}>
                            <div className="card-body">
                                <h3 className="card-title">Stress Level</h3>
                                <p className="card-text text-center">{stress_level}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Result;
