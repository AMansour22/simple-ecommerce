import PropTypes from 'prop-types';
import { Spinner } from '../';
import usePlaceOrderBtn from '../../hooks/usePlaceOrderBtn';

function PlaceOrderBtn({ className }) {
  const { handlePlaceOrder, loading } = usePlaceOrderBtn();

  return (
    <button
      className={`cta ${className} flex items-center justify-center`}
      onClick={handlePlaceOrder}
      disabled={loading}
      data-testid="place-order-btn"
    >
      {loading ? <Spinner className="w-5 h-5" /> : 'Place Order'}
    </button>
  );
}

PlaceOrderBtn.propTypes = {
  className: PropTypes.string,
};

export default PlaceOrderBtn;
