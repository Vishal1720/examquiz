import { Upload, List, Settings, Eye, Download } from 'lucide-react';

export const StepIndicator = ({ currentStep, onStepClick, highestAccessibleStep = 5, isMobile = false }) => {
  const steps = [
    { id: 1, name: 'Add Questions', icon: Upload },
    { id: 2, name: 'Questions', icon: List },
    { id: 3, name: 'Settings', icon: Settings },
    { id: 4, name: 'Preview', icon: Eye },
    { id: 5, name: 'Download', icon: Download },
  ];

  return (
    <div className={`${isMobile ? 'py-2 pb-6' : 'py-8'} overflow-x-auto relative z-10 scrollbar-hide`}>
      <div className={`flex justify-between items-center relative ${isMobile ? 'w-full max-w-md mx-auto px-6' : 'min-w-max px-8'}`}>
        {/* Connecting Line (Desktop Only) */}
        {!isMobile && (
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-10 rounded-full overflow-hidden">
             <div 
               className="h-full bg-sky-500 transition-all duration-700 ease-out"
               style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
             />
          </div>
        )}

        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isPast = currentStep > step.id;
          const Icon = step.icon;

          const isAccessible = step.id <= highestAccessibleStep;

          return (
            <div 
              key={step.id} 
              className={`flex flex-col items-center gap-3 relative ${isAccessible ? 'cursor-pointer group' : 'opacity-70 cursor-not-allowed'}`}
              onClick={() => {
                if (isAccessible && onStepClick) onStepClick(step.id);
              }}
              role={isAccessible ? "button" : "presentation"}
              tabIndex={isAccessible ? 0 : -1}
              aria-label={`Go to step ${step.id}: ${step.name}`}
            >
              <div
                className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full flex items-center justify-center transition-all duration-500 shadow-sm
                  ${isActive
                    ? 'bg-sky-600 text-white shadow-sky-500/30 shadow-lg scale-110 ring-4 ring-sky-100'
                    : isPast
                      ? 'bg-sky-100 text-sky-600 group-hover:bg-sky-200'
                      : 'bg-white text-slate-400 border-2 border-slate-200 group-hover:border-sky-300 group-hover:text-sky-500'
                  }`}
              >
                <Icon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} ${isActive ? 'animate-pulse' : ''}`} />
              </div>
              <span
                className={`${isMobile ? 'text-[10px] -bottom-4' : 'text-sm -bottom-7'} font-semibold transition-colors duration-300 absolute whitespace-nowrap ${
                  isActive ? 'text-sky-600' : isPast ? 'text-slate-700' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
