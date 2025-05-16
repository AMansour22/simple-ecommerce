import { useCart } from '../contexts/CartContext';
import { useProduct } from '../contexts/ProductContext';

const useNavigationMenu = ({ categories, handleCategoryChange }) => {
  const { selectedCategory } = useProduct();
  const { setIsCartOpen } = useCart();

  const handleNavClick = (category) => {
    setIsCartOpen(false);
    handleCategoryChange(category);
  };

  return {
    selectedCategory,
    handleNavClick,
  };
};

export default useNavigationMenu;