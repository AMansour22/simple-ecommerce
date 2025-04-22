import { Outlet } from 'react-router-dom';
import { Header } from '../components';

const HomeLayout = () => {
  return (
    <>
      {/* Header component for navigation */}
      <Header />
      {/* Outlet for rendering nested routes */}
      <Outlet />
    </>
  );
};

export default HomeLayout;