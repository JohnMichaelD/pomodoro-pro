"use client"

import { useState, useEffect, useRef } from 'react';
import Button from './components/buttons/Button';
import CursorFish from './components/CursorFish';
import InfoModal from './components/InfoModal';
import { FaInfo } from "react-icons/fa";
import TaskList from './components/TaskList'


interface TimerDisplayProps {
  minutes: number;
  seconds: number;
}

const TimerDisplay = ({ minutes, seconds } : TimerDisplayProps) => (
  <div className="text-6xl font-mono font-bold text-red-600 p-2">
    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
  </div>
);

export default function Home() {
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(25);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const endTimeRef = useRef<number | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio('/ringtone.mp3');
  }, []);
  
  useEffect(() => {
    let animationFrameId: number;
    let intervalId: NodeJS.Timeout;
  
    if (isRunning) {
      if (!endTimeRef.current) {
        endTimeRef.current = Date.now() + timeRemaining * 1000;
      }
  
      const updateTimer = () => {
        if (endTimeRef.current) {
          const currentTime = Date.now();
          const remaining = Math.max(0, Math.ceil((endTimeRef.current - currentTime) / 1000));
  
          if (remaining <= 0) {
            setIsRunning(false);
            endTimeRef.current = null;
            setTimeRemaining(0);
            document.title = 'Time Up! - Pomodoro Buddy';
            if (!isMuted && audioRef.current) {
              audioRef.current.play().catch(error => {
                console.log('Audio playback failed:', error);
              });
            }
          } else {
            setTimeRemaining(remaining);
            // Update title with current time
            const mins = Math.floor(remaining / 60);
            const secs = remaining % 60;
            const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            document.title = `(${formattedTime}) Pomodoro Buddy`;
            animationFrameId = requestAnimationFrame(updateTimer);
          }
        }
      };
  
      // Use requestAnimationFrame for active tab
      animationFrameId = requestAnimationFrame(updateTimer);
  
      // default to interval when tab is inactive
      intervalId = setInterval(() => {
        if (endTimeRef.current) {
          const currentTime = Date.now();
          const remaining = Math.max(0, Math.ceil((endTimeRef.current - currentTime) / 1000));
          const mins = Math.floor(remaining / 60);
          const secs = remaining % 60;
          const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
          document.title = `(${formattedTime}) Pomodoro Buddy`;
        }
      }, 1000);
  
    } else {
      endTimeRef.current = null;
      document.title = 'Pomodoro Buddy';
    }
  
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
      document.title = 'Pomodoro Buddy';
    };
  }, [isRunning, isMuted]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  useEffect(() => {
    // Format time for tab display
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.title = isRunning 
      ? `(${formattedTime}) Pomodoro Buddy`
      : 'Pomodoro Buddy';
    return () => {
      document.title = 'Pomodoro Buddy';
    };
  }, [minutes, seconds, isRunning]);

  const handleStart = () => setIsRunning(true);

  const handlePause = () => {
    setIsRunning(false);
    endTimeRef.current = null;
  };

  const handleReset = () => {
    setIsRunning(false);
    endTimeRef.current = null;
    setTimeRemaining(selectedPreset * 60);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const setTimer = (minutes: number): void => {
    setSelectedPreset(minutes);
    setTimeRemaining(minutes * 60);
    setIsRunning(false);
    endTimeRef.current = null;
  };

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-white">
      <header className="flex flex-col lg:flex-row items-center justify-between text-white w-full p-2">
        <h1 className="font-monofett text-4xl text-red-600">Pomodoro Buddy</h1>  
        <section className="flex gap-2">
          <Button 
            onClick={() => setTimer(25)} 
            variant={selectedPreset === 25 ? 'success' : 'primary'}
          >
            pomodoro
          </Button>
          <Button 
            onClick={() => setTimer(15)} 
            variant={selectedPreset === 15 ? 'success' : 'primary'}
          >
            <span className="hidden sm:inline">long break</span>
            <span className="sm:hidden">15m</span>
          </Button>
          <Button 
            onClick={() => setTimer(5)} 
            variant={selectedPreset === 5 ? 'success' : 'primary'}
          >
            <span className="hidden sm:inline">short break</span>
            <span className="sm:hidden">5m</span>
          </Button>
          <button 
            onClick={() => setIsInfoModalOpen(true)} 
            className="bg-red-600 rounded-full p-2 px-2.5 hover:bg-red-700 transition-colors"
            aria-label="Show information"
          >
            <FaInfo />
          </button>
        </section>
      </header>
  
      <main className="flex items-center justify-center h-full w-full">
        <CursorFish />
        <TaskList />
      </main>
  
      <footer className="relative flex flex-col items-center text-white w-full p-4">
        <div className="absolute -top-20 rounded-tl-3xl rounded-tr-3xl p-2 text-white">
          <TimerDisplay minutes={minutes} seconds={seconds} />
        </div>
        <section className="flex gap-2">
          {!isRunning ? (
            <Button onClick={handleStart} variant="success">start</Button>
          ) : (
            <Button onClick={handlePause} variant="warning">pause</Button>
          )}
          <Button onClick={handleReset}>reset</Button>
          <Button 
            onClick={toggleMute} 
            variant={isMuted ? 'warning' : 'primary'}
            aria-label={isMuted ? 'Unmute alarm' : 'Mute alarm'}
          >
            {isMuted ? '🔇' : '🔊'}
          </Button>
        </section>
      </footer>
      <InfoModal 
        isOpen={isInfoModalOpen} 
        onClose={() => setIsInfoModalOpen(false)} 
      />
    </div>
  );
}