import { useState, useEffect, useRef } from 'react';

const useProductImageCarousel = ({ images = [] }) => {
  // State for current image index and main image height
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainImageHeight, setMainImageHeight] = useState(null);

  // Refs to track thumbnail elements
  const thumbnailRefs = useRef({});

  // Navigate to next image
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Navigate to previous image
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Set main image height on load, capped at 60% of viewport
  const handleMainImageLoad = (e) => {
    const { clientHeight } = e.target;
    const maxHeight = window.innerHeight * 0.6;
    setMainImageHeight(Math.min(clientHeight, maxHeight));
  };

  // Scroll selected thumbnail into view when currentIndex changes
  useEffect(() => {
    const thumbnailRef = thumbnailRefs.current[currentIndex];
    thumbnailRef?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [currentIndex]);

  return {
    currentIndex,
    setCurrentIndex,
    mainImageHeight,
    handleMainImageLoad,
    handleNext,
    handlePrev,
    thumbnailRefs,
  };
};

export default useProductImageCarousel;
