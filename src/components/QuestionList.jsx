import { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { QuestionEditor } from './QuestionEditor';
import { Plus } from 'lucide-react';

export const QuestionList = ({ questions, setQuestions, onNext, onBack }) => {
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleSave = (updatedQuestion) => {
    setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    setEditingId(null);
  };

  const handleAdd = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
    setIsAdding(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Questions <span className="text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-3 py-1 rounded-full text-lg ml-2">{questions.length}</span>
        </h2>
        <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsAdding(true)}
            className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-200 dark:hover:border-slate-600 transition-all shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Question</span>
            <span className="sm:hidden">Add</span>
          </button>

          <button
            onClick={onNext}
            disabled={questions.length === 0}
            className="flex-1 sm:flex-none inline-flex justify-center items-center px-5 py-2.5 bg-sky-600 dark:bg-sky-500 text-white rounded-xl text-sm font-semibold hover:bg-sky-700 dark:hover:bg-sky-600 transition-all shadow-md hover:shadow-lg hover:shadow-sky-500/20 dark:hover:shadow-sky-500/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100"
          >
            Continue &rarr;
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md shadow-brand-500/5 dark:shadow-none mb-6 animate-fade-in-up">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
             <div className="w-2 h-6 bg-brand-500 dark:bg-brand-400 rounded-full"></div>
             Add New Question
          </h3>
          <QuestionEditor
            onSave={handleAdd}
            onCancel={() => setIsAdding(false)}
          />
        </div>
      )}

      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={q.id} className="transition-all duration-300">
            {editingId === q.id ? (
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-brand-200 dark:border-brand-800/50 shadow-md shadow-brand-500/10 ring-2 ring-brand-500/20 dark:ring-brand-500/10">
                <QuestionEditor
                  initialData={q}
                  onSave={handleSave}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <QuestionCard
                question={q}
                index={index}
                onEdit={() => setEditingId(q.id)}
                onDelete={() => handleDelete(q.id)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-8 border-t border-slate-200/60 dark:border-slate-700/60 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow active:scale-95"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={questions.length === 0}
          className="px-8 py-3 bg-sky-600 dark:bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-700 dark:hover:bg-sky-600 transition-all shadow-md hover:shadow-lg hover:shadow-sky-500/20 dark:hover:shadow-sky-500/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100"
        >
          Continue to Settings
        </button>
      </div>
    </div>
  );
};
