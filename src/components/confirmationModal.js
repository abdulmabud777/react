// ConfirmationModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const modalStyle = {
  content: {
    width: '300px',
    height: '250px',
    margin: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyle}
      contentLabel="Confirmation Modal"
    >
      <div style={{ padding: '16px' }}>
        <h2>{message}</h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
          <button onClick={onRequestClose} disabled={isConfirming} style={{ marginRight: '8px' }}>
            Cancel
          </button>
          <button onClick={handleConfirm} disabled={isConfirming}>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
