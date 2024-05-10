// BarAnimation.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import './featureAnalysis.css'

const featureImportanceData = [
  { feature: 'prevalentHyp', importance: 1.052978 },
  { feature: 'sex', importance: 0.522145 },
  { feature: 'Diabetes', importance: 0.227826 },
  { feature: 'BPMeds', importance: 0.209188 },
  { feature: 'prevalentStroke', importance: 0.106369 },
  { feature: 'age', importance: 0.029842 },
  { feature: 'cigsPerDay', importance: 0.022501 },
  { feature: 'sysBP', importance: 0.015148 },
  { feature: 'glucose', importance: 0.003974 },
  { feature: 'totChol', importance: -0.000348 },
  { feature: 'heartRate', importance: -0.029247 },
  { feature: 'diaBP', importance: -0.029582 },
  { feature: 'BMI', importance: -0.047726 },
  { feature: 'currentSmoker', importance: -0.206602 },
];

const BarAnimation = () => {
  return (
    <Box className='bg'>
      <Typography variant="h5" sx={{ color: '#0d0d0d' }}>Feature Importance Bar Chart</Typography>
      <BarChart
        className='barchart'
        height={400}
        series={featureImportanceData.map(item => ({ label: item.feature, data: [item.importance] }))}
        axisConfig={{
          yAxis: { label: { style: { fill: '#fff' } }, tickLabel: { style: { fill: '#fff' } } }, 
          xAxis: { label: { style: { fill: '#fff' } }, tickLabel: { style: { fill: '#fff' } } }
        }}
      />
    </Box>
  );
}

export default BarAnimation;
