import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import './featureAnalysis.css';

const BarAnimation = () => {
  const [predictionCounts, setPredictionCounts] = useState([]);

  useEffect(() => {
    // Fetch prediction counts for each day from the backend when the component mounts
    fetch('http://127.0.0.1:4000/prediction-counts-by-date')
      .then(response => response.json())
      .then(data => {
        setPredictionCounts(data);
      })
      .catch(error => {
        console.error('Error fetching prediction counts:', error);
      });
  }, []);

  // Map prediction counts data to chart series format
  const chartData = predictionCounts.map(item => ({
    label: item.date,
    data: [item.count]
  }));

  return (
    <Box className='bg' sx={{ width: '100%' }}>
      <Typography variant="h5">Prediction Counts Per Day</Typography>
      <BarChart
        className='barchart'
        height={400}
        series={chartData}
        axisConfig={{
          yAxis: { label: { style: { fill: '#fff' } }, tickLabel: { style: { fill: '#fff' } } },
          xAxis: { label: { style: { fill: '#fff' } }, tickLabel: { style: { fill: '#fff' } } }
        }}
      />
    </Box>
  );
}

export default BarAnimation;
