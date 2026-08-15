import { FileText, CheckSquare, Download } from 'lucide-react';
import { generateQuestionPaperPDF, generateAnswerKeyPDF } from '../utils/pdf';

export const DownloadButtons = ({ questions, settings }) => {
  const handleDownloadPaper = () => generateQuestionPaperPDF(questions, settings);
  const handleDownloadKey = () => generateAnswerKeyPDF(questions, settings);

  const handleDownloadBoth = () => {
    handleDownloadPaper();
    // Adding small delay to ensure reliable download triggers
    setTimeout(() => {
      handleDownloadKey();
    }, 500);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={handleDownloadPaper}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-indigo-600 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-50 transition-colors shadow-sm"
      >
        <FileText className="w-5 h-5" />
        Download Question Paper PDF
      </button>

      <button
        onClick={handleDownloadKey}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-green-600 rounded-lg text-sm font-medium text-green-700 hover:bg-green-50 transition-colors shadow-sm"
      >
        <CheckSquare className="w-5 h-5" />
        Download Answer Key PDF
      </button>

      <button
        onClick={handleDownloadBoth}
        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
      >
        <Download className="w-5 h-5" />
        Download Both
      </button>
    </div>
  );
};
