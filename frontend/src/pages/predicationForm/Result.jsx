import React from 'react';
import PercentageCircle from './PercentageCircle'; // Make sure to import your PercentageCircle component

function Result({ results }) {
    const { risk_level_percentage, result, stress_level } = results;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Results</h2>
            
            {/* Display Risk Level Percentage as a Circular Progress Bar */}
            <div className="card result-item mb-4">
                <div className="card-body">
                    <h3 className="card-title">Risk Level Percentage</h3>
                    <PercentageCircle percent={risk_level_percentage} circleSize={150} />
                </div>
            </div>

            {/* Display Risk Level */}
            <div className="card result-item mb-4">
                <div className="card-body">
                    <h3 className="card-title">Risk Level</h3>
                    <p className="card-text">{result}</p>
                </div>
            </div>

            {/* Display Stress Level */}
            <div className="card result-item">
                <div className="card-body">
                    <h3 className="card-title">Stress Level</h3>
                    <p className="card-text">{stress_level}</p>
                </div>
            </div>
        </div>
    );
}

export default Result;
