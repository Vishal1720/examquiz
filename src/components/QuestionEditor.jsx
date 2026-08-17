import { useState } from 'react';

export const QuestionEditor = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      id: Date.now(),
      question: '',
      options: { A: '', B: '', C: '', D: '' },
      answer: 'A',
      optionsLayout: 'default'
    }
  );

  const handleChange = (field, value) => {
    if (['A', 'B', 'C', 'D'].includes(field)) {
      setFormData({
        ...formData,
        options: { ...formData.options, [field]: value }
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.options.A.trim() || !formData.options.B.trim() || !formData.options.C.trim() || !formData.options.D.trim()) {
      alert('Please fill in all fields before saving.');
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Question</label>
        <textarea
          required
          rows={3}
          value={formData.question}
          onChange={(e) => handleChange('question', e.target.value)}
          className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 p-3 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
          placeholder="Enter question text here..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['A', 'B', 'C', 'D'].map(opt => (
          <div key={opt}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Option {opt}</label>
            <input
              type="text"
              required
              value={formData.options[opt]}
              onChange={(e) => handleChange(opt, e.target.value)}
              className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 p-2 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
              placeholder={`Enter option ${opt}`}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Correct Answer</label>
        <select
          value={formData.answer}
          onChange={(e) => handleChange('answer', e.target.value)}
          className="w-full md:w-48 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 p-2 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
        >
          {['A', 'B', 'C', 'D'].map(opt => (
            <option key={opt} value={opt}>Option {opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Options Layout</label>
        <select
          value={formData.optionsLayout || 'default'}
          onChange={(e) => handleChange('optionsLayout', e.target.value)}
          className="w-full md:w-48 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 p-2 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
        >
          <option value="default">Default (From Settings)</option>
          <option value="1-col">1 Column (Stacked)</option>
          <option value="2-col">2 Columns (Side-by-side)</option>
          <option value="4-col">4 Columns (Inline)</option>
        </select>
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-brand-600 dark:bg-brand-500 border border-transparent rounded-lg hover:bg-brand-700 dark:hover:bg-brand-600 transition-colors shadow-sm"
        >
          {initialData ? 'Save Changes' : 'Add Question'}
        </button>
      </div>
    </form>
  );
};
