import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "../components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TopNews = () => {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const params = new URLSearchParams({
          apiKey: 'e0f3eada-4cf1-44d6-8fee-b290ec6ab02d',
          sortBy: 'count',
          from: "2025-01-01",
          to: "2025-01-03",
          category: ["General"],
          size: '10',
        });
        const response = await fetch(`https://api.goperigon.com/v1/stories/all?${params}`);
        const data = await response.json();
        setStories(data.results || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

   const nextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="bg-pink-50 rounded-xl p-6 relative h-full">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Stories</h2>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
        </div>
      ) : stories.length > 0 ? (
        <div className="relative h-[400px] flex items-center justify-center">
          {stories.map((story, index) => {
            const isActive = index === currentIndex;
            const offset = index - currentIndex;
            
            return (
              <div
                key={story.id}
                className={`absolute w-full max-w-xl transition-all duration-500 ease-out bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl
                  ${isActive ? 'z-10 scale-100' : 'z-0'}`}
                style={{
                  transform: `translateY(${offset * 12}px) rotate(${offset * 1}deg)`,
                  opacity: Math.max(1 - Math.abs(offset) * 0.15, 0.4),
                  filter: `blur(${Math.abs(offset) * 0.5}px)`,
                }}
                onClick={() => setIsModalOpen(true)}
              >
                <h3 className="font-semibold text-xl mb-3">{story.name}</h3>
                <p className="text-sm text-gray-500 mb-3">
                  {new Date(story.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 line-clamp-3">{story.summary}</p>
              </div>
            );
          })}

          <div className="absolute -bottom-16 left-0 right-0 flex justify-between items-center">
            <button
              onClick={prevStory}
              className="bg-white rounded-full p-2 hover:bg-gray-50 shadow-md disabled:opacity-50"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="text-sm text-gray-600">
              {currentIndex + 1} of {stories.length}
            </span>
            <button
              onClick={nextStory}
              className="bg-white rounded-full p-2 hover:bg-gray-50 shadow-md disabled:opacity-50"
              disabled={currentIndex === stories.length - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p>No stories found</p>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-6">
          <h2 className="text-xl font-bold mb-4">{stories[currentIndex]?.name}</h2>
          <p className="text-gray-500 mb-4">
            {new Date(stories[currentIndex]?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-600">{stories[currentIndex]?.summary}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TopNews;