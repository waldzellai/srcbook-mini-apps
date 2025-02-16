import { TaskType } from '../types/types';

interface SessionFormProps {
  interruptionCount: number;
  onSubmit: (formData: {
    interruptionNotes: string;
    cognitiveOverhead: 1 | 2 | 3 | 4 | 5;
    taskType: TaskType;
    notes: string;
  }) => void;
}

export const SessionForm = ({ interruptionCount, onSubmit }: SessionFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      interruptionNotes: formData.get('interruptionNotes') as string,
      cognitiveOverhead: Number(formData.get('cognitiveOverhead')) as 1 | 2 | 3 | 4 | 5,
      taskType: formData.get('taskType') as TaskType,
      notes: formData.get('notes') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="text-xl font-semibold text-gray-100 mb-4">
        Session Summary
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Number of Interruptions
        </label>
        <div className="text-lg font-medium text-gray-100">{interruptionCount}</div>
      </div>

      <div className="space-y-2">
        <label htmlFor="interruptionNotes" className="block text-sm font-medium text-gray-300">
          Interruption Notes
        </label>
        <textarea
          id="interruptionNotes"
          name="interruptionNotes"
          rows={3}
          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="cognitiveOverhead" className="block text-sm font-medium text-gray-300">
          Cognitive Overhead (1-5)
        </label>
        <select
          id="cognitiveOverhead"
          name="cognitiveOverhead"
          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
          required
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num} className="bg-gray-800">
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="taskType" className="block text-sm font-medium text-gray-300">
          Task Type
        </label>
        <select
          id="taskType"
          name="taskType"
          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
          required
        >
          {['coding', 'writing', 'research', 'planning', 'learning', 'other'].map((type) => (
            <option key={type} value={type} className="bg-gray-800">
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-300">
          Session Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Save Session
      </button>
    </form>
  );
};
