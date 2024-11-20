import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import AboutModal from './AboutModal';
import ContactPage from './ContactPage';

const icons = [
  { src: '/icons/icons8-home-50.png', url: '#', label: 'Home' },
  { src: '/icons/icons8-about-50.png', label: 'About' },
  { src: '/icons/icons8-instagram-50.png', url: 'https://www.instagram.com/epandey83/', label: 'Instagram' },
  { src: '/icons/icons8-linkedin-50.png', url: 'https://www.linkedin.com/in/ekta-pandey-19a29810b', label: 'LinkedIn' },
  { src: '/icons/icons8-phone-50.png', url: 'https://epandey83.netlify.app/beautiful-portfolio-website/#contact' },
  { src: '/icons/icons8-resume-50.png', url: '/EP_Resume.pdf', label: 'Resume' },
  { src: '/icons/icons8-games-50.png', label: 'Play Games' },
];

const OrbitingIcons = ({ isPaused }) => {
  const groupRef = useRef();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isContactPageOpen, setIsContactPageOpen] = useState(false);

  useFrame(({ clock }) => {
    if (!isPaused && !isContactPageOpen && hoveredIndex === null) {
      const elapsed = clock.getElapsedTime();
      groupRef.current.rotation.y = -elapsed * 0.5;
    }
  });

  const handleIconClick = (label, url) => {
    if (label === 'About') {
      setModalType('about');
      setIsModalOpen(true);
    } else if (label === 'Phone') {
      setIsContactPageOpen(true);
    } else if (label === 'Play Games') {
      window.location.href =
        'https://www.msn.com/en-us/play?cgfrom=cg_ntp_sd_cardtitle&ocid=msedgdhp&pc=HCTS&cvid=7213fba1479c4a678093307909525426&ei=15';
    } else if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <>
      <group ref={groupRef} renderOrder={1}>
        {icons.map((icon, index) => {
          const angle = (index / icons.length) * Math.PI * 2;
          const radius = 6;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          return (
            <Html
              position={[x, 0, z]}
              distanceFactor={10}
              key={index}
              style={{
                zIndex: -1,
                textAlign: 'center',
              }}
            >
              <div
                style={{ position: 'relative', display: 'inline-block' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleIconClick(icon.label, icon.url)}
              >
                <img
                  src={icon.src}
                  alt={icon.label}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    padding: '10px',
                    display: 'block',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.3s ease-in-out',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {hoveredIndex === index && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '70px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
                      fontSize: '12px',
                      pointerEvents: 'none',
                    }}
                  >
                    {icon.label}
                  </div>
                )}
              </div>
            </Html>
          );
        })}
      </group>

      {/* Render About Modal */}
      <AboutModal
        isOpen={modalType === 'about' && isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Render ContactPage Completely Outside the Canvas */}
      {isContactPageOpen && (
        <Html center>
          <div className="contact-page-container">
            <ContactPage
              BackgroundComponent={() => (
                <div style={{ backgroundColor: '#f0f0f0', height: '100%' }} />
              )}
            />
            <button
              onClick={() => setIsContactPageOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: '#0078D4',
                color: 'white',
                borderRadius: '10px',
                padding: '10px 20px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </Html>
      )}

    </>
  );
};

export default OrbitingIcons;
