import { Download } from 'lucide-react';
import { DeepWorkSession } from '../types/types';

interface DownloadButtonProps {
  data: DeepWorkSession | DeepWorkSession[];
  filename: string;
}

export const DownloadButton = ({ data, filename }: DownloadButtonProps) => {
  const handleDownload = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="absolute top-4 right-4 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-gray-100 p-2 rounded-lg transition-colors flex items-center space-x-2"
      title="Download as JSON"
    >
      <Download size={20} />
      <span>Download JSON</span>
    </button>
  );
};
