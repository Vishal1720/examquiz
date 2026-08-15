import { BookOpen } from 'lucide-react';

export const Header = ({ onReset }) => {
  return (
    <header className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sky-600 group cursor-default">
          <div className="p-2.5 bg-sky-50 rounded-xl group-hover:bg-sky-100 transition-colors">
            <BookOpen className="w-6 h-6 text-sky-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Paper<span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-amber-500">QuizMaker</span>
          </h1>
        </div>

        {onReset && (
          <button
            onClick={onReset}
            className="text-sm font-semibold text-slate-500 hover:text-sky-600 px-4 py-2 rounded-lg hover:bg-sky-50 transition-all active:scale-95"
          >
            Start New Quiz
          </button>
        )}
      </div>
    </header>
  );
};
