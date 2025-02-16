import { useNavigate } from 'react-router-dom';
import { DeepWorkSession } from '../types/types';
import { Clock, Brain, ZapOff, ChevronRight } from 'lucide-react';
import { DownloadButton } from './DownloadButton';

interface SessionHistoryProps {
  sessions: DeepWorkSession[];
}

export const SessionHistory = ({ sessions }: SessionHistoryProps) => {
  const navigate = useNavigate();

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
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
    <div className="w-full max-w-2xl relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100">Previous Sessions</h2>
      </div>
      
      <div className="bg-gray-900/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl relative">
        <DownloadButton 
          data={sessions} 
          filename="deep-focus-sessions.json" 
        />
        
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => navigate(`/session/${session.id}`)}
              className="group bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 shadow-lg hover:bg-gray-700/50 transition-colors cursor-pointer relative"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-lg font-medium text-gray-100">
                  {new Date(session.date).toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Clock size={16} />
                  <span>{formatDateTime(session.startTime)} - {formatDateTime(session.endTime)}</span>
                  <span className="font-medium">({formatDuration(session.startTime, session.endTime)})</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-2">
                <div className="flex items-center space-x-1">
                  <ZapOff size={16} />
                  <span>{session.interruptions} interruptions</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Brain size={16} />
                  <span>Cognitive Load: {session.cognitiveOverhead}/5</span>
                </div>
                <div className="px-2 py-1 bg-gray-800/50 rounded-full text-gray-300">
                  {session.taskType}
                </div>
              </div>
              
              {session.notes && (
                <div className="mt-2 text-sm text-gray-400 line-clamp-2">
                  {session.notes}
                </div>
              )}

              <ChevronRight 
                size={20} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
