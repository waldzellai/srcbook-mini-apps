export type TaskType = 'coding' | 'writing' | 'research' | 'planning' | 'learning' | 'other';

export interface DeepWorkSession {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  interruptions: number;
  interruptionNotes: string;
  cognitiveOverhead: 1 | 2 | 3 | 4 | 5;
  taskType: TaskType;
  notes: string;
}

export type TimerStatus = 'idle' | 'running' | 'paused';
