import { Upload, X } from 'lucide-react';

export const PaperSettings = ({ settings, setSettings, onNext, onBack }) => {
  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('logo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    handleChange('logo', '');
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
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
          <span className="w-3 h-3 rounded-full bg-brand-500 dark:bg-brand-400"></span>
        </span>
        Paper Settings
      </h2>

      <div className="glass-card p-8 sm:p-10 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Logo & Institution Name */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-6">
            <div>
              <label htmlFor="logo-upload" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                College Logo
              </label>
              <div className="relative group rounded-xl border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full aspect-square flex flex-col items-center justify-center overflow-hidden">
                {settings.logo ? (
                  <>
                    <img src={settings.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                    <button 
                      onClick={removeLogo}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove Logo"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-2 text-slate-400 dark:text-slate-500">
                    <Upload className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-xs text-center block leading-tight mt-1">Upload<br/>Logo</span>
                  </div>
                )}
                <input 
                  id="logo-upload"
                  type="file" 
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  title="Upload Logo"
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="institutionName" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Institution Name
              </label>
              <input
                id="institutionName"
                type="text"
                value={settings.institutionName || ''}
                onChange={(e) => handleChange('institutionName', e.target.value)}
                placeholder="e.g. Poornaprajna Institute of Management"
                className="w-full rounded-xl border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-900/50 p-3 text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Other Fields */}
          {fields.slice(1).map(f => (
            <div key={f.id}>
              <label htmlFor={f.id} className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {f.label}
              </label>
              <input
                id={f.id}
                type={f.type || 'text'}
                value={settings[f.id] || ''}
                onChange={(e) => handleChange(f.id, e.target.value)}
                placeholder={f.placeholder}
                className="w-full rounded-xl border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-900/50 p-3 text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label htmlFor="instructions" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Instructions
            </label>
            <textarea
              id="instructions"
              rows={3}
              value={settings.instructions}
              onChange={(e) => handleChange('instructions', e.target.value)}
              placeholder="e.g. Answer all questions. Select the most appropriate answer."
              className="w-full rounded-xl border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-900/50 p-3 text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all resize-y placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="template" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Paper Template
            </label>
            <select
              id="template"
              value={settings.template || 'classic'}
              onChange={(e) => handleChange('template', e.target.value)}
              className="w-full rounded-xl border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-900 p-3 text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="classic">Classic Academic</option>
              <option value="modern">Modern Assessment</option>
              <option value="compact">Compact (2-Column)</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label htmlFor="optionsLayout" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Options Layout
            </label>
            <select
              id="optionsLayout"
              value={settings.optionsLayout || '1-col'}
              onChange={(e) => handleChange('optionsLayout', e.target.value)}
              className="w-full rounded-xl border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-900 p-3 text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="1-col">1 Column (Stacked)</option>
              <option value="2-col">2 Columns (Side-by-side)</option>
              <option value="4-col">4 Columns (Inline)</option>
            </select>
          </div>
        </div>
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
          className="px-8 py-3 bg-sky-600 dark:bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-700 dark:hover:bg-sky-600 transition-all shadow-md hover:shadow-lg hover:shadow-sky-500/20 dark:hover:shadow-sky-500/10 active:scale-95"
        >
          Preview & Download
        </button>
      </div>
    </div>
  );
};
