import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '../../store/auth/test';
import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaSun, FaMoon } from 'react-icons/fa';
import { setDarkMode, getInitialDarkMode } from '../../utils/themeUtils';

const Topbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [isDark, setIsDark] = useState(getInitialDarkMode());

  useEffect(() => {
    setDarkMode(isDark);
  }, [isDark]);

  const toggleDarkMode = () => setIsDark((prev) => !prev);

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate('/login');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 shadow px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:scale-105 transition"
          title={isDark ? 'Light Mode' : 'Dark Mode'}
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>

        <div className="relative">
          <button onClick={() => setDropdownOpen((prev) => !prev)} className="flex items-center gap-2 focus:outline-none">
            <div className="w-9 h-9 bg-indigo-500 text-white rounded-full flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className="uppercase text-sm font-semibold">
                  {user?.fullName?.[0]}
                </span>
              )}
            </div>
            <FaChevronDown className="text-gray-500 dark:text-gray-300 text-sm" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg border rounded z-30">
              <ul className="text-gray-700 dark:text-gray-200">
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    navigate('/profile');
                    setDropdownOpen(false);
                  }}
                >
                  My Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => fileRef.current.click()}
                >
                  Upload Image
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-600 border-t"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
