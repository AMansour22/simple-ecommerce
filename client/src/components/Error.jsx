import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import errorImg from '../assets/error.png';

const Error = ({ statusCode = 500, message }) => {
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

  return (
    <main className="flex flex-col items-center justify-center mt-6 max:h-screen">
      {/* Error image display */}
      <img src={errorImg} alt="error" className="w-96 mb-6" />
      
      {/* Display custom message if provided, otherwise use computed default */}
      <h1 className="heading-h1">{message || defaultMessage}</h1>
      
      {/* Navigation link back to home */}
      <Link to="/" className="btn-cta">
        Back home
      </Link>
    </main>
  );
};

Error.propTypes = {
  message: PropTypes.string,
  statusCode: PropTypes.number,
};

export default Error;