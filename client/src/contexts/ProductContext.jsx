import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  return (
    <ProductContext.Provider
      value={{
        productsData,
        setProductsData,
        selectedCategory,
        setSelectedCategory,
        categories,
        setCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 