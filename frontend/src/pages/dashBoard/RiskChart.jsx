// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import ReactApexChart from 'react-apexcharts';
// // import './RiskChart.css';

// // function ApexChart() {
// //     const [riskData, setRiskData] = useState({});
// //     const [loading, setLoading] = useState(true); // Added loading state

// //     useEffect(() => {
// //         // Fetch risk percentages from the server
// //         axios.get('http://127.0.0.1:4000/risk-percentage')
// //             .then(response => {
// //                 setRiskData(response.data);
// //                 setLoading(false); // Data fetching complete, set loading to false
// //             })
// //             .catch(error => {
// //                 console.error('Error fetching risk percentages:', error);
// //                 setLoading(false); // Set loading to false in case of error
// //             });
// //     }, []);

// //     const getChartData = () => {
// //         if (Object.keys(riskData).length === 0) {
// //             // If riskData is empty, return an empty array
// //             return [];
// //         }

// //         // Sort the riskData object keys (dates) in descending order
// //         const sortedDates = Object.keys(riskData).sort((a, b) => new Date(b) - new Date(a));
// //         const lastTenDates = sortedDates.slice(0, 10); // Get the last 10 dates

// //         // Get the last 10 patients' risk percentages
// //         const lastTenPatients = lastTenDates.map(date => riskData[date]);

// //         // Extract cigsPerDay of the last 10 patients
// //         const cigsPerDayData = lastTenPatients.map(patient => {
// //             return Object.entries(patient).map(([name, { cigsPerDay }]) => ({ name, cigsPerDay }));
// //         });

// //         // Prepare data for the chart
// //         const chartData = cigsPerDayData.map(patient => ({
// //             name: patient[0].name, // Patient name as x-axis
// //             data: patient.map(data => parseInt(data.cigsPerDay)) // cigsPerDay as y-axis
// //         }));

// //         return chartData;
// //     };

// //     const chartData = getChartData();

// //     return (
// //         <div className='chat-div'>
// //             {loading ? ( // Show loading message while data is being fetched
// //                 <p>Loading...</p>
// //             ) : (
// //                 <div id="chart">
// //                     <h3>Patient Risk Analysis</h3>
// //                     <div id="chart-timeline">
// //                         <ReactApexChart
// //                             options={{
// //                                 chart: {
// //                                     id: 'area-chart', // Set chart id
// //                                     type: 'area', // Change chart type to area
// //                                     height: 380,
// //                                     toolbar: {
// //                                         show: false
// //                                     }
// //                                 },
// //                                 xaxis: {
// //                                     categories: chartData.map(patient => patient.name), // Patient names on x-axis
// //                                     labels: {
// //                                         show: true,
// //                                         style: {
// //                                             colors: '#ffffff' // Set x-axis text color to white
// //                                         }
// //                                     },
// //                                     axisBorder: {
// //                                         show: true,
// //                                         color: '#ffffff' // Set color to white for x-axis grid lines
// //                                     },
// //                                     axisTicks: {
// //                                         show: true,
// //                                         color: '#ffffff' // Set color to white for x-axis ticks
// //                                     }
// //                                 },
// //                                 yaxis: {
// //                                     min: 0,
// //                                     labels: {
// //                                         formatter: function (value) {
// //                                             return value.toFixed(0);
// //                                         },
// //                                         style: {
// //                                             colors: '#ffffff', // Set y-axis text color to white
// //                                             fontSize: '14px' // Increase font size of y-axis labels
// //                                         }
// //                                     }
// //                                 },
// //                                 fill: {
// //                                     colors: ['#ffffff'], // Set color to white for area fill
// //                                     type: 'gradient', // Use gradient fill
// //                                     gradient: {
// //                                         shade: 'dark', // Darken the gradient
// //                                         type: 'vertical', // Use vertical gradient
// //                                         shadeIntensity: 0.5, // Intensity of shading
// //                                         gradientToColors: ['#ff0000'], // Gradient to red color above 85
// //                                         inverseColors: false,
// //                                         opacityFrom: 0.85, // Opacity of the gradient
// //                                         opacityTo: 0.85
// //                                     }
// //                                 },
// //                                 dataLabels: {
// //                                     enabled: false
// //                                 },
// //                                 grid: {
// //                                     show: true,
// //                                     borderColor: '#ffffff', // Set color to white for grid lines
// //                                     strokeDashArray: 6, // Increase the space between grid lines
// //                                     position: 'back',
// //                                     xaxis: {
// //                                         lines: {
// //                                             show: false
// //                                         }
// //                                     },    
// //                                     yaxis: {
// //                                         lines: {
// //                                             show: true
// //                                         }
// //                                     },  
// //                                 }
// //                             }}
// //                             series={chartData}
// //                             type="area"
// //                             height={350}
// //                         />
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }

// // export default ApexChart;

// import React, { useEffect, useState } from 'react';
// import './RiskChart.css';
// import ReactApexChart from 'react-apexcharts';
// import axios from 'axios';

// export default function ApexChart() {
//   const [patientData, setPatientData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/patient-data');
//       setPatientData(response.data);
//     } catch (error) {
//       console.error('Error fetching patient data:', error);
//     }
//   };

//   // Ensure patientData is defined before mapping
//   const formattedData = patientData.map(patient => ({
//     name: patient.name,
//     riskLevelPercentage: parseFloat(patient.risk_level_percentage)
//   }));

//   // Ensure series data is properly formatted
//   const seriesData = formattedData.map(patient => ({
//     x: patient.name,
//     y: patient.riskLevelPercentage
//   }));

