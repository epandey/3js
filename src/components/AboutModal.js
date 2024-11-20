import React, { useEffect, useState } from 'react';
import { Html } from '@react-three/drei';

const AboutModal = ({ isOpen, onClose }) => {
  const resumePoints = [
    "Master's in Computer Science at UMBC.",
    'Over 5 years of experience in JavaScript development, focusing on React and Node.js.',
    'Proven expertise in designing scalable front-end and back-end systems.',
    'Skilled in Agile methodologies, technical documentation, and project maintainability.',
    'Experienced in optimizing SQL operations and AWS resource configuration.',
    'Certified ScrumMaster and AWS Certified Developer - Associate.',
    'Developed an AI-powered mental health app focused on privacy and data protection.',
    'Enhanced SEO strategies, achieving top 5 search rankings for 15+ keywords.',
    'Integrated Auth0 for secure authentication and network security.',
    'Streamlined 20+ interactive UI components using Material UI and Redux.',
    'Achieved a 40% improvement in user experience by transitioning apps to SPAs.',
    'Presented research on neural networks, simplifying complex concepts for diverse audiences.',
    'Awarded META certification for advanced React technologies.',
    'Collaborated on real-time data processing systems with Node.js.',
    'Directed end-to-end SDLC for multiple projects with a focus on efficiency and scalability.',
  ];
  const [visiblePoints, setVisiblePoints] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setVisiblePoints([]);
      const interval = setInterval(() => {
        setVisiblePoints((prev) =>
          prev.length < resumePoints.length
            ? [...prev, resumePoints[prev.length]]
            : prev
        );
        if (visiblePoints.length === resumePoints.length) clearInterval(interval);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Html center>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#FFF',
          padding: '20px',
          borderRadius: '10px',
          zIndex: 2000,
          minWidth: '1000px',
          width: '100%',
          fontSize: '1em',
          textAlign: 'left',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>About Me</h2>
        <ul style={{ listStyleType: 'square' }}>
          {visiblePoints.map((point, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              {point}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          style={{
            display: 'block',
            margin: '20px auto 0',
            padding: '10px 20px',
            backgroundColor: '#FF5722',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </Html>
  );
};

export default AboutModal;
