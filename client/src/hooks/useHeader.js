import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useProduct } from '../contexts/ProductContext';

const useHeader = () => {
  const { category } = useParams();
  const { cartItems, isCartOpen, setIsCartOpen } = useCart();
  const { selectedCategory, setSelectedCategory, categories, loading } = useProduct();
  const [showModal, setShowModal] = useState(false);

  // Sync context's isCartOpen with local showModal in both directions
  useEffect(() => {
    setShowModal(isCartOpen);
  }, [isCartOpen]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    setIsCartOpen((prev) => !prev); // Sync context state with local state
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    document.body.style.overflowY = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  return {
    category,
    cartItems,
    isCartOpen,
    showModal,
    toggleModal,
    selectedCategory,
    handleCategoryChange,
    categories,
    loading,
  };
};

export default useHeader;
