import { BookOpen } from 'lucide-react';

export const Header = ({ onReset }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600">
          <BookOpen className="w-6 h-6" />
          <h1 className="text-xl font-bold">Maths Quiz Paper Generator</h1>
        </div>

        {onReset && (
          <button
            onClick={onReset}
            className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
          >
            Start New Quiz
          </button>
        )}
      </div>
    </header>
  );
};
