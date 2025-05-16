import { Spinner } from './';
import useLoading from '../hooks/useLoading';

const Loading = () => {
  useLoading();

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