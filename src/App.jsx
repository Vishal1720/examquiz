import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { MethodSelector } from './components/MethodSelector';
import { ExcelUploader } from './components/ExcelUploader';
import { QuestionList } from './components/QuestionList';
import { PaperSettings } from './components/PaperSettings';
import { QuizPreview } from './components/QuizPreview';
import { DownloadButtons } from './components/DownloadButtons';
import { AboutPage } from './components/AboutPage';

function App({ initialView }) {
  const [step, setStep] = useState(1);
  const [creationMethod, setCreationMethod] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [fileName, setFileName] = useState('');
  const [currentView, setCurrentView] = useState(() => {
    if (initialView) return initialView;
    if (typeof window !== 'undefined') {
      return window.location.pathname === '/about' ? 'about' : 'app';
    }
    return 'app';
  });
  
  const [paperSettings, setPaperSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('paperSettings');
      if (saved) {
      try {
        return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse settings from local storage');
        }
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('paperSettings', JSON.stringify(paperSettings));
    }
  }, [paperSettings]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initialPath = window.location.pathname === '/about' ? '/about' : '/';
    window.history.replaceState({ step: 1, creationMethod: null, view: window.location.pathname === '/about' ? 'about' : 'app' }, '', initialPath);

    const handlePopState = (e) => {
      if (e.state) {
        setStep(e.state.step || 1);
        setCreationMethod(e.state.creationMethod || null);
        setCurrentView(e.state.view || 'app');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (newStep, newMethod) => {
    const methodToSave = newMethod !== undefined ? newMethod : creationMethod;
    setStep(newStep);
    if (newMethod !== undefined) setCreationMethod(newMethod);
    setCurrentView('app');
    window.history.pushState({ step: newStep, creationMethod: methodToSave, view: 'app' }, '', '');
  };

  const navigateToView = (viewName) => {
    setCurrentView(viewName);
    const path = viewName === 'about' ? '/about' : '/';
    window.history.pushState({ step, creationMethod, view: viewName }, '', path);
  };

  const handleUploadSuccess = (parsedQuestions, name) => {
    setQuestions(parsedQuestions);
    setFileName(name);
    navigateTo(2, name === 'Manual Quiz' ? 'manual' : 'excel');
  };

  const handleReset = () => {
    if (window.confirm('Start a new quiz? Current questions will be cleared, but your settings will be saved.')) {
      setQuestions([]);
      setFileName('');
      navigateTo(1, null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative overflow-hidden text-slate-800">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-sky-200/40 blur-[100px] animate-pulse-soft" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-amber-200/30 blur-[120px] animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      <Header onReset={questions.length > 0 && currentView === 'app' ? handleReset : undefined} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-4 md:py-8 relative z-0">
        {currentView === 'about' ? (
          <AboutPage onBack={() => navigateToView('app')} />
        ) : (
          <>
            <StepIndicator currentStep={step} />
            
            <div className="mt-4 md:mt-8">
          {step === 1 && (
            <>
              {creationMethod === null ? (
                <MethodSelector 
                  onSelect={(method) => {
                    if (method === 'manual') {
                      handleUploadSuccess([], 'Manual Quiz');
                    } else {
                      navigateTo(1, 'excel');
                    }
                  }} 
                />
              ) : creationMethod === 'excel' ? (
                <div>
                  <button
                    onClick={() => navigateTo(1, null)}
                    className="mb-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all active:scale-95"
                  >
                    ← Back to Options
                  </button>
                  <ExcelUploader onUploadSuccess={handleUploadSuccess} />
                </div>
              ) : null}
            </>
          )}

          {step === 2 && (
            <div className="animate-fade-in-up">
              <div className="mb-8 p-5 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center justify-between shadow-sm">
                <div>
                  <span className="font-semibold text-lg">{fileName}</span>
                  <div className="text-sm mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span> 
                    {questions.length} Questions Imported Successfully
                  </div>
                </div>
              </div>
              <QuestionList 
                questions={questions} 
                setQuestions={setQuestions}
                onNext={() => navigateTo(3)}
                onBack={() => {
                  if (fileName === 'Manual Quiz') {
                    navigateTo(1, null);
                  } else {
                    navigateTo(1, 'excel');
                  }
                }}
              />
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in-up">
              <PaperSettings 
                settings={paperSettings}
                setSettings={setPaperSettings}
                onNext={() => navigateTo(4)}
                onBack={() => navigateTo(2)}
              />
            </div>
          )}

          {step >= 4 && (
            <div className="animate-fade-in-up max-w-6xl mx-auto">
              <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Preview & Download</h2>
                  <p className="text-slate-500 mt-2 text-lg">Review your question paper before downloading.</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigateTo(3)}
                    className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all shadow-sm hover:shadow active:scale-95"
                  >
                    Back
                  </button>
                  {step === 4 && (
                    <button
                      onClick={() => navigateTo(5)}
                      className="px-6 py-2.5 bg-sky-600 text-white rounded-xl font-medium hover:bg-sky-700 transition-all shadow-md hover:shadow-lg hover:shadow-sky-500/20 active:scale-95"
                    >
                      Continue to Download
                    </button>
                  )}
                </div>
              </div>

              {step === 5 && (
                <div className="mb-12 p-10 glass-card rounded-2xl text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-amber-500 to-emerald-400"></div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-8">Your PDFs are ready to generate</h3>
                  <DownloadButtons questions={questions} settings={paperSettings} />
                </div>
              )}

              <div className="mt-8 bg-slate-100/50 backdrop-blur-sm p-4 sm:p-8 rounded-2xl overflow-x-auto shadow-inner border border-slate-200/50">
                <QuizPreview questions={questions} settings={paperSettings} />
              </div>
            </div>
          )}
        </div>
      </>
    )}
  </main>
      
      <footer className="py-8 text-center text-slate-500 text-sm mt-auto glass border-t-0 border-slate-200/50 relative z-10">
        Created by <button onClick={() => navigateToView('about')} className="text-sky-600 hover:text-sky-800 font-bold transition-colors underline-offset-4 hover:underline">VarSync</button>
      </footer>
    </div>
  );
}

export default App;
