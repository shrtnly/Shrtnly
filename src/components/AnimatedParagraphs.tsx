import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SlideUpFadeIn from './SlideUpFadeIn';

const AnimatedParagraphs: React.FC = () => {
  const paragraphs = [
    "Create permanent short links. No expiration dates. Ever.",
    "Start shortening URLs instantly. No signup required.",
    "Track every click with detailed analytics reports.",
    "Monitor user engagement. See what works best.",
    "Boost your traffic with branded short links.",
    "Trusted by businesses worldwide. Fast and reliable."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === paragraphs.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [paragraphs.length]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <AnimatePresence mode="wait">
        <SlideUpFadeIn key={currentIndex}>
          <div className="flex justify-center">
            <span className="flex-shrink-0 mt-3 h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] mr-2"></span>
            <p className="text-gray-700 text-lg font-light">
              {paragraphs[currentIndex]}
            </p>
          </div>
        </SlideUpFadeIn>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedParagraphs;
