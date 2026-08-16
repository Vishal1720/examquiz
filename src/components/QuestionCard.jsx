import { Edit2, Trash2 } from 'lucide-react';

export const QuestionCard = ({ question, index, onEdit, onDelete, onAnswerSelect }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4 whitespace-pre-wrap">
            <span className="text-slate-500 dark:text-slate-400 mr-2">Question {index + 1}.</span>
            {question.question}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {['A', 'B', 'C', 'D'].map(opt => (
              <button
                key={opt}
                onClick={() => onAnswerSelect && onAnswerSelect(opt)}
                className={`p-3 rounded-lg border text-sm transition-all text-left w-full relative overflow-hidden ${question.answer === opt
                    ? 'border-green-300 dark:border-green-800/80 bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-400 ring-1 ring-green-500/30 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
              >
                <span className="font-bold mr-2 opacity-80">{opt}.</span>
                <span className="whitespace-pre-wrap">{question.options[opt]}</span>
              </button>
            ))}
          </div>

          <div className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center">
            <span>Correct Answer: <span className="text-green-600 dark:text-green-400 font-bold ml-1">{question.answer}</span></span>
            <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 ml-auto hidden sm:block">
              Click an option to change
            </span>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto justify-end sm:justify-start mt-4 sm:mt-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-700">
          <button
            onClick={onEdit}
            className="p-2 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
            title="Edit Question"
            aria-label={`Edit Question ${index + 1}`}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
            title="Delete Question"
            aria-label={`Delete Question ${index + 1}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
