import { useCart } from '../contexts/CartContext';

const useCartModalItem = ({ item = {} }) => {
  const { updateCartItemQuantity } = useCart();
  const productImage = item.product.gallery?.length
    ? item.product.gallery[0]
    : '';
  const attributeName = item.product?.name?.toLowerCase().replace(/\s+/g, '-'); // Kebab case product name

  return {
    updateCartItemQuantity,
    productImage,
    attributeName,
    item,
  };
};

export default useCartModalItem;
