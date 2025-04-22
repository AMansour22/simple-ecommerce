import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { PLACE_ORDER } from '../../graphql/mutations';
import { Spinner } from '../';
import { useDataContext } from '../../DataContext';

function PlaceOrderBtn({ className }) {
  const [placeOrder, { loading }] = useMutation(PLACE_ORDER);
  const { emptyCart } = useDataContext();

  // Handle order placement with cart validation and error handling
  const handlePlaceOrder = async () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (!cartItems.length) {
      toast.error('Cart is empty! 🛒');
      return;
    }

    // Prepare order input from cart items
    const orderInput = {
      items: cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        attributeValues: item.selectedAttributes.map(attr => ({
          id: attr.id,
          value: attr.value,
        })),
      })),
    };

    try {
      const { data } = await placeOrder({ variables: { orderInput } });
      emptyCart();
      toast.success(data.placeOrder);
    } catch (err) {
      // Handle GraphQL-specific errors
      if (err.graphQLErrors?.length > 0) {
        toast.error(`Error placing order: ${err.graphQLErrors[0].message}`);
        return;
      }
      // Handle network-specific errors
      if (err.networkError?.result?.error) {
        toast.error(`Error placing order: ${err.networkError.result.error}`);
        return;
      }
      toast.error('Error placing order. Please try again later.');
    }
  };

  return (
    <button
      type="button"
      className={`btn-cta flex items-center justify-center disabled:opacity-70${className ? ' ' + className : ''}`}
      onClick={handlePlaceOrder}
      disabled={loading}
      data-testid="place-order-btn"
    >
      {loading && <Spinner className="w-4 h-4 mr-2" />}
      Place Order
    </button>
  );
}

PlaceOrderBtn.propTypes = {
  className: PropTypes.string,
};

export default PlaceOrderBtn;