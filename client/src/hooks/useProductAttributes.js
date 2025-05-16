import { useState, useMemo } from 'react';
import { useCart } from '../contexts/CartContext';

const useProductAttributes = ({
  product,
  itemSelectedAttributes = [],
  isReadOnly = false,
  isModalView = false,
}) => {
  const { addToCart, updateCartItemAttribute } = useCart();
  const [selectedAttributes, setSelectedAttributes] = useState(itemSelectedAttributes);

  // Calculate total price once per render
  const totalPrice = useMemo(() => {
    if (!product.prices?.length) return null;
    const { symbol } = product.prices[0].currency;
    const amount = parseFloat(product.prices[0].amount) * (product.quantity ?? 1);
    return `${symbol} ${amount.toFixed(2)}`;
  }, [product.prices, product.quantity]);

  // Update selected attributes on click
  const handleAttributeClick = (attribute) => {
    if (isReadOnly) return;

    const newAttributes = [...selectedAttributes];
    const index = newAttributes.findIndex(
      (attr) => attr.attributeId === attribute.attribute_id
    );
    const updatedAttr = {
      id: attribute.id,
      attributeId: attribute.attribute_id,
      value: attribute.value,
    };

    if (index !== -1) newAttributes[index] = updatedAttr;
    else newAttributes.push(updatedAttr);

    setSelectedAttributes(newAttributes);
    if (isModalView)
      updateCartItemAttribute(product, selectedAttributes, newAttributes);
  };

  const isAttributeValueSelected = (attribute) =>
    selectedAttributes.some(
      (attr) =>
        attr.attributeId === attribute.attribute_id &&
        attr.value === attribute.value
    );

  const isAddToCartDisabled = product.attributes.length !== selectedAttributes.length;
  const productStatus = !product.inStock ? 'Out of Stock' : '';

  // Generate test ID for attributes
  const getAttributeTestId = (attributeSet, attribute, isSelected = false) => {
    const prefix = isModalView ? 'cart-item' : 'product';
    const name = attributeSet.name.replace(/\s+/g, '-');
    const value =
      attributeSet.name.toLowerCase() === 'color' &&
      attributeSet.type?.toLowerCase() === 'swatch'
        ? isModalView
          ? attribute.displayValue
          : attribute.value
        : attribute.displayValue;
    return `${prefix}-attribute-${name}-${value
      .toString()
      .replace(/\s+/g, '-')}${isSelected && isModalView ? '-selected' : ''}`;
  };

  return {
    selectedAttributes,
    totalPrice,
    handleAttributeClick,
    isAttributeValueSelected,
    isAddToCartDisabled,
    productStatus,
    getAttributeTestId,
    addToCart,
  };
};

export default useProductAttributes;