import { useParams, useNavigate } from 'react-router-dom';
import { DeepWorkSession } from '../types/types';
import { Clock, Brain, ZapOff, ArrowLeft, Calendar } from 'lucide-react';
import { DownloadButton } from './DownloadButton';

interface SessionDetailProps {
  sessions: DeepWorkSession[];
}

export const SessionDetail = ({ sessions }: SessionDetailProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const session = sessions.find(s => s.id === id);

  if (!session) {
    return (
      <div className="text-center">
        <p className="text-gray-400">Session not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft size={20} />
          <span>Back to sessions</span>
        </button>
      </div>
    );
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (start: string, end: string) => {
    const duration = new Date(end).getTime() - new Date(start).getTime();
    const minutes = Math.floor(duration / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="mb-6 inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300"
      >
        <ArrowLeft size={20} />
        <span>Back to sessions</span>
      </button>

      <div className="bg-gray-900/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700/50 shadow-xl relative">
        <DownloadButton 
          data={session} 
          filename={`deep-focus-session-${session.id}.json`} 
        />

        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-gray-300">
            <Calendar size={20} />
            <span className="text-xl">{new Date(session.date).toLocaleDateString()}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Clock size={16} />
                <span className="font-medium">Duration</span>
              </div>
              <div className="text-lg text-gray-200">
                {formatDuration(session.startTime, session.endTime)}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {formatDateTime(session.startTime)} - {formatDateTime(session.endTime)}
              </div>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Brain size={16} />
                <span className="font-medium">Cognitive Load</span>
              </div>
              <div className="text-lg text-gray-200">
                {session.cognitiveOverhead}/5
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Task Type: {session.taskType}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-400 mb-2">
              <ZapOff size={16} />
              <span className="font-medium">Interruptions</span>
            </div>
            <div className="text-lg text-gray-200">
              {session.interruptions} interruptions
            </div>
            {session.interruptionNotes && (
              <div className="mt-2 text-gray-400 whitespace-pre-wrap">
                {session.interruptionNotes}
              </div>
            )}
          </div>

          {session.notes && (
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-gray-300 font-medium mb-2">Session Notes</h3>
              <div className="text-gray-400 whitespace-pre-wrap">
                {session.notes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
