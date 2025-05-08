import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { useDataContext } from '../DataContext';

const ProductAttributes = ({
  product,
  className = '',
  isModalView = false,
  itemSelectedAttributes = [],
  isReadOnly = false,
}) => {
  const { addToCart, updateCartItemAttribute } = useDataContext();
  const [selectedAttributes, setSelectedAttributes] = useState(
    itemSelectedAttributes
  );

  // Calculate total price once per render
  const totalPrice = useMemo(() => {
    if (!product.prices?.length) return null;
    const { symbol } = product.prices[0].currency;
    const amount =
      parseFloat(product.prices[0].amount) * (product.quantity ?? 1);
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

  const isAddToCartDisabled =
    product.attributes.length !== selectedAttributes.length;
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

  return (
    <div
      className={`${className} ${!product.inStock ? 'opacity-70' : ''}`}
      aria-live="polite"
    >
      <h2
        className={isModalView ? 'capitalize font-light text-lg' : 'heading-h1'}
      >
        {product.name}
        {productStatus && (
          <span className="text-red-500 ml-2 text-sm">{productStatus}</span>
        )}
      </h2>
      {isModalView && <div className="my-2 font-bold">{totalPrice}</div>}
      {product.attributes?.map((attributeSet) => (
        <div
          key={attributeSet.id}
          className="mt-4"
          data-testid={`${
            isModalView ? 'cart-item' : 'product'
          }-attribute-${attributeSet.name.replace(/\s+/g, '-')}`}
        >
          <h3
            className={`${
              isModalView ? 'font-sm' : 'font-bold uppercase'
            } capitalize mb-1`}
          >
            {attributeSet.name}:
          </h3>
          <div
            className={`flex flex-wrap gap-y-2 ${
              isModalView ? 'gap-x-2 pl-1' : 'gap-x-3'
            }`}
            role="group"
            aria-label={`${attributeSet.name} options`}
          >
            {attributeSet.items.map((attribute) => {
              const isSelected = isAttributeValueSelected(attribute);
              const isColorSwatch =
                attributeSet.type?.toLowerCase() === 'swatch' &&
                attributeSet.name?.toLowerCase() === 'color';
              return isColorSwatch ? (
                <button
                  type="button"
                  key={attribute.id}
                  className={`
                    relative ${
                      isModalView ? 'w-5 h-5' : 'w-8 h-8'
                    }                    
                    ${
                      product.inStock && !isReadOnly
                        ? 'hover:border-primary'
                        : ''
                    }
                    ${isSelected ? 'ring-2 ring-offset-1 ring-primary' : ''}
                  `}
                  style={{ backgroundColor: attribute.value }}
                  title={attribute.displayValue}
                  onClick={() =>
                    product.inStock &&
                    !isReadOnly &&
                    handleAttributeClick(attribute)
                  }
                  disabled={!product.inStock || isReadOnly}
                  data-testid={getAttributeTestId(
                    attributeSet,
                    attribute,
                    isSelected
                  )}
                  aria-pressed={isSelected}
                  aria-label={`Color: ${attribute.displayValue}`}
                >
                  <div className="absolute inset-0 border border-gray-300" />
                </button>
              ) : (
                <button
                  type="button"
                  key={attribute.id}
                  className={`
                    ${
                      isModalView
                        ? 'min-w-6 min-h-6 text-sm'
                        : 'min-w-20 min-h-10'
                    }
                    ${isSelected ? 'bg-text text-white' : 'bg-white'}
                    px-1 flex items-center justify-center transition-colors border
                    ${
                      product.inStock && !isReadOnly
                        ? 'hover:bg-gray-800 hover:text-white'
                        : ''
                    }
                    border-gray-800
                    ${isSelected ? 'font-medium' : ''}
                  `}
                  disabled={!product.inStock || isReadOnly}
                  onClick={() =>
                    product.inStock &&
                    !isReadOnly &&
                    handleAttributeClick(attribute)
                  }
                  data-testid={getAttributeTestId(
                    attributeSet,
                    attribute,
                    isSelected
                  )}
                  aria-pressed={isSelected}
                >
                  {attribute.displayValue}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {!isModalView && (
        <>
          <h3 className="mt-4 mb-1 font-bold uppercase font-roboto">Price:</h3>
          <div className="heading-h2">{totalPrice}</div>
        </>
      )}
      {!isModalView && product.inStock && (
        <button
          type="button"
          className={`w-full mb-8 btn-cta ${
            isAddToCartDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => addToCart(product, true, selectedAttributes)}
          disabled={isAddToCartDisabled}
          data-testid="add-to-cart"
          aria-disabled={isAddToCartDisabled}
        >
          {isAddToCartDisabled ? 'Please Select All Options' : 'Add to Cart'}
        </button>
      )}
      {!isModalView && (
        <div className="text-sm font-roboto" data-testid="product-description">
          {parse(DOMPurify.sanitize(product.description))}
        </div>
      )}
    </div>
  );
};

ProductAttributes.propTypes = {
  product: PropTypes.object.isRequired,
  className: PropTypes.string,
  isModalView: PropTypes.bool,
  itemSelectedAttributes: PropTypes.array,
  isReadOnly: PropTypes.bool,
};

export default ProductAttributes;
