import { useCart } from '../contexts/CartContext';

const useProductCard = ({ product = {} }) => {
  const { addToCart } = useCart();

  return {
    addToCart,
    product,
  };
};

export default useProductCard;