//   // Define options
//   const options = {
//     chart: {
//       height: 350,
//       type: 'bar',
//     },
//     plotOptions: {
//       bar: {
//         borderRadius: 10,
//         dataLabels: {
//           position: 'top',
//         },
//         colors: {
//           ranges: [{
//             from: 25,
//             to: 50,
//             color: '#a13d03'
//           },
//           {
//             from: 0,
//             to: 25,
//             color: '#87a103'
//           },
//           {
//             from: 75,
//             to: 100,
//             color: '#a10303'
//           }]
//         }
//       }
//     },
//     dataLabels: {
//       enabled: true,
//       formatter: function (val) {
//         return val + "%";
//       },
//       offsetY: -20,
//       style: {
//         fontSize: '15px',
//         colors: ["#ffffff"]
//       }
//     },
//     xaxis: {
//       categories: formattedData.map(patient => patient.name),
//       position: 'top',
//       axisBorder: {
//         show: false
//       },
//       axisTicks: {
//         show: false
//       },
//       crosshairs: {
//         fill: {
//           type: 'gradient',
//           gradient: {
//             colorFrom: '#D8E3F0',
//             colorTo: '#BED1E6',
//             stops: [0, 100],
//             opacityFrom: 0.4,
//             opacityTo: 0.5,
//           }
//         }
//       }
//     },
//     yaxis: {
//       axisBorder: {
//         show: false
//       },
//       axisTicks: {
//         show: false,
//       },
//       labels: {
//         formatter: function (val) {
//           return val + "%";
//         },
//         style: {
//           colors: "#ffffff"
//         }
//       }
//     },
//     title: {
//       text: 'Patient Risk Levels',
//       floating: true,
//       offsetY: 330,
//       align: 'center',
//       style: {
//         color: '#ffffff'
//       }
//     },
//     // Move tooltip outside xaxis
//     tooltip: {
//       enabled: true,
//     }
//   };

//   return (
//     <div>
//       <div id="chart">
//         {/* Render the chart only if there is data available */}
//         {formattedData.length > 0 && (
//           <ReactApexChart options={options} series={[{ data: seriesData }]} type="bar" height={350} />
//         )}
//       </div>
//     </div>
//   );
// }






// import React, { useEffect, useState } from 'react';
// import './RiskChart.css';
// import ReactApexChart from 'react-apexcharts';
// import axios from 'axios';

// export default function ApexChart() {
//   const [patientData, setPatientData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get('http://localhost:4000/patient-data');
//       setPatientData(response.data);
//     } catch (error) {
//       setError('Error fetching patient data: ' + error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formattedData = patientData.map(patient => ({
//     name: patient.name,
//     riskLevelPercentage: parseFloat(patient.risk_level_percentage)
//   }));

//   const options = {
//     chart: {
//       height: 350,
//       type: 'bar',
//       toolbar: {
//         show: false // Hide toolbar
//       }
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false // Change bar orientation to vertical
//       }
//     },
//     dataLabels: {
//       enabled: false // Disable data labels
//     },
//     xaxis: {
//       categories: formattedData.map(patient => patient.name), // Set categories as patient names
//     },
//     yaxis: {
//       title: {
//         text: 'Risk Level Percentage' // Add y-axis title
//       }
//     }
//   };

//   return (
//     <div>
//       {isLoading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       <div id="chart">
//         <ReactApexChart
//           options={options}
//           series={[{ data: formattedData.map(patient => patient.riskLevelPercentage) }]}
//           type="bar"
//           height={350}
//         />
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import './RiskChart.css';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

export default function ApexChart() {
  const [patientData, setPatientData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/patient-data');
      setPatientData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError('Error fetching patient data: ' + error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (patientData.length > 0) {
      const formatted = patientData.map(patient => ({
        name: patient.name,
        riskLevelPercentage: parseFloat(patient.risk_level_percentage),
        color: getColorForRisk(parseFloat(patient.risk_level_percentage))
      }));
      setFormattedData(formatted);
    }
  }, [patientData]);

  const getColorForRisk = (riskLevel) => {
    if (riskLevel >= 75) {
      return '#FF0000'; // Red for risk percentage above or equal to 75
    } else if (riskLevel >= 40) {
      return '#FFA500'; // Orange for risk percentage between 50 and 75
    } else {
      return '#008000'; // Green for risk percentage below 50
    }
  };

  const options = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: true, // Hide toolbar
      }
    },
    plotOptions: {
      bar: {
        horizontal: false
 // Change bar orientation to vertical
        
      },
      
    },
    dataLabels: {
      enabled: true, // Disable data labels
    },
    xaxis: {
      categories: formattedData.map(patient => patient.name), // Set categories as patient names
      labels: {
        style: {
          colors: '#ffffff' // Set x-axis label color to white
        }
      }
    },
    yaxis: {
      title: {
        text: 'Risk Level Percentage', // Add y-axis title
        style: {
          color: '#ffffff' // Set y-axis title color to white
        }
      },
      labels: {
        formatter: function (value) {
          return Math.round(value); // Remove decimal places from y-axis labels
        },
        style: {
          colors: '#ffffff' // Set y-axis label color to white
        }
      }
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {formattedData.length > 0 && (
        <div id="chart">
          <ReactApexChart
            options={options}
            series={[{ data: formattedData.map(patient => ({
              x: patient.name,
              y: patient.riskLevelPercentage,
              fillColor: patient.color
            })) }]}
            type="bar"
            height={390}
          />
        </div>
      )}
    </div>
  );
}


