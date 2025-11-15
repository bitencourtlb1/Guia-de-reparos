
import React from 'react';
import type { TutorialStep } from '../types';
import StepCard from './StepCard';
import LoadingSpinner from './LoadingSpinner';
import { ArrowLeftIcon } from './IconComponents';

interface TutorialViewerProps {
  topic: string;
  steps: TutorialStep[] | null;
  isLoading: boolean;
  onBack: () => void;
}

const TutorialViewer: React.FC<TutorialViewerProps> = ({ topic, steps, isLoading, onBack }) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors"
          aria-label="Voltar para os tutoriais"
        >
          <ArrowLeftIcon className="h-5 w-5 text-slate-700" />
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">{topic}</h2>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-md p-6">
          <LoadingSpinner />
          <p className="mt-4 text-slate-600">Carregando instruções...</p>
        </div>
      )}

      {steps && (
        <div className="space-y-6">
          {steps.sort((a, b) => a.stepNumber - b.stepNumber).map((step) => (
            <StepCard key={step.stepNumber} step={step} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorialViewer;
