import { NavLink } from 'react-router-dom';
import { FaHome, FaBookOpen, FaUser, FaSignOutAlt } from 'react-icons/fa';

const SideBar = () => {
  const menuItems = [
    { name: 'Home', path: '/home', icon: <FaHome /> },
    { name: 'Explore', path: '/explore', icon: <FaBookOpen /> },
    { name: 'Profile', path: '/profile', icon: <FaUser /> },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 z-10">
      <div className="p-4 text-2xl font-semibold border-b border-gray-700">
        LearnSphere
      </div>
      <nav className="mt-6">
        <ul className="space-y-2">
          {menuItems.map(({ name, path, icon }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-2 hover:bg-gray-700 transition-all ${
                    isActive ? 'bg-gray-700' : ''
                  }`
                }
              >
                {icon}
                <span>{name}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                // optionally add logout logic
              }}
              className="w-full text-left flex items-center gap-3 px-6 py-2 hover:bg-red-600 transition-all"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
