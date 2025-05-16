import { useMemo } from 'react';

const useError = ({ statusCode = 500, message }) => {
  // Use useMemo to compute default message only when statusCode changes
  const defaultMessage = useMemo(
    () =>
      statusCode === 404
        ? 'Page not found'
        : statusCode === 400
        ? 'Bad request'
        : 'Something went wrong',
    [statusCode]
  );

  return {
    defaultMessage,
    message,
    statusCode,
  };
};

export default useError;