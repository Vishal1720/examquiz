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
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-indigo-500 rounded-xl text-sm font-bold text-indigo-700 hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
      >
        <FileText className="w-5 h-5" />
        Question Paper PDF
      </button>

      <button
        onClick={handleDownloadKey}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-emerald-500 rounded-xl text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
      >
        <CheckSquare className="w-5 h-5" />
        Answer Key PDF
      </button>

      <button
        onClick={handleDownloadBoth}
        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-brand-600 to-indigo-600 rounded-xl text-sm font-bold text-white hover:from-brand-500 hover:to-indigo-500 transition-all shadow-md hover:shadow-xl hover:shadow-brand-500/30 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
        <Download className="w-5 h-5 relative z-10" />
        <span className="relative z-10">Download Both</span>
      </button>
    </div>
  );
};
