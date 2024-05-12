// BarAnimation.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import './featureAnalysis.css'

const BarAnimation = () => {
  const [seriesNb, setSeriesNb] = useState(2);
  const [itemNb, setItemNb] = useState(5);
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/all-patient-details');
        const approvedPatientsCount = response.data.filter(patient => patient.status === true).length;
        setApprovedCount(approvedPatientsCount);
        setPendingCount(response.data.length - approvedPatientsCount);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };
    
    fetchData();
  }, []);

  const series = []; // You can add series data here if needed

  const approvedSeries = { label: 'Approved', data: [approvedCount] };
  const pendingSeries = { label: 'Pending', data: [pendingCount] };

  return (
    <Box className='bg' sx={{ width: '100%' }}>
      <Typography variant="h5">Patient Report Status</Typography>
      <BarChart
        height={300}
        series={[
          ...series.slice(0, seriesNb).map(s => ({ ...s, data: s.data.slice(0, itemNb) })),
          approvedSeries,
          pendingSeries
        ]}
        axisConfig={{
          yAxis: { label: { style: { fill: '#fff' } } }, 
          xAxis: { label: { style: { fill: '#fff' } } }  
        }}
      />
    </Box>
  );
}

export default BarAnimation;
