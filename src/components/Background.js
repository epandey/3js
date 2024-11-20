import React, { useEffect, useRef, useState } from "react";

const Background = () => {
    const canvasRef = useRef(null);
    const audioRef = useRef(null); // Reference for audio element
    const [isPlaying, setIsPlaying] = useState(true); // Track music play state

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let stars = [];
        let shootingStars = [];
        const starCount = 200; // Number of static stars
        const maxStarSize = 2; // Maximum size of static stars
        const shootingStarFrequency = 0.01; // Probability of a shooting star appearing per frame

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Star object
        class Star {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * maxStarSize + 1; // Star size
                this.speed = Math.random() * 0.5; // Speed of movement
                this.opacity = Math.random(); // Initial opacity
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }

            update() {
                this.y += this.speed; // Move the star downwards
                if (this.y > canvas.height) {
                    // Reset star to the top when it moves out of view
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
                this.draw();
            }
        }

        // Shooting star object
        class ShootingStar {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height / 2; // Start from the upper half of the screen
                this.size = Math.random() * 2 + 2; // Slightly larger for visibility
                this.speedX = Math.random() * 10 + 5; // Fast horizontal speed
                this.speedY = Math.random() * 3 + 2; // Fast vertical speed
                this.opacity = 1; // Fully visible initially
            }

            draw() {
                ctx.beginPath();
                const gradient = ctx.createLinearGradient(
                    this.x,
                    this.y,
                    this.x - this.speedX * 2,
                    this.y - this.speedY * 2
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
                gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

                ctx.fillStyle = gradient;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - this.speedX * 2, this.y - this.speedY * 2);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = this.size;
                ctx.stroke();
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity -= 0.02; // Fade out as it moves
                if (this.opacity <= 0) {
                    // Remove the shooting star once it fades out
                    const index = shootingStars.indexOf(this);
                    if (index > -1) {
                        shootingStars.splice(index, 1);
                    }
                }
                this.draw();
            }
        }

        // Create static stars
        const initStars = () => {
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push(new Star());
            }
        };

        // Animation loop
        const animate = () => {
            // Create a gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, "#000000"); // Black at the top
            gradient.addColorStop(1, "#141E30"); // Dark blue at the bottom

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw static stars
            stars.forEach((star) => star.update());

            // Occasionally create a shooting star
            if (Math.random() < shootingStarFrequency) {
                shootingStars.push(new ShootingStar());
            }

            // Update and draw shooting stars
            shootingStars.forEach((shootingStar) => shootingStar.update());

            requestAnimationFrame(animate);
        };

        // Handle window resizing
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        // Initialize stars and start animation
        initStars();
        animate();

        // Resize listener
        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


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
            <canvas
                ref={canvasRef}
                style={{ display: "block", position: "fixed", top: 0, left: 0 }}
            />
            <audio ref={audioRef} loop autoPlay>
                <source src="/bgmusic.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
            <button
                onClick={toggleMusic}
                style={{
                    position: "fixed",
                    top: "10px",
                    left: "10px",
                    zIndex: 1000,
                    backgroundColor: "#0078D4",
                    color: "white",
                    borderRadius: "5px",
                    border: "none",
                    padding: "10px 20px",
                    cursor: "pointer",
                }}
            >
                {isPlaying ? "Pause Music" : "Play Music"}
            </button>

        </>
    );
};

export default Background;
