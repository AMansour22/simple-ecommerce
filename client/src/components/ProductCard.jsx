import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Cart } from './';
import searchingImg from '../assets/searching.png';
import useProductCard from '../hooks/useProductCard';

function ProductCard({ product = {} }) {
  const { addToCart, product: productData } = useProductCard({ product });

  return (
    <article className="h-full">
      <div className="p-4 overflow-hidden transition-shadow duration-500 hover:shadow-xl group h-full flex flex-col">
        <div className="relative mb-6 flex-grow">
          <Link
            to={`/products/${productData.id}`}
            data-testid={`product-${productData.name
              .replace(/\s+/g, '-')
              .toLowerCase()}`}
            className="block h-64"
          >
            <div className="relative h-full">
              <img
                src={productData.gallery[0] ?? searchingImg}
                alt={productData.name}
                loading="lazy"
                className="object-contain w-full h-full"
              />
              {!productData.inStock && (
                <div className="absolute inset-0 flex items-center justify-center px-2 py-1 text-2xl uppercase bg-white bg-opacity-70 text-muted">
                  Out of Stock
                </div>
              )}
            </div>
          </Link>
          {productData.inStock && (
            <button
              onClick={() => addToCart(productData)}
              className="absolute bottom-0 p-2 transition-opacity duration-300 transform translate-y-1/2 rounded-full opacity-0 cta group-hover:opacity-100 right-4"
            >
              <Cart color="white" className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="mt-auto">
          <h3 className="text-lg font-light capitalize truncate">
            {productData.name}
          </h3>
          <div
            className={`${!productData.inStock ? 'text-muted ' : ''}text-lg`}
          >
            {productData.prices[0]?.currency?.symbol}{' '}
            {productData.prices[0]?.amount}
          </div>
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired,
    gallery: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    prices: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.string.isRequired,
        currency: PropTypes.shape({
          label: PropTypes.string.isRequired,
          symbol: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    category: PropTypes.string.isRequired,
    attributes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            displayValue: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ProductCard;
