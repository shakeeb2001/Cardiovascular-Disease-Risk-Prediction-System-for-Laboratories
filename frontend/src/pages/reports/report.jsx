import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';
import PDFViewerPage from './PDFViewerPage';
import LoadingModal from './LoadingModal'; // Import the LoadingModal component
import './Report.css';

function Report() {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || ''); // Initialize userRole from local storage or empty string
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [patientToApprove, setPatientToApprove] = useState(null);
  const [showSendButton, setShowSendButton] = useState(false);

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
    // Retrieve userRole from local storage and set it
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);

  useEffect(() => {
    // Save userRole to local storage whenever it changes
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  const handleViewPDF = (patient) => {
    setSelectedPatient(patient);
  };


  if (selectedPatient) {
    return <PDFViewerPage selectedPatient={selectedPatient} />;
  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/patients/${id}`);
      // After successful deletion, refetch the patient list
      await fetchAllPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
      // Handle error state here if needed
    }
  };

  const handleApprove = async () => {
    if (patientToApprove && userRole === 'manager') {
      try {
        // Implement the approve functionality here
        // This function will only be called by the lab manager
        await axios.post(`http://127.0.0.1:4000/patients/${patientToApprove.id}/approve`);
        // After successful approval, refetch the patient list
        await fetchAllPatients();
        setPatientToApprove(null); // Reset patientToApprove state
        setShowApproveModal(false); // Close the modal
        setShowSendButton(true); // Show the send button
      } catch (error) {
        console.error('Error approving patient:', error);
        // Handle error state here if needed
      }
    } else {
      console.log('You do not have permission to approve patients or no patient selected.');
    }
  };

  const getRiskPercentageColor = (riskLevel) => {
    if (riskLevel > 75) {
      return 'bg-danger text-white';
    } else if (riskLevel > 50) {
      return 'bg-warning text-black';
    } else {
      return ''; // Default color
    }
  };

  const getStressLevelColor = (stressLevel) => {
    if (stressLevel === 'High') {
      return 'bg-danger text-white';
    } else if (stressLevel === 'Medium') {
      return 'bg-warning text-black';
    } else {
      // Handle other cases or default color
    }
  };

  const getResultColor = (result) => {
    return result === 'High' ? 'bg-danger text-white' : '';
  };

  const handleApproveConfirmation = (patient) => {
    setPatientToApprove(patient);
    setShowApproveModal(true);
  };

  const handleSendPDF = async (patientId) => {
    try {
      // Implement sending PDF logic here
      console.log(`Sending PDF to patient with ID ${patientId}`);
    } catch (error) {
      console.error('Error sending PDF:', error);
      // Handle error state here if needed
    }
  };

  return (
    <div className="container mt-3 ">
      <LoadingModal show={isLoading} /> {/* Render the LoadingModal component */}
      <h3 className="fw-bold mb-2 text-uppercase">C A R D I O C A R E <span className='cardio-care'>+</span></h3>
      <h2 className="text-center report">Patients Report</h2>
      <div className="mt-3">
        {error ? (
          <p className="error">Error: {error}</p>
        ) : patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <Table bordered hover className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>National ID</th>
                <th>Email</th>
                <th>Sex</th>
                <th>Age</th>
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
                  <td className={getRiskPercentageColor(patient.risk_level_percentage)}>{patient.risk_level_percentage}</td>
                  <td className={getResultColor(patient.result)}>{patient.result}</td>
                  <td className={getStressLevelColor(patient.stress_level)}>{patient.stress_level}</td>
                  <td className="actions">
                    <Button variant="danger" onClick={() => handleDelete(patient.id)}>Delete</Button>
                    <Button variant="warning" onClick={() => handleViewPDF(patient)}>PDF</Button>
                    {showSendButton && userRole !== 'manager' && (
                      <Button variant="primary" onClick={() => handleSendPDF(patient.id)}>Send</Button>
                    )}
                    {userRole === 'manager' && ( // Conditionally render the approve button
                      <Button variant="success" onClick={() => handleApproveConfirmation(patient)}>Approve</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      {/* Approval Confirmation Modal */}
      <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Approve Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to approve this patient?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApproveModal(false)}>No</Button>
          <Button variant="success" onClick={handleApprove}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Report;
