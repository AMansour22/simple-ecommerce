import PropTypes from 'prop-types';
import { Error } from '../components';
import { withRouter } from '../utils/withRouter';

// Define the ErrorScreen component
const ErrorScreen = ({ error }) => {
  // Render Error component with status code from router error
  return <Error statusCode={error?.status} />;
};

ErrorScreen.propTypes = {
  error: PropTypes.object,
};

// Export the component wrapped with the HOC
const WrappedErrorScreen = withRouter(ErrorScreen);
export default WrappedErrorScreen;