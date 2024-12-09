import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const CursorFish = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFacingLeft, setIsFacingLeft] = useState(false);
  const [rotation, setRotation] = useState(0);
  const lastPositions = useRef<{x: number, y: number}[]>([]);
  const flipTimeout = useRef<NodeJS.Timeout | null>(null);
  const POSITION_HISTORY = 5;  // Number of positions to track for smooth movement
  const FLIP_DELAY = 10;      // Delay in ms before fish flips
  const MOVEMENT_THRESHOLD = 50; // Minimum movement before considering a flip
  const MAX_ROTATION = 15; // Maximum rotation in degrees


  const handleMouseMove = (e: MouseEvent) => {
    const newPosition = { x: e.clientX, y: e.clientY };
    setMousePosition(newPosition);

    // Update position history
    lastPositions.current = [
      newPosition,
      ...lastPositions.current.slice(0, POSITION_HISTORY - 1)
    ];

    // Calculate movement and rotation
    if (lastPositions.current.length >= 2) {
      const totalMovement = lastPositions.current[0].x - lastPositions.current[lastPositions.current.length - 1].x;
      const totalMovementY = lastPositions.current[0].y - lastPositions.current[lastPositions.current.length - 1].y;

      // Calculate rotation based on vertical movement
      // Invert rotation based on direction fish is facing
      const rotationAngle = (totalMovementY / .4) * (isFacingLeft ? 1 : 1);
      // Clamp rotation to maximum value
      const clampedRotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, rotationAngle));
      setRotation(clampedRotation);

      // Clear existing timeout if there is one
      if (flipTimeout.current) {
        clearTimeout(flipTimeout.current);
      }

      // If movement exceeds threshold, schedule a flip
      if (Math.abs(totalMovement) > MOVEMENT_THRESHOLD) {
        flipTimeout.current = setTimeout(() => {
          setIsFacingLeft(totalMovement < 0);
        }, FLIP_DELAY);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (flipTimeout.current) {
        clearTimeout(flipTimeout.current);
      }
    };
  }, [isFacingLeft]);

  // Calculate fish position relative to cursor based on direction
  const fishStyle = {
    position: 'fixed',
    top: mousePosition.y - 100, // Center vertically
    left: isFacingLeft 
      ? mousePosition.x + 10  // Position to right of cursor when facing left
      : mousePosition.x - 250, // Position to left of cursor when facing right
      transform: `
      scaleX(${isFacingLeft ? -1 : 1})
      rotate(${rotation}deg)
    `,
    transition: 'transform 0.3s ease-out', // Smooth flip animation
    pointerEvents: 'none', // Prevent image from interfering with cursor
    zIndex: 50,
    width: '250px',
    height: '250px'
  } as const;

  return (
    <div style={fishStyle}>
      <Image
        src="/tomato.png"
        alt="Tomato clownfish"
        width={250}
        height={250}
        className="transition-transform duration-300"
      />
    </div>
  );
};

export default CursorFish;