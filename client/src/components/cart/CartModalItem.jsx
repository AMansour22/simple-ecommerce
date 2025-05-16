import PropTypes from 'prop-types';
import ProductAttributes from '../ProductAttributes';
import ActionBtn from './ActionBtn';
import useCartModalItem from '../../hooks/useCartModalItem';

function CartModalItem({ item = {}, ...props }) {
  const {
    updateCartItemQuantity,
    productImage,
    attributeName,
    item: cartItem,
  } = useCartModalItem({ item });

  return (
    <div className="flex justify-between" {...props}>
      {' '}
      {/* Spread props to include data-testid */}
      {/* Display product attributes with read-only mode enabled */}
      <ProductAttributes
        className="w-3/6"
        isModalView={true}
        product={cartItem.product}
        itemSelectedAttributes={cartItem.selectedAttributes}
        isReadOnly={true} // Make attributes read-only in cart
      />
      {/* Quantity controls */}
      <div className="flex flex-col items-center justify-between w-1/6">
        <ActionBtn
          text="+"
          onClick={() => updateCartItemQuantity(cartItem.id, 1)}
          data={`cart-item-amount-increase-${attributeName}`}
        />
        <span data-testid={`cart-item-amount-${attributeName}`}>
          {cartItem.quantity}
        </span>
        <ActionBtn
          text="-"
          onClick={() => updateCartItemQuantity(cartItem.id, -1)}
          data={`cart-item-amount-decrease-${attributeName}`}
        />
      </div>
      {/* Product image */}
      <div className="w-2/6">
        <img
          src={productImage}
          alt={cartItem.product.name}
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
