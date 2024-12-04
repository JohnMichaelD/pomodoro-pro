"use client"

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(selectedPreset * 60);
  };

  const setTimer = (minutes: number): void => {
    setSelectedPreset(minutes);
    setTimeRemaining(minutes * 60);
    setIsRunning(false);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-4 items-center h-full">
        <h1 className="text-4xl">Pomodoro Timer</h1>

        <section className="flex gap-4">
          <Button 
            onClick={() => setTimer(25)} 
            variant={selectedPreset === 25 ? 'success' : 'primary'}
          >
            25m
          </Button>
          <Button 
            onClick={() => setTimer(15)} 
            variant={selectedPreset === 15 ? 'success' : 'primary'}
          >
            15m
          </Button>
          <Button 
            onClick={() => setTimer(5)} 
            variant={selectedPreset === 5 ? 'success' : 'primary'}
          >
            5m
          </Button>
        </section>

        <div className="relative">
          <img src="GreenTomato.png" alt="Green Tomato" className="mb-8" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 rounded border border-black p-2 text-white shadow-lg">
            <TimerDisplay minutes={minutes} seconds={seconds} />
          </div>
        </div>
        
        <section className="flex gap-4">
          {!isRunning ? (
            <Button onClick={handleStart} variant="success">Start</Button>
          ) : (
            <Button onClick={handlePause} variant="warning">Pause</Button>
          )}
          <Button onClick={handleReset}>Reset</Button>
        </section>
      </main>
    </div>
  );
}