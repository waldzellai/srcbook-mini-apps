import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Timer } from './components/Timer';
import { SessionForm } from './components/SessionForm';
import { SessionHistory } from './components/SessionHistory';
import { SessionDetail } from './components/SessionDetail';
import { ParticleBackground } from './components/ParticleBackground';
import { DeepWorkSession, TaskType, TimerStatus } from './types/types';
import './index.css';

function App() {
  const [timerStatus, setTimerStatus] = useState<TimerStatus>('idle');
  const [sessionStart, setSessionStart] = useState<string | null>(null);
  const [interruptions, setInterruptions] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [sessions, setSessions] = useState<DeepWorkSession[]>([]);

  useEffect(() => {
    const savedSessions = localStorage.getItem('deepWorkSessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  const handleStart = (duration: number) => {
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
    const session: DeepWorkSession = {
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

  const MainContent = () => (
    <>
      {!showForm ? (
        <div className="bg-gray-900/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700/50 shadow-xl">
          <Timer
            onSessionEnd={handleStop}
            onInterruption={handleInterruption}
            onAbort={handleAbort}
            isRunning={timerStatus !== 'idle'}
            isPaused={timerStatus === 'paused'}
            onStart={handleStart}
            onPause={handlePause}
            onStop={handleStop}
          />
        </div>
      ) : (
        <div className="bg-gray-900/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700/50 shadow-xl">
          <SessionForm
            interruptionCount={interruptions}
            onSubmit={handleSessionSubmit}
          />
        </div>
      )}

      {sessions.length > 0 && (
        <SessionHistory sessions={sessions} />
      )}
    </>
  );

  return (
    <Router>
      <div className="min-h-screen bg-transparent text-gray-100">
        <ParticleBackground />
        <div className="relative z-10 p-8">
          <div className="max-w-4xl mx-auto space-y-12">
            <header className="text-center">
              <h1 className="text-4xl font-bold text-gray-100 mb-2">Deep Work Timer</h1>
              <p className="text-gray-400">Track your focused work sessions</p>
            </header>

            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/session/:id" element={<SessionDetail sessions={sessions} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
