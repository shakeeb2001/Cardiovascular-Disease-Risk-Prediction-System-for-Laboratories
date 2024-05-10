// Analysis.js
import React from 'react';
import Approval from './approveAnalysis';
import Feature from './featureAnalysis';
import  TotalCount from './totalPatientAnalysis';


const Analysis = () => {
  return (
    <div>
      <Approval />
      <Feature />
      <TotalCount />
    </div>
  );
}

export default Analysis;
