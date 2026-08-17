export const QuizPreview = ({ questions, settings }) => {
  const isClassic = settings.template === 'classic';
  const isCompact = settings.template === 'compact';
  
  const containerClass = `w-full max-w-[794px] mx-auto bg-white shadow-2xl shadow-slate-900/10 dark:shadow-black/50 border border-slate-200 dark:border-slate-800 rounded mb-8 text-black relative ${
    isClassic ? 'font-serif' : 'font-sans'
  } before:absolute before:-inset-1 before:bg-white before:rounded-sm before:-z-10 before:shadow-md before:rotate-[0.5deg] after:absolute after:-inset-1 after:bg-white after:rounded-sm after:-z-20 after:shadow-sm after:-rotate-[0.5deg]`;

  return (
    <div className={containerClass} style={{ minHeight: '1123px', padding: '10mm' }}>
      
      {/* Header Section */}
      <div className={`mb-6 ${isClassic ? 'flex flex-col items-center text-center' : 'flex items-center gap-4 text-left border-b-2 border-gray-800 pb-4'}`}>
        {settings.logo && (
          <img src={settings.logo} alt="College Logo" className={`object-contain shrink-0 ${isClassic ? 'h-24 mb-4' : 'h-20'}`} />
        )}
        <div className={!isClassic ? 'flex-1' : ''}>
          {settings.institutionName && (
            <h1 className="text-xl font-bold uppercase mb-2">{settings.institutionName}</h1>
          )}
          {settings.examTitle && (
            <h2 className="text-lg font-bold uppercase mb-2">{settings.examTitle}</h2>
          )}
        </div>
      </div>

      {/* Info Details */}
      <div className={`flex justify-between items-end mb-4 text-[15px] ${!isClassic && 'bg-gray-50 p-4 rounded-sm border border-gray-200'}`}>
        <div>
          {settings.subject && <div className="mb-1"><span className="font-semibold">Subject:</span> {settings.subject}</div>}
          {settings.duration && <div><span className="font-semibold">Duration:</span> {settings.duration}</div>}
        </div>
        <div className="text-right">
          {settings.date && <div className="mb-1"><span className="font-semibold">Date:</span> {settings.date}</div>}
          {settings.totalMarks && <div><span className="font-semibold">Total Marks:</span> {settings.totalMarks}</div>}
        </div>
      </div>

      <div className="flex justify-between items-end mb-4 mt-6 text-[15px]">
        <div>Name: _______________________________________</div>
        <div>Register No: _________________________________</div>
      </div>

      <hr className="border-gray-400 mb-4" />

      {/* Instructions */}
      {settings.instructions && (
        <div className="mb-6 text-[15px]">
          <h3 className="font-bold mb-1">Instructions:</h3>
          <p className="whitespace-pre-wrap">{settings.instructions}</p>
          <hr className="border-gray-400 mt-4" />
        </div>
      )}

      {/* Questions */}
      <div className={`${isCompact ? 'columns-2 gap-8 space-y-0 text-[13px]' : 'space-y-6 text-[15px]'}`}>
        {questions.map((q, index) => (
          <div key={q.id} className={`${isCompact ? 'break-inside-avoid mb-6' : ''}`}>
            <div className="flex gap-2 mb-2">
              <span className="font-semibold whitespace-nowrap">{index + 1}.</span>
              <p className="whitespace-pre-wrap">{q.question}</p>
            </div>
            
            <div className={`ml-6 mt-2 ${
              (q.optionsLayout && q.optionsLayout !== 'default' ? q.optionsLayout : settings.optionsLayout) === '2-col' ? 'grid grid-cols-2 gap-2' :
              (q.optionsLayout && q.optionsLayout !== 'default' ? q.optionsLayout : settings.optionsLayout) === '4-col' ? 'grid grid-cols-4 gap-2' :
              'space-y-2'
            }`}>
              {['A', 'B', 'C', 'D'].map(opt => (
                <div key={opt} className="flex gap-2">
                  <span className="font-medium">{opt}.</span>
                  <span className="whitespace-pre-wrap">{q.options[opt]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
