import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import PDFViewerPage from './PDFViewerPage';

function Report() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const fetchAllPatients = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:4000/all-patient-details');
      setPatients(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const handleViewPDF = (patient) => {
    setSelectedPatient(patient);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/patients/${id}`);
      // After successful deletion, refetch the patient list
      fetchAllPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  if (selectedPatient) {
    return <PDFViewerPage selectedPatient={selectedPatient} />;
  }

  return (
    <div className="container mt-5">
      <h2>Patients Report</h2>
      <div className="mt-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <Table bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>National ID</th>
                <th>Email</th>
                <th>Sex</th>
                <th>Age</th>
                <th>Height (cm)</th>
                <th>Weight (kg)</th>
                <th>Current Smoker</th>
                <th>Cigarettes Per Day</th>
                <th>BPMeds</th>
                <th>Prevalent Stroke</th>
                <th>Prevalent Hyp</th>
                <th>Diabetes</th>
                <th>Total Cholesterol</th>
                <th>Systolic BP</th>
                <th>Diastolic BP</th>
                <th>BMI</th>
                <th>Heart Rate</th>
                <th>Glucose</th>
                <th>Risk Level Percentage</th>
                <th>Result</th>
                <th>Stress Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.name}</td>
                  <td>{patient.nationalid}</td>
                  <td>{patient.email}</td>
                  <td>{patient.sex === '1' ? 'Male' : 'Female'}</td>
                  <td>{patient.age}</td>
                  <td>{patient.height}</td>
                  <td>{patient.weight}</td>
                  <td>{patient.currentSmoker === '1' ? 'Yes' : 'No'}</td>
                  <td>{patient.cigsPerDay}</td>
                  <td>{patient.BPMeds === '1' ? 'Yes' : 'No'}</td>
                  <td>{patient.prevalentStroke === '1' ? 'Yes' : 'No'}</td>
                  <td>{patient.prevalentHyp === '1' ? 'Yes' : 'No'}</td>
                  <td>{patient.diabetes === '1' ? 'Yes' : 'No'}</td>
                  <td>{patient.totChol}</td>
                  <td>{patient.sysBP}</td>
                  <td>{patient.diaBP}</td>
                  <td>{patient.BMI}</td>
                  <td>{patient.heartRate}</td>
                  <td>{patient.glucose}</td>
                  <td>{patient.risk_level_percentage}</td>
                  <td>{patient.result}</td>
                  <td>{patient.stress_level}</td>
                  <td>
                    <Button variant="secondary" onClick={() => handleViewPDF(patient)}>View as PDF</Button>
                    <Button variant="danger" onClick={() => handleDelete(patient.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default Report;
