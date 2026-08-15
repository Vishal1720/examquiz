import { Upload, List, Settings, Eye, Download } from 'lucide-react';

export const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Add Questions', icon: Upload },
    { id: 2, name: 'Questions', icon: List },
    { id: 3, name: 'Settings', icon: Settings },
    { id: 4, name: 'Preview', icon: Eye },
    { id: 5, name: 'Download', icon: Download },
  ];

  return (
    <div className="py-8 overflow-x-auto relative z-10">
      <div className="min-w-max flex justify-between items-center relative px-2">
        {/* Connecting Line */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-10 rounded-full overflow-hidden">
           <div 
             className="h-full bg-sky-500 transition-all duration-700 ease-out"
             style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
           />
        </div>

        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isPast = currentStep > step.id;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center gap-3 relative">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm
                  ${isActive
                    ? 'bg-sky-600 text-white shadow-sky-500/30 shadow-lg scale-110 ring-4 ring-sky-100'
                    : isPast
                      ? 'bg-sky-100 text-sky-600'
                      : 'bg-white text-slate-400 border-2 border-slate-200'
                  }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
              </div>
              <span
                className={`text-sm font-semibold transition-colors duration-300 absolute -bottom-7 whitespace-nowrap ${
                  isActive ? 'text-sky-600' : isPast ? 'text-slate-700' : 'text-slate-400'
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
