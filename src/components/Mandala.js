import React, { useRef, useState } from 'react';
import './MandalaBackground.css'; // Import the styles

const MandalaBackground = () => {
    return (
        <>
            <span className="large-circles">
                <div className="large circle one"></div>
                <div className="large circle two"></div>
                <div className="large circle three"></div>
                <div className="large circle four"></div>
                <div className="large circle five"></div>
                <div className="large circle six"></div>
                <div className="large circle seven"></div>
                <div className="large circle eight"></div>
            </span>

            <span className="small-shapes">
                <div className="small circle one"></div>
                <div className="small squircle two"></div>
                <div className="small circle three"></div>
                <div className="small squircle four"></div>
                <div className="small circle five"></div>
                <div className="small squircle six"></div>
                <div className="small circle seven"></div>
                <div className="small squircle eight"></div>
            </span>

            <span className="content-squircle">
                <div className="large squircle one"></div>
            </span>
        </>
    );
};

const MandalaBackgroundMultiple = () => {
    const positions = [
        { top: '10%', left: '10%' },
        { top: '10%', right: '10%' },
        { bottom: '10%', left: '10%' },
        { bottom: '10%', right: '10%' },
        { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    ];

    const audioRef = useRef(null); // Reference for audio element
    const [isPlaying, setIsPlaying] = useState(false); // Track music play state

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            {/* Render Mandalas */}
            {positions.map((pos, index) => (
                <div key={index} className="mandala-container" style={pos}>
                    <MandalaBackground />
                </div>
            ))}

            {/* Music Player */}
            <audio ref={audioRef} loop>
                <source src="/sitabgmusic.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>

            {/* Toggle Music Button */}
            <button
                onClick={toggleMusic}
                style={{
                    position: 'fixed',
                    top: '10px',
                    left: '10px',
                    zIndex: 1000,
                    backgroundColor: '#0078D4',
                    color: 'white',
                    borderRadius: '5px',
                    border: 'none',
                    padding: '10px 20px',
                    cursor: 'pointer',
                }}
            >
                {isPlaying ? 'Pause Music' : 'Play Music'}
            </button>
        </>
    );
};

export default MandalaBackgroundMultiple;
