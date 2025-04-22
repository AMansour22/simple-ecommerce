import { useEffect } from 'react';
import { Spinner } from './';

const Loading = () => {
  // Handle body overflow when component mounts/unmounts
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    
    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div
      role="status"
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-hidden bg-white"
    >
      {/* Loading spinner component */}
      <Spinner />
      {/* Screen reader only text for accessibility */}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;