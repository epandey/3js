import React, { useState, useEffect } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

const MyAvatar = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath); // Dynamically load the model
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showMessage, setShowMessage] = useState(true); // State to manage message visibility

  useEffect(() => {
    // Auto-hide the message after 5 seconds
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  // Animation for hover and click
  const { scale, rotation } = useSpring({
    scale: hovered ? 1.6 : 1.5, // Scale up on hover
    rotation: clicked ? [0, Math.PI, 0] : [0, 0, 0], // Rotate on click
    config: { tension: 150, friction: 10 },
  });

  return (
    <animated.group
      renderOrder={2} // Ensure it renders above other elements
      scale={scale} // Animated scale
      rotation={rotation} // Animated rotation
      onPointerOver={() => setHovered(true)} // Trigger hover
      onPointerOut={() => setHovered(false)} // End hover
      onClick={() => setClicked(!clicked)} // Toggle click rotation
    >
      <primitive object={scene} />
      {/* Message displayed temporarily */}
      {showMessage && (
        <Html position={[0, 2.5, 0]} distanceFactor={8}>
          <div
           style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px 10px',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '0.9em',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
            maxWidth: 'none', // Remove width limitation
            whiteSpace: 'nowrap', // Prevent wrapping
          }}
          
          >
            Rotate 360° to view all sides. Scroll to zoom in or out.
          </div>
        </Html>
      )}
    </animated.group>
  );
};

export default MyAvatar;
