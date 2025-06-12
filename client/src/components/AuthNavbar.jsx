import React from 'react'
import { Link } from 'react-router-dom'

const AuthNavbar = () => {
  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo + Explore */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold text-purple-700 tracking-tight">
            LearnSphere
          </Link>
          <Link to="/explore" className="text-gray-700 hover:text-purple-700 text-sm font-medium">
            Explore
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search for courses"
            className="w-full max-w-md border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-sm px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default AuthNavbar;
