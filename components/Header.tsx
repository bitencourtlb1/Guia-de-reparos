import React from 'react';
import { WrenchScrewdriverIcon } from './IconComponents';

interface HeaderProps {
  onClearApiKey: () => void;
}


const Header: React.FC<HeaderProps> = ({ onClearApiKey }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <WrenchScrewdriverIcon className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Guias de Reparo DIY
          </h1>
        </div>
        <button
            onClick={onClearApiKey}
            className="text-sm text-slate-500 hover:text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            title="Mudar Chave de API"
        >
            Mudar Chave
        </button>
      </div>
    </header>
  );
};

export default Header;
