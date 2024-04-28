import React, { useState } from 'react';
import axios from 'axios';

function ReportPage() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:4000/sendData', {
                // your data here
            });
            setData(response.data);
        } catch (err) {
            setError('Error fetching data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Health Risk Report</h1>
            
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary" onClick={fetchData} disabled={isLoading}>
                    {isLoading ? 'Fetching...' : 'Fetch Data'}
                </button>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {data && (
                <div className="mt-4">
                    <h2>Risk Level: {data.result}</h2>
                    <p>Risk Level Percentage: {data.risk_level_percentage}%</p>
                    <p>Stress Level: {data.stress_level}</p>
                </div>
            )}
        </div>
    );
}

export default ReportPage;
