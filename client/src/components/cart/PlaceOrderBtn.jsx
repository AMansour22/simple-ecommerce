import PropTypes from 'prop-types';
import { Spinner } from '../';
import usePlaceOrderBtn from '../../hooks/usePlaceOrderBtn';

function PlaceOrderBtn({ className }) {
  const { handlePlaceOrder, loading } = usePlaceOrderBtn();

  return (
    <button
      className={`cta ${className}`}
      onClick={handlePlaceOrder}
      disabled={loading}
      data-testid="place-order-btn"
    >
      {loading ? <Spinner /> : 'Place Order'}
    </button>
  );
}

PlaceOrderBtn.propTypes = {
  className: PropTypes.string,
};

export default PlaceOrderBtn;
