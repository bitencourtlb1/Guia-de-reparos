
import React from 'react';
import { ChevronRightIcon } from './IconComponents';

interface TutorialListProps {
  tutorials: string[];
  onSelect: (topic: string) => void;
}

const TutorialList: React.FC<TutorialListProps> = ({ tutorials, onSelect }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-slate-700 border-b pb-3">Escolha um Guia de Reparo</h2>
      <ul className="space-y-2">
        {tutorials.map((topic, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(topic)}
              className="w-full text-left p-4 rounded-lg flex justify-between items-center bg-slate-50 hover:bg-blue-100 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="font-medium text-slate-800">{topic}</span>
              <ChevronRightIcon className="h-5 w-5 text-slate-400" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TutorialList;
