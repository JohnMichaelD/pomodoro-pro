"use client"

import { useState, useEffect, useRef } from 'react';
import Button from './components/buttons/Button';

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
}

const TimerDisplay = ({ minutes, seconds } : TimerDisplayProps) => (
  <div className="text-6xl font-mono font-bold bg-black p-2">
    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
  </div>
);

export default function Home() {
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(25);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/ringtone.mp3');
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            if (!isMuted && audioRef.current) {
              audioRef.current.play().catch(error => {
                console.log('Audio playback failed:', error);
              });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isMuted]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(selectedPreset * 60);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const setTimer = (minutes: number): void => {
    setSelectedPreset(minutes);
    setTimeRemaining(minutes * 60);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-blue-100 border-l-8 border-r-8 border-black" style={{ backgroundImage: 'url("/clown.jpg")', backgroundSize: '100% 100%'  }}>
      <header className="flex flex-col lg:flex-row items-center justify-between text-white w-full bg-black p-2">
        <h1 className="font-monofett text-4xl">Pomodoro Buddy</h1>  
        <section className="flex gap-4">
          <Button 
            onClick={() => setTimer(25)} 
            variant={selectedPreset === 25 ? 'success' : 'primary'}
          >
            Pomodoro
          </Button>
          <Button 
            onClick={() => setTimer(15)} 
            variant={selectedPreset === 15 ? 'success' : 'primary'}
          >
            Long Break
          </Button>
          <Button 
            onClick={() => setTimer(5)} 
            variant={selectedPreset === 5 ? 'success' : 'primary'}
          >
            Short Break
          </Button>
        </section>
      </header>
  
      <main className="flex items-center justify-center">
        {/* adding animations here */}
      </main>
  
      <footer className="relative flex flex-col items-center bg-black text-white w-full p-4">
        <div className="absolute -top-20 bg-black rounded-tl-3xl rounded-tr-3xl p-2 text-white shadow-lg">
          <TimerDisplay minutes={minutes} seconds={seconds} />
        </div>
        <section className="flex gap-4">
          {!isRunning ? (
            <Button onClick={handleStart} variant="success">Start</Button>
          ) : (
            <Button onClick={handlePause} variant="warning">Pause</Button>
          )}
          <Button onClick={handleReset}>Reset</Button>
          <Button 
            onClick={toggleMute} 
            variant={isMuted ? 'warning' : 'primary'}
            aria-label={isMuted ? 'Unmute alarm' : 'Mute alarm'}
          >
            {isMuted ? '🔇' : '🔊'}
          </Button>
        </section>
      </footer>
    </div>
  );
}