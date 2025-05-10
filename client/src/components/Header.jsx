import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Cart, CartModal, Loading, Logo, NavigationMenu } from '.';
import { useCart } from '../contexts/CartContext';
import { useProduct } from '../contexts/ProductContext';
import { GET_PRODUCTS, GET_CATEGORIES } from '../graphql/queries';

const Header = () => {
  const { category } = useParams();
  const { cartItems, isCartOpen, setIsCartOpen } = useCart();
  const { setSelectedCategory, setProductsData, categories, setCategories } =
    useProduct();
  const [showModal, setShowModal] = useState(false);

  // Sync context's isCartOpen with local showModal in both directions
  useEffect(() => {
    setShowModal(isCartOpen);
  }, [isCartOpen]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    setIsCartOpen((prev) => !prev); // Sync context state with local state
  };

  const [fetchProducts] = useLazyQuery(GET_PRODUCTS, {
    onCompleted: (data) => setProductsData(data.products),
  });

  const handleCategoryChange = (category) => {
    fetchProducts({ variables: { category } });
    setSelectedCategory(category);
  };

  // Fetch categories only once when component mounts
  const { loading: categoriesLoading, error: categoriesError } = useQuery(
    GET_CATEGORIES,
    {
      onCompleted: (data) => {
        const categoryNames = data.categories.map((cat) => cat.name);
        setCategories(categoryNames);
        // If no category in URL, set to first category but don't update URL
        if (!category) {
          setSelectedCategory(categoryNames[0]);
          fetchProducts({ variables: { category: categoryNames[0] } });
        } else {
          setSelectedCategory(category);
        }
      },
    }
  );

  // Fetch products when category changes
  const [fetchData, { loading: dataLoading, error: dataError }] = useLazyQuery(
    GET_PRODUCTS,
    {
      onCompleted: (data) => {
        setProductsData(data.products);
      },
    }
  );

  useEffect(() => {
    if (category) {
      fetchData({ variables: { category } });
    }
  }, [fetchData, category]);

  useEffect(() => {
    document.body.style.overflowY = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  if (categoriesError || dataError) {
    return (
      <p className="py-2 my-8 font-semibold text-center text-white bg-red-500">
        Oops! Something broke. Try reloading the page or come back later.
      </p>
    );
  }

  if (categoriesLoading || dataLoading) return <Loading />;

  return (
    <header className="relative z-10 flex items-center justify-between">
      <NavigationMenu
        categories={categories}
        handleCategoryChange={handleCategoryChange}
      />
      <div className="absolute inset-x-0 flex items-center justify-center mx-auto">
        <Link to="/" onClick={() => handleCategoryChange(categories[0])}>
          <Logo />
        </Link>
      </div>
      <button
        className="relative z-10 cursor-pointer"
        onClick={toggleModal}
        data-testid="cart-btn"
      >
        <Cart />
        {cartItems.length > 0 && (
          <div
            className="absolute flex items-center justify-center w-5 h-5 -mt-1 -mr-1 text-sm text-white rounded-full -top-1 -right-2 bg-text"
            data-testid="cart-count-bubble"
          >
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </div>
        )}
      </button>
      {showModal && (
        <>
          <div
            className="absolute inset-x-0 z-50 h-screen bg-black opacity-50 top-full -right-20 -left-20"
            onClick={toggleModal}
            data-testid="cart-overlay"
          />
          <CartModal cartItems={cartItems} onClose={toggleModal} />
        </>
      )}
    </header>
  );
};

export default Header;
