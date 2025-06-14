import SideBar from './SideBar';
import TopBar from './TopBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <SideBar />
      <TopBar />
      <main className="pl-64 pt-16 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
