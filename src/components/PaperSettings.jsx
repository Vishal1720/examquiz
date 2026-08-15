export const PaperSettings = ({ settings, setSettings, onNext, onBack }) => {
  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const fields = [
    { id: 'institutionName', label: 'Institution Name', placeholder: 'e.g. Poornaprajna Institute of Management' },
    { id: 'subject', label: 'Subject', placeholder: 'e.g. Mathematics' },
    { id: 'examTitle', label: 'Exam / Quiz Title', placeholder: 'e.g. Mathematics Internal Assessment' },
    { id: 'date', label: 'Date', type: 'date' },
    { id: 'duration', label: 'Duration', placeholder: 'e.g. 30 Minutes' },
    { id: 'totalMarks', label: 'Total Marks', type: 'number', placeholder: 'e.g. 20' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Paper Settings</h2>

      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map(f => (
            <div key={f.id} className={f.id === 'institutionName' ? 'md:col-span-2' : ''}>
              <label htmlFor={f.id} className="block text-sm font-medium text-gray-700 mb-1">
                {f.label}
              </label>
              <input
                id={f.id}
                type={f.type || 'text'}
                value={settings[f.id]}
                onChange={(e) => handleChange(f.id, e.target.value)}
                placeholder={f.placeholder}
                className="w-full rounded-lg border-gray-300 border p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
              Instructions
            </label>
            <textarea
              id="instructions"
              rows={3}
              value={settings.instructions}
              onChange={(e) => handleChange('instructions', e.target.value)}
              placeholder="e.g. Answer all questions. Select the most appropriate answer."
              className="w-full rounded-lg border-gray-300 border p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">
              Paper Template
            </label>
            <select
              id="template"
              value={settings.template || 'classic'}
              onChange={(e) => handleChange('template', e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
            >
              <option value="classic">Classic Academic</option>
              <option value="modern">Modern Assessment</option>
              <option value="compact">Compact (2-Column)</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label htmlFor="optionsLayout" className="block text-sm font-medium text-gray-700 mb-1">
              Options Layout
            </label>
            <select
              id="optionsLayout"
              value={settings.optionsLayout || '1-col'}
              onChange={(e) => handleChange('optionsLayout', e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
            >
              <option value="1-col">1 Column (Stacked)</option>
              <option value="2-col">2 Columns (Side-by-side)</option>
              <option value="4-col">4 Columns (Inline)</option>
            </select>
          </div>
        </div>
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
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Preview & Download
        </button>
      </div>
    </div>
  );
};
