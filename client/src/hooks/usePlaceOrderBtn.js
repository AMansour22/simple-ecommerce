import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { PLACE_ORDER } from '../graphql/mutations'
import { useCart } from '../contexts/CartContext';

const usePlaceOrderBtn = () => {
  const [placeOrder, { loading }] = useMutation(PLACE_ORDER);
  const { emptyCart } = useCart();

  // Handle order placement with cart validation and error handling
  const handlePlaceOrder = async () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (!cartItems.length) {
      toast.error('Cart is empty! 🛒');
      return;
    }

    // Prepare order input from cart items
    const orderInput = {
      items: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        attributeValues: item.selectedAttributes.map((attr) => ({
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

  return {
    handlePlaceOrder,
    loading,
  };
};

export default usePlaceOrderBtn;