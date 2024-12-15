import { useState, useEffect, useCallback } from 'react';



export function useRandomMovement() {
  const [position, setPosition] = useState({ x: 24, y: 24 });
  const [intervalId, setIntervalId] = useState(null);

  const moveRandomly = useCallback(() => {
    const maxX = window.innerWidth - 300; // Account for bot width
    const maxY = window.innerHeight - 100; // Account for bot height
    
    const newX = Math.max(24, Math.min(maxX, position.x + (Math.random() - 0.5) * 100));
    const newY = Math.max(24, Math.min(maxY, position.y + (Math.random() - 0.5) * 100));
    
    setPosition({ x: newX, y: newY });
  }, [position]);

  const startMovement = useCallback(() => {
    if (intervalId === null) {
      const id = window.setInterval(moveRandomly, 2000);
      setIntervalId(id);
    }
  }, [intervalId, moveRandomly]);

  const stopMovement = useCallback(() => {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  useEffect(() => {
    return () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return { position, startMovement, stopMovement };
}