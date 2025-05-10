import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_PRODUCTS } from '../graphql/queries';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch categories only once when component mounts
  const { loading: categoriesLoading } = useQuery(GET_CATEGORIES, {
    onCompleted: (data) => {
      const categoryNames = data.categories.map((cat) => cat.name);
      setCategories(categoryNames);
      // If no category is selected, set to first category
      if (!selectedCategory) {
        setSelectedCategory(categoryNames[0]);
      }
    },
  });

  // Fetch products when category changes
  const [fetchProducts] = useLazyQuery(GET_PRODUCTS, {
    onCompleted: (data) => setProductsData(data.products),
  });

  // Fetch products when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      fetchProducts({ variables: { category: selectedCategory } });
    }
  }, [selectedCategory, fetchProducts]);

  return (
    <ProductContext.Provider
      value={{
        productsData,
        selectedCategory,
        setSelectedCategory,
        categories,
        loading: categoriesLoading,
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