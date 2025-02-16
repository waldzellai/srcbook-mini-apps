'use client';

import { useState, useEffect } from 'react';
import { Timer } from '@/components/Timer';
import { SessionForm } from '@/components/SessionForm';
import { TaskType } from '@/types';

export default function Home() {
  const [timerStatus, setTimerStatus] = useState<'idle' | 'running' | 'paused'>('idle');
  const [sessionStart, setSessionStart] = useState<string | null>(null);
  const [interruptions, setInterruptions] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [sessions, setSessions] = useState<Array<{
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    interruptions: number;
    interruptionNotes: string;
    cognitiveOverhead: 1 | 2 | 3 | 4 | 5;
    taskType: TaskType;
    notes: string;
  }>>([]);

  useEffect(() => {
    const savedSessions = localStorage.getItem('deepWorkSessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  const handleStart = () => {
    if (timerStatus === 'idle') {
      setSessionStart(new Date().toISOString());
    }
    setTimerStatus('running');
  };

  const handlePause = () => {
    setTimerStatus('paused');
  };

  const handleStop = () => {
    setShowForm(true);
  };

  const handleAbort = () => {
    setTimerStatus('idle');
    setSessionStart(null);
    setInterruptions(0);
  };

  const handleInterruption = () => {
    setInterruptions((prev) => prev + 1);
    setTimerStatus('paused');
  };

  const handleSessionSubmit = (formData: {
    interruptionNotes: string;
    cognitiveOverhead: 1 | 2 | 3 | 4 | 5;
    taskType: TaskType;
    notes: string;
  }) => {
    const session = {
      id: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      startTime: sessionStart!,
      endTime: new Date().toISOString(),
      interruptions,
      ...formData,
    };

    const updatedSessions = [session, ...sessions];
    setSessions(updatedSessions);
    localStorage.setItem('deepWorkSessions', JSON.stringify(updatedSessions));

    setShowForm(false);
    setTimerStatus('idle');
    setSessionStart(null);
    setInterruptions(0);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-gray-100 mb-2">Deep Work Timer</h1>
            <p className="text-gray-400">Track your focused work sessions</p>
          </header>

          <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700/50 shadow-xl">
            {!showForm ? (
              <Timer
                onInterruption={handleInterruption}
                onAbort={handleAbort}
                isRunning={timerStatus !== 'idle'}
                isPaused={timerStatus === 'paused'}
                onStart={handleStart}
                onPause={handlePause}
                onStop={handleStop}
              />
            ) : (
              <SessionForm
                interruptionCount={interruptions}
                onSubmit={handleSessionSubmit}
              />
            )}
          </div>

          {sessions.length > 0 && (
            <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700/50 shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Recent Sessions</h2>
              <div className="space-y-4">
                {sessions.slice(0, 5).map((session) => (
                  <div
                    key={session.id}
                    className="p-4 bg-gray-700/50 rounded-lg border border-gray-600/50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-400">{new Date(session.date).toLocaleDateString()}</p>
                        <p className="font-medium">{session.taskType}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">
                          {session.interruptions} interruption{session.interruptions !== 1 ? 's' : ''}
                        </p>
                        <p className="text-sm text-gray-400">
                          Cognitive Load: {session.cognitiveOverhead}/5
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
