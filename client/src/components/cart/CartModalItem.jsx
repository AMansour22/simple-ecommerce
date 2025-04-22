import PropTypes from 'prop-types';
import ProductAttributes from '../ProductAttributes';
import ActionBtn from './ActionBtn';
import { useDataContext } from '../../DataContext';

function CartModalItem({ item = {}, ...props }) {
  const { updateCartItemQuantity } = useDataContext();
  const productImage = item.product.gallery?.length ? item.product.gallery[0] : '';
  const attributeName = item.product?.name?.toLowerCase().replace(/\s+/g, '-'); // Kebab case product name

  return (
    <div className="flex justify-between" {...props}> {/* Spread props to include data-testid */}
      {/* Display product attributes */}
      <ProductAttributes
        className="w-3/6"
        isModalView={true}
        product={item.product}
        itemSelectedAttributes={item.selectedAttributes}
        attributeTestIdPrefix={`cart-item-attribute-${attributeName}`} // Pass prefix for attributes
      />

      {/* Quantity controls */}
      <div className="flex flex-col items-center justify-between w-1/6">
        <ActionBtn
          text="+"
          onClick={() => updateCartItemQuantity(item.id, 1)}
          data-testid="cart-item-amount-increase"
        />
        <span data-testid="cart-item-amount">{item.quantity}</span>
        <ActionBtn
          text="-"
          onClick={() => updateCartItemQuantity(item.id, -1)}
          data-testid="cart-item-amount-decrease"
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