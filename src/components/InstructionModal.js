import React from 'react';

const InstructionModal = ({ onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          maxWidth: '400px',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2>Welcome!</h2>
        <p>
          You can interact with the avatar by moving your cursor to rotate it
          and scrolling up/down to enlarge or shrink it.
        </p>
        <button
          onClick={onClose}
          style={{
            marginTop: '15px',
            padding: '10px 20px',
            backgroundColor: '#0078D4',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default InstructionModal;
