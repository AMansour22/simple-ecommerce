import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useNavigationMenu from '../hooks/useNavigationMenu';

function NavigationMenu({ categories, handleCategoryChange }) {
  const { selectedCategory, handleNavClick } = useNavigationMenu({
    categories,
    handleCategoryChange,
  });

  return (
    <nav className="z-10">
      <ul className="flex gap-6 uppercase">
        {categories.map((category) => {
          const isSelected = category === selectedCategory;
          return (
            <li key={category}>
              <Link
                to={`/${category}`}
                className={`block pb-4 border-b-2 ${
                  isSelected
                    ? 'nav-active'
                    : 'border-transparent hover:text-primary'
                }`}
                data-testid={
                  isSelected ? 'active-category-link' : 'category-link'
                }
                onClick={() => handleNavClick(category)}
              >
                {category}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

NavigationMenu.propTypes = {
  categories: PropTypes.array,
  handleCategoryChange: PropTypes.func,
};

export default NavigationMenu;
