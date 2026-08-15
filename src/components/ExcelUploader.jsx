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
    <div className="max-w-2xl mx-auto space-y-8 text-center pt-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          Convert your Mathematics question bank into a professional question paper and answer key.
        </h2>
        <p className="text-gray-500 mb-6">
          Start by downloading our sample template, fill it with your questions, and upload it back here.
        </p>
        <button
          onClick={downloadSampleExcel}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors shadow-sm"
        >
          <FileSpreadsheet className="w-5 h-5" />
          Download Sample Excel
        </button>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 transition-all ${isDragging
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
          }`}
      >
        <UploadCloud className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-indigo-500' : 'text-gray-400'}`} />
        <p className="text-lg font-medium text-gray-900 mb-1">
          Drag & Drop Excel File Here
        </p>
        <p className="text-sm text-gray-500 mb-6">or</p>

        <label className="inline-block cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept=".xlsx, .xls"
            onChange={handleFileInput}
          />
          <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">
            {isLoading ? 'Processing...' : 'Choose File'}
          </span>
        </label>
        <p className="text-xs text-gray-400 mt-4">.xlsx / .xls</p>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-gray-500 mb-4">Don't have an Excel file?</p>
        <button
          onClick={() => onUploadSuccess([], 'Manual Quiz')}
          className="px-6 py-2.5 bg-white border-2 border-indigo-600 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-50 transition-colors shadow-sm"
        >
          Create Questions Manually
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
