import React from 'react';
import NewspaperStack from './NewspaperStack.tsx';
import TopNews from './TopNews.tsx';


const CheatSheetGrid = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
        {/* Newspapers Section - Taller */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 row-span-2">
          <NewspaperStack />
        </div>

        {/* Other sections - Regular height */}
          <TopNews />

        <div className="bg-purple-50 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Stocks</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Songs</h2>
          <div className="space-y-3">
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheatSheetGrid;