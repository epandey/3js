import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import MyAvatar from './components/MyAvatar';
import OrbitingIcons from './components/OrbitingIcons';
import Background from './components/Background';
import ContactPage from './components/ContactPage';
import Modal from './components/Modal';
import ChatBot from './components/ChatBot'; // Import the enhanced ChatBot component
import MandalaBackground from './components/Mandala';

const App = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [useMandalaBackground, setUseMandalaBackground] = useState(false); // Default to Normal BG
  const [isOrbitingPaused, setIsOrbitingPaused] = useState(false); // State for orbiting
  const [isPaused, setIsPaused] = useState(false);
  const [showNormalWebsite, setShowNormalWebsite] = useState(false);


  // Choose the avatar model dynamically based on the background
  const avatarModel = useMandalaBackground
    ? '/models/indianEP.glb' // Mandala avatar model
    : '/models/my-avatar.glb'; // Normal avatar model

  return (
    <>
      {/* Toggle Background */}
      {useMandalaBackground ? <MandalaBackground /> : <Background />}

      <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
        <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
          <MyAvatar modelPath={avatarModel} message="Hello! I'm your avatar." />

          {/* Pass the orbiting state to OrbitingIcons */}
          <OrbitingIcons
            onContactClick={() => setIsContactOpen(true)}
            isPaused={isOrbitingPaused}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <Environment preset="sunset" />
          <OrbitControls />
        </Canvas>
      </div>

      {/* Background Switch Button */}
      <button
        onClick={() => setUseMandalaBackground(!useMandalaBackground)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: useMandalaBackground ? '#FF5733' : '#0078D4',
          color: 'white',
          borderRadius: '10px',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        {useMandalaBackground ? 'Switch to Normal BG' : 'Switch to Mandala BG'}
      </button>
      <button
        onClick={() => window.location.href = 'https://epandey83.netlify.app/beautiful-portfolio-website/'}
        style={{
          position: 'fixed',
          top: '140px',
          right: '20px',
          backgroundColor: '#FF5733',
          color: 'white',
          borderRadius: '10px',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        Go to Non-3js Website
      </button>


      {/* Stop Orbiting Button */}
      <button
        onClick={() => setIsOrbitingPaused((prev) => !prev)}
        style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          backgroundColor: isOrbitingPaused ? '#FF5733' : '#0078D4',
          color: 'white',
          borderRadius: '10px',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        {isOrbitingPaused ? 'Resume Orbiting' : 'Stop Orbiting'}
      </button>

      {/* Floating Bot Button */}
      <button
        onClick={() => setIsBotOpen(!isBotOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#0078D4',
          color: 'white',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        💬
      </button>

      {/* Render ChatBot */}
      {isBotOpen && <ChatBot onClose={() => setIsBotOpen(false)} />}

      {/* Render Modal outside the Canvas */}
      {isContactOpen && <Modal onClose={() => setIsContactOpen(false)} />}
    </>
  );
};

export default App;
