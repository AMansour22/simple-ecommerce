import PropTypes from 'prop-types';

const ActionBtn = ({ text, onClick, data = '', type = 'button' }) => {
  // Render a styled button with dynamic props
  return (
    <button
      type={type}
      className="flex items-center justify-center w-6 h-6 transition-colors border border-text hover:bg-text hover:text-white"
      onClick={onClick}
      data-testid={data}
    >
      {text}
    </button>
  );
};

// PropTypes for type checking
ActionBtn.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  data: PropTypes.string,
};

export default ActionBtn;