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
import { JnanaSudhaEndpoint } from './components/JnanaSudhaEndpoint';

function App({ initialView }) {
  const [step, setStep] = useState(1);
  const [creationMethod, setCreationMethod] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [fileName, setFileName] = useState('');
  const [currentView, setCurrentView] = useState(() => {
    if (initialView) return initialView;
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/about') return 'about';
      if (path === '/jnanasudha') return 'jnanasudha';
      return 'app';
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

    const path = window.location.pathname;
    const initialView = path === '/about' ? 'about' : path === '/jnanasudha' ? 'jnanasudha' : 'app';
    const initialPath = path === '/about' ? '/about' : path === '/jnanasudha' ? '/jnanasudha' : '/';
    window.history.replaceState({ step: 1, creationMethod: null, view: initialView }, '', initialPath);

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
    window.history.pushState({ step: newStep, creationMethod: methodToSave, view: 'app' }, '', '/');
  };

  const navigateToView = (viewName) => {
    setCurrentView(viewName);
    let path = '/';
    if (viewName === 'about') path = '/about';
    if (viewName === 'jnanasudha') path = '/jnanasudha';
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

  const highestAccessibleStep = questions.length > 0 ? 5 : (creationMethod ? 2 : 1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans relative overflow-hidden text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-200/40 dark:bg-brand-900/20 blur-[100px] animate-pulse-soft" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-amber-200/30 dark:bg-amber-900/10 blur-[120px] animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      <Header onReset={questions.length > 0 && currentView === 'app' ? handleReset : undefined} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-4 md:py-8 relative z-0">
        {currentView === 'about' ? (
          <AboutPage onBack={() => navigateToView('app')} />
        ) : currentView === 'jnanasudha' ? (
          <JnanaSudhaEndpoint 
            onContinue={() => navigateTo(1, 'excel')}
            onBack={() => navigateToView('app')}
          />
        ) : (
          <>
            <div className="hidden md:block">
              <StepIndicator 
                currentStep={step} 
                highestAccessibleStep={highestAccessibleStep}
                onStepClick={(s) => navigateTo(s)}
              />
            </div>
            
            <div className="mt-4 md:mt-8 pb-24 md:pb-8">
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
                    className="mb-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800 rounded-lg transition-all active:scale-95"
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
              <div className="mb-8 p-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl text-green-700 dark:text-green-400 flex items-center justify-between shadow-sm">
                <div>
                  <span className="font-semibold text-lg">{fileName}</span>
                  <div className="text-sm mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 inline-block"></span> 
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
              <div className="flex justify-between items-end mb-8 border-b border-slate-200 dark:border-slate-700/50 pb-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Preview & Download</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Review your question paper before downloading.</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigateTo(3)}
                    className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow active:scale-95"
                  >
                    Back
                  </button>
                  {step === 4 && (
                    <button
                      onClick={() => navigateTo(5)}
                      className="px-6 py-2.5 bg-sky-600 dark:bg-sky-500 text-white rounded-xl font-medium hover:bg-sky-700 dark:hover:bg-sky-600 transition-all shadow-md hover:shadow-lg hover:shadow-sky-500/20 dark:hover:shadow-sky-500/10 active:scale-95"
                    >
                      Continue to Download
                    </button>
                  )}
                </div>
              </div>

              {step === 5 && (
                <div className="mb-12 p-10 glass-card rounded-2xl text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 via-amber-500 to-emerald-400"></div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Your files are ready to generate</h3>
                  <DownloadButtons questions={questions} settings={paperSettings} />
                </div>
              )}

              <div className="mt-8 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm p-4 sm:p-8 rounded-2xl overflow-x-auto shadow-inner border border-slate-200/50 dark:border-slate-700/50">
                <QuizPreview questions={questions} settings={paperSettings} />
              </div>
            </div>
          )}

          {/* Mobile Bottom Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50 px-2 pb-safe pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-none">
            <StepIndicator 
              currentStep={step} 
              highestAccessibleStep={highestAccessibleStep}
              onStepClick={(s) => navigateTo(s)}
              isMobile={true}
            />
          </div>
        </div>
      </>
    )}
  </main>
      
      <footer className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm mt-auto glass border-t-0 border-slate-200/50 dark:border-slate-800/50 relative z-10">
        Created by <button onClick={() => navigateToView('about')} className="text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 font-bold transition-colors underline-offset-4 hover:underline">VarSync</button>
      </footer>
    </div>
  );
}

export default App;
