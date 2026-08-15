import { Upload, List, Settings, Eye, Download } from 'lucide-react';

export const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Upload', icon: Upload },
    { id: 2, name: 'Questions', icon: List },
    { id: 3, name: 'Settings', icon: Settings },
    { id: 4, name: 'Preview', icon: Eye },
    { id: 5, name: 'Download', icon: Download },
  ];

  return (
    <div className="py-6 overflow-x-auto">
      <div className="min-w-max flex justify-between items-center relative px-2">
        {/* Connecting Line */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 -z-10" />

        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isPast = currentStep > step.id;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 bg-gray-50 px-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors
                  ${isActive
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : isPast
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-300 bg-white text-gray-400'
                  }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-xs font-medium ${isActive ? 'text-indigo-600' : isPast ? 'text-gray-800' : 'text-gray-400'
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
