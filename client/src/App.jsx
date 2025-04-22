import { RouterProvider } from 'react-router-dom';
import router from './router';
import { DataProvider } from './DataContext';

const App = () => {
  return (
    <DataProvider>
      {/* RouterProvider renders the application's routing configuration */}
      <RouterProvider router={router} />
    </DataProvider>
  );
};

export default App;