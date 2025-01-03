import React, { useState } from 'react';
import { Dialog, DialogContent } from "../components/ui/dialog";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import chicagoTribune from './images/Chicago_Tribune_2025-01-03.jpg';
import latimes from './images/Los_Angeles_Times_2025-01-03.jpg';
import bostonGlobe from './images/The_Boston_Globe_2025-01-03.jpg';
import nytimes from './images/The_New_York_Times_2025-01-03.jpg';
import wsj from './images/The_Wall_Street_Journal_2025-01-03.jpg';
import washPost from './images/The_Washington_Post_2025-01-03.jpg';

const NewspaperStack = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newspapers = [
    { id: 1, image: wsj },
    { id: 2, image: nytimes },
    { id: 3, image: latimes },
    { id: 4, image: bostonGlobe },
    { id: 5, image: chicagoTribune },
    { id: 6, image: washPost },
  ];

  const nextPaper = () => {
    if (activeIndex < newspapers.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const prevPaper = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextPaper();
    if (e.key === 'ArrowLeft') prevPaper();
  };

  return (
    <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Today</h2>
        {isCompleted && <Check className="h-6 w-6 text-green-500" />}
      </div>

      <div 
        className="relative h-[800px] cursor-pointer hover:scale-105 transition-transform"
        onClick={() => {
          setIsModalOpen(true);
          setIsCompleted(true);
        }}
      >
        <img
          src={newspapers[activeIndex].image}
          alt="Newspaper cover"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 rounded-lg transition-colors" />
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent 
          className="max-w-4xl h-[90vh] p-6" 
          onKeyDown={handleKeyDown}
        >
          <div className="relative h-full flex items-center justify-center">
            <button
              onClick={prevPaper}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <img
              src={newspapers[activeIndex].image}
              alt="Newspaper cover"
              className="max-h-full w-auto object-contain"
            />
            
            <button
              onClick={nextPaper}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewspaperStack;