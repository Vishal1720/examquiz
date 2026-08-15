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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Questions <span className="text-sky-600 bg-sky-50 px-3 py-1 rounded-full text-lg ml-2">{questions.length}</span>
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md shadow-sky-500/5 mb-6 animate-fade-in-up">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
             <div className="w-2 h-6 bg-sky-500 rounded-full"></div>
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
              <div className="bg-white p-6 rounded-2xl border border-sky-200 shadow-md shadow-sky-500/10 ring-2 ring-sky-500/20">
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

      <div className="flex justify-end gap-3 pt-8 border-t border-slate-200/60 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all shadow-sm hover:shadow active:scale-95"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={questions.length === 0}
          className="px-8 py-3 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700 transition-all shadow-md hover:shadow-lg hover:shadow-sky-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100"
        >
          Continue to Settings
        </button>
      </div>
    </div>
  );
};
