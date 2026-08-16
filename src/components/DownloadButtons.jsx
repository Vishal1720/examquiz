import { FileText, CheckSquare, Download } from 'lucide-react';
import { generateQuestionPaperPDF, generateAnswerKeyPDF } from '../utils/pdf';
import { generateQuestionPaperWord, generateAnswerKeyWord } from '../utils/word';

export const DownloadButtons = ({ questions, settings }) => {
  const handleDownloadPaperPDF = () => generateQuestionPaperPDF(questions, settings);
  const handleDownloadKeyPDF = () => generateAnswerKeyPDF(questions, settings);
  const handleDownloadPaperWord = () => generateQuestionPaperWord(questions, settings);
  const handleDownloadKeyWord = () => generateAnswerKeyWord(questions, settings);


  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handleDownloadPaperPDF}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-indigo-500 rounded-xl text-sm font-bold text-indigo-700 hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
        >
          <FileText className="w-5 h-5" />
          Question Paper (PDF)
        </button>

        <button
          onClick={handleDownloadPaperWord}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-500 rounded-xl text-sm font-bold text-blue-700 hover:bg-blue-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
        >
          <FileText className="w-5 h-5" />
          Question Paper (Word)
        </button>

        <button
          onClick={handleDownloadKeyPDF}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-emerald-500 rounded-xl text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
        >
          <CheckSquare className="w-5 h-5" />
          Answer Key (PDF)
        </button>

        <button
          onClick={handleDownloadKeyWord}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-teal-500 rounded-xl text-sm font-bold text-teal-700 hover:bg-teal-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
        >
          <CheckSquare className="w-5 h-5" />
          Answer Key (Word)
        </button>
      </div>
    </div>
  );
};
