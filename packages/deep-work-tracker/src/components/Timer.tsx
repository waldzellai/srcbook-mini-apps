import { useState, useEffect } from 'react';
import { Play, Pause, Square, ZapOff, Clock, CircleX } from 'lucide-react';

interface TimerProps {
  onInterruption: () => void;
  onAbort: () => void;
  isRunning: boolean;
  isPaused: boolean;
  onStart: (duration: number) => void;
  onPause: () => void;
  onStop: () => void;
}

export const Timer = ({
  onInterruption,
  onAbort,
  isRunning,
  isPaused,
  onStart,
  onPause,
  onStop,
}: TimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [intendedDuration, setIntendedDuration] = useState(25);
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1;
          if (totalSeconds > 0 && newSeconds >= totalSeconds) {
            onStop();
          }
          return newSeconds;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused, totalSeconds, onStop]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  };

  const handleStart = () => {
    setTotalSeconds(intendedDuration * 60);
    onStart(intendedDuration);
  };

  const handleAbort = () => {
    setSeconds(0);
    setTotalSeconds(0);
    onAbort();
  };

  if (!isRunning && !isPaused) {
    return (
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-4">
          <Clock size={24} className="text-gray-400" />
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              max="240"
              value={intendedDuration}
              onChange={(e) => setIntendedDuration(Math.max(1, Math.min(240, parseInt(e.target.value) || 1)))}
              className="w-20 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
            />
            <span className="text-gray-400">minutes</span>
          </div>
        </div>
        <button
          onClick={handleStart}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors flex items-center space-x-2"
        >
          <Play size={24} />
          <span>Start Session</span>
        </button>
      </div>
    );
  }

  const remainingTime = totalSeconds > 0 ? totalSeconds - seconds : 0;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-6xl font-mono font-bold text-blue-400">
        {formatTime(seconds)}
      </div>
      {totalSeconds > 0 && (
        <div className="text-gray-400">
          Remaining: {formatTime(remainingTime)}
        </div>
      )}
      <div className="flex space-x-4">
        {!isPaused ? (
          <button
            onClick={onPause}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full transition-colors"
          >
            <Pause size={24} />
          </button>
        ) : (
          <button
            onClick={() => onStart(intendedDuration)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors"
          >
            <Play size={24} />
          </button>
        )}
        <button
          onClick={onStop}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors"
        >
          <Square size={24} />
        </button>
        <button
          onClick={handleAbort}
          className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors"
        >
          <CircleX size={24} />
        </button>
      </div>
      {isRunning && !isPaused && (
        <button
          onClick={onInterruption}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <ZapOff size={20} />
          <span>Record Interruption</span>
        </button>
      )}
    </div>
  );
};
