import { Edit2, Trash2 } from 'lucide-react';

export const QuestionCard = ({ question, index, onEdit, onDelete }) => {
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
              <div
                key={opt}
                className={`p-3 rounded-lg border text-sm transition-colors ${question.answer === opt
                    ? 'border-green-200 dark:border-green-800/50 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-400'
                    : 'border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300'
                  }`}
              >
                <span className="font-semibold mr-2">{opt}.</span>
                <span className="whitespace-pre-wrap">{question.options[opt]}</span>
              </div>
            ))}
          </div>

          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Correct Answer: <span className="text-green-600 dark:text-green-400 font-bold ml-1">{question.answer}</span>
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
