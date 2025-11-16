import React, { useState } from 'react';
import { WrenchScrewdriverIcon } from './IconComponents';

interface ApiKeyPromptProps {
  onSubmit: (apiKey: string) => void;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 text-center animate-fade-in-up">
          <WrenchScrewdriverIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">
            Bem-vindo aos Guias de Reparo DIY
          </h1>
          <p className="text-slate-600 mb-6">
            Para começar, insira sua chave de API do Google Gemini. Sua chave é armazenada com segurança em seu navegador apenas para esta sessão.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Cole sua chave de API aqui"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-label="Chave de API do Google Gemini"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
                disabled={!apiKey.trim()}
              >
                Salvar e Continuar
              </button>
            </div>
          </form>
          <p className="text-xs text-slate-500 mt-4">
            Não tem uma chave?{' '}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Obtenha uma aqui.
            </a>
          </p>
        </div>
         <footer className="text-center py-6 text-sm text-slate-500">
            <p>Desenvolvido com IA. Sempre consulte um profissional para reparos complexos.</p>
        </footer>
      </div>
    </div>
  );
};

export default ApiKeyPrompt;
