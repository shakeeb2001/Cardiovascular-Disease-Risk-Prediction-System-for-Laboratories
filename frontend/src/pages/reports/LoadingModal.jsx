import React from 'react';
import { Spinner, Modal } from 'react-bootstrap';

const LoadingModal = ({ show }) => {
  return (
    <Modal show={show} centered>
      <Modal.Body className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading...</p>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
