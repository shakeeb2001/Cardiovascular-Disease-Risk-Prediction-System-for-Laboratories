import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import './RiskChart.css';

function ApexChart() {
    const [riskData, setRiskData] = useState({});
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        // Fetch risk percentages from the server
        axios.get('http://127.0.0.1:4000/risk-percentage')
            .then(response => {
                setRiskData(response.data);
                setLoading(false); // Data fetching complete, set loading to false
            })
            .catch(error => {
                console.error('Error fetching risk percentages:', error);
                setLoading(false); // Set loading to false in case of error
            });
    }, []);

    const getChartData = () => {
        if (Object.keys(riskData).length === 0) {
            // If riskData is empty, return an empty array
            return [];
        }

        const counts = [0, 0, 0, 0, 0, 0, 0, 0]; // For thresholds 20, 30, 40, 50, 60, 70, 80, 90

        Object.values(riskData).forEach(riskPercentageCounts => {
            Object.entries(riskPercentageCounts).forEach(([riskPercentage, count]) => {
                const percentage = parseInt(riskPercentage);
                for (let i = 0; i < counts.length; i++) {
                    if (percentage <= (i + 2) * 10) {
                        counts[i] += count; 
                    }
                }
            });
        });

        return counts;
    };

    const chartData = getChartData();

    return (
        <div className='chat-div'>
            {loading ? ( // Show loading message while data is being fetched
                <p>Loading...</p>
            ) : (
                <div id="chart">
                             <h3>Patient Risk Analysis</h3>
                    <div id="chart-timeline">
                        <ReactApexChart
                            options={{
                                chart: {
                                    id: 'bar-chart',
                                    type: 'bar',
                                    height: 380,
                                    toolbar: {
                                        show: false
                                    }
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false,
                                        columnWidth: '55%',
                                        endingShape: 'flat',
                                        barHeight: '80%' // Increase the space between bars
                                    },
                                },
                                xaxis: {
                                    categories: ['20', '30', '40', '50', '60', '70', '80', '90'],
                                    labels: {
                                        show: true,
                                        style: {
                                            colors: '#ffffff' // Set x-axis text color to white
                                        }
                                    },
                                    axisBorder: {
                                        show: true,
                                        color: '#ffffff' // Set color to white for x-axis grid lines
                                    },
                                    axisTicks: {
                                        show: true,
                                        color: '#ffffff' // Set color to white for x-axis ticks
                                    }
                                },
                                yaxis: {
                                    min: 0,
                                    labels: {
                                        formatter: function (value) {
                                            return value.toFixed(0);
                                        },
                                        style: {
                                            colors: '#ffffff', // Set y-axis text color to white
                                            fontSize: '14px' // Increase font size of y-axis labels
                                        }

                                    }
                                },
                                fill: {
                                    colors: ['#ffffff'] // Set color to white for bars
                                },
                                dataLabels: {
                                    enabled: false
                                },
                                grid: {
                                    show: true,
                                    borderColor: '#ffffff', // Set color to white for grid lines
                                    strokeDashArray: 6, // Increase the space between grid lines
                                    position: 'back',
                                    xaxis: {
                                        lines: {
                                            show: false
                                        }
                                    },    
                                    yaxis: {
                                        lines: {
                                            show: true
                                        }
                                    },  
                                }
                            }}
                            series={[{ data: chartData }]}
                            type="bar"
                            height={350}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApexChart;
