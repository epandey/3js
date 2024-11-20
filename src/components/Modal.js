import React from 'react';
import { Html } from '@react-three/drei';
import './Modal.css';

const Modal = ({ onClose }) => {
  return (
    <Html center>
      <div className="modal-overlay">
        <div className="modal-content">
          <button
            className="close-button"
            aria-label="Close Modal"
            onClick={onClose}
          >
            &times;
          </button>
          <h1>Contact Form</h1>
          <form>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Message" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </Html>
  );
};

export default Modal;
