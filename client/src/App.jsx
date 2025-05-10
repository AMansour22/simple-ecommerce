import { RouterProvider } from 'react-router-dom';
import router from './router';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';

const App = () => {
  return (
    <ProductProvider>
      <CartProvider>
        {/* RouterProvider renders the application's routing configuration */}
        <RouterProvider router={router} />
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
