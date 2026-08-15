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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Questions ({questions.length})
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Question</h3>
          <QuestionEditor
            onSave={handleAdd}
            onCancel={() => setIsAdding(false)}
          />
        </div>
      )}

      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={q.id}>
            {editingId === q.id ? (
              <div className="bg-white p-6 rounded-xl border border-indigo-200 shadow-sm ring-1 ring-indigo-500">
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

      <div className="flex justify-end gap-3 pt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={questions.length === 0}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          Continue to Settings
        </button>
      </div>
    </div>
  );
};
