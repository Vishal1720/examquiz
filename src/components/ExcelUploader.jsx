import { useState } from 'react';
import { UploadCloud, FileSpreadsheet } from 'lucide-react';
import { downloadSampleExcel, parseExcelFile } from '../utils/excel';
import { validateQuestionsData } from '../utils/questionValidation';

export const ExcelUploader = ({ onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = async (file) => {
    if (!file) return;

    setError(null);

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('Please upload a valid Excel file (.xlsx or .xls)');
      return;
    }

    setIsLoading(true);
    try {
      const data = await parseExcelFile(file);
      const questions = validateQuestionsData(data);
      onUploadSuccess(questions, file.name);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 text-center pt-8">
      <div className="animate-fade-in-up">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
          Turn your <span className="text-gradient">Excel data</span> into a professional question paper.
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg">
          Start by downloading our sample template, fill it with your questions, and upload it back here.
        </p>
        <button
          onClick={downloadSampleExcel}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-brand-400 transition-all shadow-sm hover:shadow-md active:scale-95 group"
        >
          <FileSpreadsheet className="w-5 h-5 text-slate-400 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors" />
          Download Sample Template
        </button>
      </div>

      <div className="relative group">
        {/* Glow effect behind dropzone */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-brand-400 to-amber-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isDragging ? 'opacity-75 duration-200' : ''}`}></div>
        
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-[2rem] p-8 md:p-16 transition-all duration-300 backdrop-blur-xl ${isDragging
              ? 'border-brand-500 bg-brand-50/90 dark:bg-brand-900/20 shadow-2xl shadow-brand-500/20 scale-[1.02]'
              : 'border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 hover:border-brand-400 dark:hover:border-brand-500 hover:bg-slate-50/90 dark:hover:bg-slate-800'
            }`}
        >
          <div className="relative">
             <UploadCloud className={`w-16 h-16 mx-auto mb-6 transition-all duration-500 ${isDragging ? 'text-brand-500 scale-110 animate-float' : 'text-slate-300 dark:text-slate-600 group-hover:text-brand-400'}`} />
          </div>
          <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Drag & Drop your Excel file
          </p>
          <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">or click to browse from your computer</p>

          <label htmlFor="excel-upload" className="inline-block cursor-pointer">
            <input
              id="excel-upload"
              type="file"
              className="hidden"
              accept=".xlsx, .xls"
              onChange={handleFileInput}
            />
            <span className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 rounded-xl text-sm font-semibold text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 active:translate-y-0">
              {isLoading ? 'Processing...' : 'Select File'}
            </span>
          </label>
          <p className="text-xs text-slate-400 mt-6 font-medium tracking-wide uppercase">Supports .xlsx and .xls</p>
        </div>
      </div>



      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium shadow-sm animate-fade-in-up">
          {error}
        </div>
      )}
    </div>
  );
};
