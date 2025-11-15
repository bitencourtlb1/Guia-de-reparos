
import React, { useState, useEffect, useCallback } from 'react';
import { getTutorialList, getTutorialSteps } from './services/geminiService';
import type { TutorialStep } from './types';
import Header from './components/Header';
import TutorialList from './components/TutorialList';
import TutorialViewer from './components/TutorialViewer';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [tutorials, setTutorials] = useState<string[]>([]);
  const [selectedTutorial, setSelectedTutorial] = useState<string | null>(null);
  const [tutorialContent, setTutorialContent] = useState<TutorialStep[] | null>(null);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [loadingContent, setLoadingContent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTutorials = useCallback(async () => {
    try {
      setError(null);
      setLoadingList(true);
      const tutorialList = await getTutorialList();
      setTutorials(tutorialList);
    } catch (err) {
      setError('Falha ao carregar os tutoriais. Por favor, tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    fetchTutorials();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectTutorial = useCallback(async (topic: string) => {
    setSelectedTutorial(topic);
    setLoadingContent(true);
    setTutorialContent(null);
    setError(null);
    try {
      const steps = await getTutorialSteps(topic);
      setTutorialContent(steps);
    } catch (err) {
      setError('Falha ao carregar o conteúdo do tutorial. Por favor, volte e tente novamente.');
      console.error(err);
    } finally {
      setLoadingContent(false);
    }
  }, []);

  const handleGoBack = () => {
    setSelectedTutorial(null);
    setTutorialContent(null);
    setError(null);
  };

  const renderContent = () => {
    if (loadingList) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <LoadingSpinner />
          <p className="mt-4 text-slate-600">Carregando guias de reparo...</p>
        </div>
      );
    }

    if (error && !loadingContent) {
        return (
            <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-semibold">Ocorreu um Erro</p>
                <p className="text-red-600 mt-2">{error}</p>
                 <button
                    onClick={selectedTutorial ? handleGoBack : fetchTutorials}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                   {selectedTutorial ? 'Voltar' : 'Tentar Novamente'}
                </button>
            </div>
        );
    }
    
    if (selectedTutorial) {
      return (
        <TutorialViewer
          topic={selectedTutorial}
          steps={tutorialContent}
          isLoading={loadingContent}
          onBack={handleGoBack}
        />
      );
    }

    return <TutorialList tutorials={tutorials} onSelect={handleSelectTutorial} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        {renderContent()}
      </main>
      <footer className="text-center py-6 text-sm text-slate-500">
        <p>Desenvolvido com IA. Sempre consulte um profissional para reparos complexos.</p>
      </footer>
    </div>
  );
};

export default App;
