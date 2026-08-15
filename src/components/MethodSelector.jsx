import { FileSpreadsheet, Keyboard } from 'lucide-react';

export const MethodSelector = ({ onSelect }) => {
  return (
    <div className="max-w-4xl mx-auto pt-2">
      <div className="text-center mb-8 animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight leading-tight">
          How would you like to <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-amber-500">add questions?</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Choose the method that works best for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {/* Excel Option */}
        <button
          onClick={() => onSelect('excel')}
          className="group relative p-6 glass-card rounded-3xl text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-500/20 border-2 border-transparent hover:border-sky-400 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
            <FileSpreadsheet className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-sky-700 transition-colors">
            Upload Excel File
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Already have your questions in an Excel sheet? Upload it and we'll instantly convert it into a beautiful PDF.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600">
            Upload file 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </button>

        {/* Manual Option */}
        <button
          onClick={() => onSelect('manual')}
          className="group relative p-6 glass-card rounded-3xl text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-500/20 border-2 border-transparent hover:border-amber-400 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
            <Keyboard className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-700 transition-colors">
            Write Manually
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Don't have a file ready? Write or paste your questions directly into our easy-to-use editor.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600">
            Start typing 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </button>
      </div>
    </div>
  );
};
