import { BookOpen, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const Header = ({ onReset }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 text-brand-600 dark:text-brand-400 group cursor-default">
          <div className="p-2.5 bg-brand-50 dark:bg-slate-800 rounded-xl group-hover:bg-brand-100 dark:group-hover:bg-slate-700 transition-colors">
            <BookOpen className="w-6 h-6 text-brand-600 dark:text-brand-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            Paper<span className="text-gradient">QuizMaker</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          {onReset && (
            <button
              onClick={onReset}
              className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 px-4 py-2 rounded-lg hover:bg-brand-50 dark:hover:bg-slate-800 transition-all active:scale-95"
              aria-label="Start a new quiz"
            >
              Start New Quiz
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
