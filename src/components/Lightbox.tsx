import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}) => {
  const handlePrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  const handleNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal-900/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in select-none">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-ivory/80 hover:text-white p-2 transition-colors z-50 focus:outline-none"
        aria-label="Close image viewer"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Image Counter */}
      <div className="absolute top-7 left-8 text-xs tracking-widest uppercase text-ivory/60 font-light">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-ivory/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-40 focus:outline-none"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Main image */}
      <div className="max-w-6xl max-h-[85vh] flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`Gallery item ${currentIndex + 1}`}
          className="max-h-[82vh] max-w-full object-contain rounded-sm shadow-2xl transition-all duration-300"
        />
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-ivory/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-40 focus:outline-none"
        aria-label="Next image"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
};
