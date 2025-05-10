import PropTypes from 'prop-types';
import ProductAttributes from '../ProductAttributes';
import ActionBtn from './ActionBtn';
import { useCart } from '../../contexts/CartContext';

function CartModalItem({ item = {}, ...props }) {
  const { updateCartItemQuantity } = useCart();
  const productImage = item.product.gallery?.length
    ? item.product.gallery[0]
    : '';
  const attributeName = item.product?.name?.toLowerCase().replace(/\s+/g, '-'); // Kebab case product name

  return (
    <div className="flex justify-between" {...props}>
      {' '}
      {/* Spread props to include data-testid */}
      {/* Display product attributes with read-only mode enabled */}
      <ProductAttributes
        className="w-3/6"
        isModalView={true}
        product={item.product}
        itemSelectedAttributes={item.selectedAttributes}
        isReadOnly={true} // Make attributes read-only in cart
      />
      {/* Quantity controls */}
      <div className="flex flex-col items-center justify-between w-1/6">
        <ActionBtn
          text="+"
          onClick={() => updateCartItemQuantity(item.id, 1)}
          data={`cart-item-amount-increase-${attributeName}`}
        />
        <span data-testid={`cart-item-amount-${attributeName}`}>
          {item.quantity}
        </span>
        <ActionBtn
          text="-"
          onClick={() => updateCartItemQuantity(item.id, -1)}
          data={`cart-item-amount-decrease-${attributeName}`}
        />
      </div>
      {/* Product image */}
      <div className="w-2/6">
        <img
          src={productImage}
          alt={item.product.name}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}

CartModalItem.propTypes = {
  item: PropTypes.object,
};

export default CartModalItem;
