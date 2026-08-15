import { useState } from 'react';

export const QuestionEditor = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      id: Date.now(),
      question: '',
      options: { A: '', B: '', C: '', D: '' },
      answer: 'A'
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
        <textarea
          required
          rows={3}
          value={formData.question}
          onChange={(e) => handleChange('question', e.target.value)}
          className="w-full rounded-lg border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
          placeholder="Enter question text here..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['A', 'B', 'C', 'D'].map(opt => (
          <div key={opt}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Option {opt}</label>
            <input
              type="text"
              required
              value={formData.options[opt]}
              onChange={(e) => handleChange(opt, e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
              placeholder={`Enter option ${opt}`}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
        <select
          value={formData.answer}
          onChange={(e) => handleChange('answer', e.target.value)}
          className="w-full md:w-48 rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all bg-white"
        >
          {['A', 'B', 'C', 'D'].map(opt => (
            <option key={opt} value={opt}>Option {opt}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-lg hover:bg-sky-700 transition-colors shadow-sm"
        >
          {initialData ? 'Save Changes' : 'Add Question'}
        </button>
      </div>
    </form>
  );
};
