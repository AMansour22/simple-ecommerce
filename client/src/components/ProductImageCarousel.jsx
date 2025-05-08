import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Arrow } from './';

const ProductImageCarousel = ({ images = [], alt = 'Product' }) => {
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

  return (
    <section className="mb-6 md:w-2/3 md:mb-0" data-testid="product-gallery">
      {!!images.length && (
        <div className="relative flex flex-col">
          <div className="relative flex">
            {/* Thumbnail gallery */}
            <div
              className="w-1/5 max-h-screen overflow-y-auto flex flex-col gap-2"
              style={{ maxHeight: mainImageHeight }}
            >
              {images.map((image, index) => (
                <img
                  key={index}
                  ref={(el) => (thumbnailRefs.current[index] = el)}
                  src={image}
                  alt={alt}
                  className={`w-full ${
                    index === currentIndex ? 'opacity-50' : 'opacity-100'
                  } cursor-pointer`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            {/* Main image display */}
            <div className="relative w-4/5">
              <img
                src={images[currentIndex]}
                alt={alt}
                className="object-contain w-full h-auto"
                onLoad={handleMainImageLoad}
                style={{ maxHeight: mainImageHeight || '100vh' }}
              />

              {/* Previous button */}
              <button
                className="absolute rounded-sm p-2 hover:bg-gray-600 text-white transition-colors duration-300 transform -translate-y-1/2 bg-text top-1/2 left-4 hover:text-white"
                onClick={handlePrev}
              >
                <Arrow direction="left" />
              </button>

              {/* Next button */}
              <button
                className="absolute rounded-sm p-2 hover:bg-gray-600 text-white transition-colors duration-300 transform -translate-y-1/2 bg-text top-1/2 right-4 hover:text-white"
                onClick={handleNext}
              >
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

ProductImageCarousel.propTypes = {
  images: PropTypes.array,
  alt: PropTypes.string,
};

export default ProductImageCarousel;
