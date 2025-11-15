
import React from 'react';
import { WrenchScrewdriverIcon } from './IconComponents';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-4">
        <div className="flex items-center space-x-3">
          <WrenchScrewdriverIcon className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Guias de Reparo DIY
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
