// Updated Sidebar.jsx with full dark mode contrast
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaBookOpen, FaBars, FaUser, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { logoutThunk } from '../../store/auth/test';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate('/login');
  };

  if (!user) return null;

  const studentMenu = [
    { label: 'Dashboard', icon: <FaHome />, to: '/dashboard/student' },
    { label: 'Explore Courses', icon: <FaBookOpen />, to: '/dashboard/student/explore' }
  ];

  const instructorMenu = [
    { label: 'Dashboard', icon: <FaChalkboardTeacher />, to: '/dashboard/instructor' },
    { label: 'Manage Courses', icon: <FaBookOpen />, to: '/dashboard/instructor/manage' }
  ];

  const commonMenu = [{ label: 'Profile', icon: <FaUser />, to: '/profile' }];

  const menuItems = user.role === 'student' ? studentMenu : instructorMenu;

  return (
    <aside
      className={`bg-white dark:bg-gray-900 border-r transition-all duration-300 ease-in-out shadow-sm
        ${collapsed ? 'w-16' : 'w-64'} min-h-screen hidden sm:flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <span
          className={`text-xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer ${collapsed && 'hidden'}`}
          onClick={() => navigate('/')}
        >
          LearnSphere
        </span>
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-500 dark:text-gray-300">
          <FaBars />
        </button>
      </div>

      <nav className="mt-4 flex-1 space-y-1 px-2">
        {[...menuItems, ...commonMenu].map(({ label, icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isActive ? 'bg-gray-100 dark:bg-gray-800 font-semibold text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-200'
              }`
            }
          >
            <span className="text-lg">{icon}</span>
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded w-full"
        >
          <FaSignOutAlt />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
