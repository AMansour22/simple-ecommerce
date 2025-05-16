import { useEffect } from 'react';

const useLoading = () => {
  // Handle body overflow when component mounts/unmounts
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    
    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []); // Empty dependency array means this runs once on mount

  return {};
};

export default useLoading;
