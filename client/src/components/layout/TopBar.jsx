import { useSelector } from 'react-redux';

const Topbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="w-full h-16 bg-white shadow-md pl-64 flex items-center justify-between px-6 fixed top-0 z-10">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="text-gray-700 font-medium">
        {user ? `Welcome, ${user.name}` : ''}
      </div>
    </header>
  );
};



export default Topbar;
