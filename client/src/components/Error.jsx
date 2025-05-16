import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import errorImg from '../assets/error.png';
import useError from '../hooks/useError';

const Error = ({ statusCode = 500, message }) => {
  const { defaultMessage, message: customMessage } = useError({
    statusCode,
    message,
  });

  return (
    <main className="flex flex-col items-center justify-center mt-6 max:h-screen">
      {/* Error image display */}
      <img src={errorImg} alt="error" className="w-96 mb-6" />

      {/* Display custom message if provided, otherwise use computed default */}
      <h1 className="heading-h1">{customMessage || defaultMessage}</h1>

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
