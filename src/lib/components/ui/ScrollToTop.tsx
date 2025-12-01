import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';

export const ScrollToTop: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 z-50 w-11 h-11 sm:w-12 sm:h-12 bg-white text-primary-600 rounded-xl shadow-md hover:shadow-lg border border-primary-200 hover:border-secondary-300 hover:text-secondary-600 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center group"
      aria-label="Scroll to top"
    >
      <span className="rotate-[-90deg] inline-block group-hover:-translate-y-0.5 transition-transform">
        <Icon name="ChevronRight" size={20} color="currentColor" />
      </span>
    </button>
  );
};

