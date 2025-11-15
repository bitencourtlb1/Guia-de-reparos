
import React, { useState, useEffect } from 'react';
import { generateImage } from '../services/geminiService';
import type { TutorialStep } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { PhotoIcon } from './IconComponents';

interface StepCardProps {
  step: TutorialStep;
}

const ImagePlaceholder: React.FC = () => (
    <div className="w-full aspect-[4/3] bg-slate-200 rounded-lg flex flex-col items-center justify-center">
        <PhotoIcon className="h-12 w-12 text-slate-400 mb-2" />
        <p className="text-sm text-slate-500">Gerando imagem...</p>
        <div className="mt-4">
            <LoadingSpinner/>
        </div>
    </div>
);

const StepCard: React.FC<StepCardProps> = ({ step }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchImage = async () => {
      if (!step.imagePrompt) return;
      
      setIsLoading(true);
      setError(false);
      try {
        const url = await generateImage(step.imagePrompt);
        setImageUrl(url);
      } catch (err) {
        console.error(`Falha ao gerar imagem para o passo ${step.stepNumber}`, err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [step.imagePrompt, step.stepNumber]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg animate-fade-in-up flex flex-col md:flex-row gap-6">
      <div className="flex-shrink-0 md:w-1/3">
        <div className="flex items-center mb-2">
            <div className="flex-shrink-0 bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">
                {step.stepNumber}
            </div>
            <div className="md:hidden ml-4 text-lg font-semibold text-slate-700">Passo {step.stepNumber}</div>
        </div>
        <p className="mt-2 md:mt-0 text-slate-600 md:pl-0">{step.instruction}</p>
      </div>

      <div className="flex-grow md:w-2/3">
        {isLoading && <ImagePlaceholder />}
        {error && !isLoading && (
            <div className="w-full aspect-[4/3] bg-red-50 border border-red-200 rounded-lg flex flex-col items-center justify-center p-4 text-center">
                <p className="text-red-700 font-semibold">Falha na Imagem</p>
                <p className="text-red-600 text-sm mt-1">Não foi possível gerar a ilustração para este passo.</p>
            </div>
        )}
        {imageUrl && !isLoading && (
          <img
            src={imageUrl}
            alt={`Ilustração para o passo ${step.stepNumber}: ${step.instruction}`}
            className="w-full aspect-[4/3] object-cover rounded-lg bg-slate-100"
          />
        )}
      </div>
    </div>
  );
};

export default StepCard;
