import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Container, Row, Col } from 'react-bootstrap';
import PDFViewerPage from './PDFViewerPage';
import LoadingModal from './LoadingModal';
import './Report.css';

function Report() {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [statuses, setStatuses] = useState({}); // New state for patient statuses
  const [approvedPatients, setApprovedPatients] = useState([]); // State to keep track of approved patients
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAllPatients = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:4000/all-patient-details');
      setPatients(response.data);
      // Initialize status for each patient as empty string
      const initialStatuses = {};
      response.data.forEach(patient => {
        initialStatuses[patient.nationalid] = patient.status;
      });
      setStatuses(initialStatuses);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to filter patients based on NIC number
  const filterPatientsByNIC = (patients, query) => {
    return patients.filter(patient =>
      patient.nationalid && patient.nationalid.toLowerCase().includes(query.toLowerCase())
    );
  };
  

  useEffect(() => {
    fetchAllPatients();
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  const handleViewPDF = (patient) => {
    setSelectedPatient(patient);
  };

  if (selectedPatient) {
    return <PDFViewerPage selectedPatient={selectedPatient} />;
  }

  const handleDeleteConfirmation = (patient) => {
    setPatientToDelete(patient);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:4000/patients/${patientToDelete.nationalid}`);
      await fetchAllPatients();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleApprove = async (patient) => {
    try {
      await axios.patch(`http://127.0.0.1:4000/patients/${patient.nationalid}`, {
        status: true,
        buttonDisableStatus: false // Update the button disable status to false
      });
      // Update the status in the statuses state object
      setStatuses(prevStatuses => ({
        ...prevStatuses,
        [patient.nationalid]: true
      }));
      // Add the approved patient to the list of approved patients
      setApprovedPatients(prevApprovedPatients => [...prevApprovedPatients, patient.nationalid]);
      await fetchAllPatients();
    } catch (error) {
      console.error('Error approving patient:', error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getRiskPercentageColor = (riskLevel) => {
    if (riskLevel > 75) {
      return 'bg-danger text-white';
    } else if (riskLevel > 50) {
      return 'bg-warning text-black';
    } else {
      return '';
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


  // Filter patients based on search query
  const filteredPatients = filterPatientsByNIC(patients, searchQuery);

  return (
    <Container fluid className="mt-9 report-container">
      <LoadingModal show={isLoading} />
      <Row className="mt-3">
        <Col>
          
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <div className="search-bar">
            <input
              type="text"
              className='form-control'
              placeholder="Search by NIC number..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          {error ? (
            <p className="error">Error: {error}</p>
          ) : filteredPatients.length === 0 ? (
            <p>No patients found.</p>
          ) : (
            <Table bordered hover className="table-responsive">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>National ID</th>
                  <th>Email</th>
                  <th>Sex</th>
                  <th>Age</th>
                  <th>Date</th>
                  <th>Risk Level Percentage</th>
                  <th>Result</th>
                  <th>Stress Level</th>
                  <th>Actions</th>
                  <th>Status</th> {/* New column for status */}
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <tr key={index}>
                    <td>{patient.name}</td>
                    <td>{patient.nationalid}</td>
                    <td>{patient.email}</td>
                    <td>{patient.sex === '1' ? 'Male' : 'Female'}</td>
                    <td>{patient.age}</td>
                    <td>{patient.date}</td>
                    <td className={getRiskPercentageColor(patient.risk_level_percentage)}>{patient.risk_level_percentage}</td>
                    <td className={getResultColor(patient.result)}>{patient.result}</td>
                    <td className={getStressLevelColor(patient.stress_level)}>{patient.stress_level}</td>
                    <td className="actions">
                      <Button variant="danger" className="tb-btn" onClick={() => handleDeleteConfirmation(patient)}>Delete</Button>
                      <Button variant="warning" onClick={() => handleViewPDF(patient)}>PDF</Button>
                      {userRole === 'manager' && !approvedPatients.includes(patient.nationalid) && (
                        <Button
                          variant="success"
                          className="tb-btn"
                          onClick={() => handleApprove(patient)} // Call handleApprove on click
                          disabled={statuses[patient.nationalid]} // Disable button based on status
                        >
                          Approve
                        </Button>
                      )}
                
                   {userRole === 'assistent' && (     
                          <Button variant="success" >Ready to Send</Button>
                   )}
                    </td>
                    <td>{statuses[patient.nationalid] ? 'Approved' : 'Pending'}</td> {/* Display status */}
                    
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this patient record?</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setShowDeleteModal(false)}>No</Button>
          <Button variant="danger" onClick={handleDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Report;
