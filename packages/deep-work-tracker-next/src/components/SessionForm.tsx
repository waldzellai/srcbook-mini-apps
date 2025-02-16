'use client';

import { useState } from 'react';
import { TaskType } from '@/types';

interface SessionFormProps {
  interruptionCount: number;
  onSubmit: (data: {
    interruptionNotes: string;
    cognitiveOverhead: 1 | 2 | 3 | 4 | 5;
    taskType: TaskType;
    notes: string;
  }) => void;
}

export const SessionForm = ({ interruptionCount, onSubmit }: SessionFormProps) => {
  const [formData, setFormData] = useState({
    interruptionNotes: '',
    cognitiveOverhead: 3 as 1 | 2 | 3 | 4 | 5,
    taskType: 'coding' as TaskType,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Session Summary</h2>
        <p className="text-gray-400 mb-6">
          You had {interruptionCount} interruption{interruptionCount !== 1 ? 's' : ''} during this session
        </p>
      </div>

      {interruptionCount > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Interruption Notes
          </label>
          <textarea
            value={formData.interruptionNotes}
            onChange={(e) => setFormData({ ...formData, interruptionNotes: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
            rows={3}
            placeholder="What caused the interruptions?"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Cognitive Overhead (1-5)
        </label>
        <div className="flex space-x-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFormData({ ...formData, cognitiveOverhead: value as 1 | 2 | 3 | 4 | 5 })}
              className={`w-10 h-10 rounded-full ${
                formData.cognitiveOverhead === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Task Type
        </label>
        <select
          value={formData.taskType}
          onChange={(e) => setFormData({ ...formData, taskType: e.target.value as TaskType })}
          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
        >
          <option value="coding">Coding</option>
          <option value="writing">Writing</option>
          <option value="research">Research</option>
          <option value="planning">Planning</option>
          <option value="learning">Learning</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Session Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
          rows={4}
          placeholder="What did you accomplish in this session?"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
      >
        Save Session
      </button>
    </form>
  );
};
