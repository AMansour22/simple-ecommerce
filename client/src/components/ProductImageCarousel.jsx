import PropTypes from 'prop-types';
import { Arrow } from './';
import useProductImageCarousel from '../hooks/useProductImageCarousel';

const ProductImageCarousel = ({ images = [], alt = 'Product' }) => {
  const {
    currentIndex,
    setCurrentIndex,
    mainImageHeight,
    handleMainImageLoad,
    handleNext,
    handlePrev,
    thumbnailRefs,
  } = useProductImageCarousel({ images });

  return (
    <section className="mb-6 md:w-2/3 md:mb-0" data-testid="product-gallery">
      {!!images.length && (
        <div className="relative flex flex-col">
          <div className="relative flex">
            {/* Thumbnail gallery */}
            <div
              className="flex flex-col gap-2 items-center"
              style={{ maxHeight: mainImageHeight }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 flex items-center justify-center ${
                    index === currentIndex ? 'opacity-50' : 'opacity-100'
                  } cursor-pointer`}
                  onClick={() => setCurrentIndex(index)}
                  style={{ aspectRatio: '1 / 1' }}
                >
                  <img
                    ref={(el) => {
                      if (thumbnailRefs.current) {
                        thumbnailRefs.current[index] = el;
                      }
                    }}
                    src={image}
                    alt={alt}
                    className="object-contain w-full h-full"
                  />
                </div>
              ))}
            </div>

            {/* Main image display */}
            <div className="relative w-4/5 max-w-full mx-auto">
              <img
                src={images[currentIndex]}
                alt={alt}
                className="object-contain w-full h-auto max-w-full"
                onLoad={handleMainImageLoad}
                style={{
                  maxHeight: mainImageHeight ? `${mainImageHeight}px` : '100vh',
                  width: '100%',
                  height: 'auto',
                }}
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
