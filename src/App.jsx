import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { ExcelUploader } from './components/ExcelUploader';
import { QuestionList } from './components/QuestionList';
import { PaperSettings } from './components/PaperSettings';
import { QuizPreview } from './components/QuizPreview';
import { DownloadButtons } from './components/DownloadButtons';

function App() {
  const [step, setStep] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [fileName, setFileName] = useState('');
  
  const [paperSettings, setPaperSettings] = useState(() => {
    const saved = localStorage.getItem('paperSettings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse settings from local storage');
      }
    }
    return {
      institutionName: '',
      subject: 'Mathematics',
      examTitle: '',
      date: '',
      duration: '',
      totalMarks: '',
      instructions: 'Answer all questions. Select the most appropriate answer.',
      optionsLayout: '1-col',
      template: 'classic'
    };
  });

  useEffect(() => {
    localStorage.setItem('paperSettings', JSON.stringify(paperSettings));
  }, [paperSettings]);

  const handleUploadSuccess = (parsedQuestions, name) => {
    setQuestions(parsedQuestions);
    setFileName(name);
    setStep(2);
  };

  const handleReset = () => {
    if (window.confirm('Start a new quiz? Current questions will be cleared, but your settings will be saved.')) {
      setQuestions([]);
      setFileName('');
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header onReset={questions.length > 0 ? handleReset : undefined} />
      
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <StepIndicator currentStep={step} />
        
        <div className="mt-8">
          {step === 1 && (
            <ExcelUploader onUploadSuccess={handleUploadSuccess} />
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center justify-between">
                <div>
                  <span className="font-semibold">{fileName}</span>
                  <div className="text-sm mt-1">✓ {questions.length} Questions Imported Successfully</div>
                </div>
              </div>
              <QuestionList 
                questions={questions} 
                setQuestions={setQuestions}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <PaperSettings 
                settings={paperSettings}
                setSettings={setPaperSettings}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            </div>
          )}

          {step >= 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Preview & Download</h2>
                  <p className="text-gray-500 mt-1">Review your question paper before downloading.</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    Back
                  </button>
                  {step === 4 && (
                    <button
                      onClick={() => setStep(5)}
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                      Continue to Download
                    </button>
                  )}
                </div>
              </div>

              {step === 5 && (
                <div className="mb-12 p-8 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Your PDFs are ready to generate</h3>
                  <DownloadButtons questions={questions} settings={paperSettings} />
                </div>
              )}

              <div className="mt-8 bg-gray-100 p-4 sm:p-8 rounded-xl overflow-x-auto shadow-inner">
                <QuizPreview questions={questions} settings={paperSettings} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
