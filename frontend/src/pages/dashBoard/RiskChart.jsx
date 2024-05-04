import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import './RiskChart.css';

function ApexChart() {
    const [riskData, setRiskData] = useState({});
    const [zoomLevel, setZoomLevel] = useState('month');

    useEffect(() => {
        // Fetch risk percentages from the server
        axios.get('http://127.0.0.1:4000/risk-percentage')
            .then(response => {
                setRiskData(response.data);
            })
            .catch(error => {
                console.error('Error fetching risk percentages:', error);
            });
    }, []);

    // Extract x-axis labels and y-axis data from riskData based on zoom level
    const getXAxisLabels = () => {
        if (zoomLevel === 'month') {
            return Object.keys(riskData).map(month => month.slice(0, 7));
        } else {
            return Object.keys(riskData);
        }
    };

    const getChartData = () => {
        if (zoomLevel === 'month') {
            // Calculate average risk percentage for each month
            return Object.values(riskData).map(riskPercentageCounts => {
                const total = Object.values(riskPercentageCounts).reduce((acc, count) => acc + count, 0);
                const averageRiskPercentage = Object.entries(riskPercentageCounts).reduce((acc, [riskPercentage, count]) => {
                    return acc + parseInt(riskPercentage) * count;
                }, 0) / total;
                return Math.round(averageRiskPercentage);
            });
        } else {
            // Use risk percentages for each day
            const selectedMonth = Object.keys(riskData)[0]; // Assuming only one month's data is fetched
            return Object.values(riskData[selectedMonth]);
        }
    };

    const xAxisLabels = getXAxisLabels();
    const chartData = getChartData();

    return (
        <div className='chat-div'>
            <div id="chart">
                <div id="chart-timeline">
                    <ReactApexChart
                        options={{
                            chart: {
                                id: 'area-datetime',
                                type: 'area',
                                height: 350,
                                zoom: {
                                    enabled: true,
                                    type: 'x',
                                    autoScaleYaxis: true
                                },
                                toolbar: {
                                    autoSelected: 'zoom'
                                }
                            },
                            xaxis: {
                                categories: xAxisLabels,
                                labels: {
                                    show: true,
                                    rotate: -45,
                                    rotateAlways: true
                                }
                            },
                            yaxis: {
                                min: 0,
                                max: 100,
                                tickAmount: 11,
                                labels: {
                                    formatter: function (value) {
                                        return value + "%";
                                    }
                                }
                            }
                        }}
                        series={[{ data: chartData }]}
                        type="area"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
}

export default ApexChart;
