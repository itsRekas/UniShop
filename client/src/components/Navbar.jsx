import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, MagnifyingGlassIcon, ChevronDownIcon, ChevronUpIcon, Bars3Icon } from '@heroicons/react/24/solid';

const Navbar = ({ user, setFilterItems, setCategory, setSearch, setSearchItem }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [currCategory, setCurrCategory] = useState('Categories');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports & Outdoors'];
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchItem(true);
    setSearch(keyword);
    navigate('/');
    setShowMobileMenu(false);
  };

  const handleCategoryClick = (category) => {
    setShowCategories(false);
    setFilterItems(true);
    setCategory(category);
    setCurrCategory(category);
    setShowMobileMenu(false);
  };

  return (
    <nav className="fixed top-0 w-full left-0 bg-gray-900 shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0" onClick={() => { setFilterItems(false); setSearchItem(false); setKeyword(''); setCurrCategory('Categories'); }}>
              <h1 className="text-2xl font-bold text-white">UniShop</h1>
            </Link>
          </div>
          <div className="hidden md:block flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full h-10 px-4 pr-10 text-sm bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
              <span type="submit" className="absolute z-30 right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer">
                    <MagnifyingGlassIcon className="h-5 w-5" />
                </span>
            </form>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button 
                className="flex items-center text-white hover:text-blue-500 transition-colors"
                onClick={() => setShowCategories(!showCategories)}
              >
                {currCategory}
                {!showCategories ? <ChevronDownIcon className="h-4 w-4 ml-1" /> : <ChevronUpIcon className="h-4 w-4 ml-1" />}
              </button>
              {showCategories && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to={`/profile-${user?.username}/shopping`} className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-white hover:text-blue-500 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {user ? user.shopping.length : 0}
              </span>
            </Link>
            {user ? (
              <Link to={`/profile-${user?.username}/shopping`} className="flex items-center space-x-2 group">
                <img 
                  className="rounded-full w-8 h-8 object-cover border-2 border-transparent group-hover:border-blue-500 transition-all" 
                  src={user.profilePicture ? `${import.meta.env.VITE_BASEURL}${user.profilePicture}` : "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg"}
                  alt="Profile"
                />
                <span className="text-white group-hover:text-blue-500 transition-colors">{user.firstname}</span>
              </Link>
            ) : (
              <Link to="/login" className="text-white hover:text-blue-500 transition-colors font-medium">Sign In</Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="text-white">
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {showMobileMenu && (
        <div className="md:hidden bg-gray-800 py-2">
          <form onSubmit={handleSearch} className="px-4 mb-2">
            <input
              type="text"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full h-10 px-4 pr-10 text-sm bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </form>
          <div className="px-4 py-2">
            <button 
              className="flex items-center text-white w-full justify-between"
              onClick={() => setShowCategories(!showCategories)}
            >
              {currCategory}
              {!showCategories ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronUpIcon className="h-4 w-4" />}
            </button>
            {showCategories && (
              <div className="mt-2 space-y-2">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to="/"
                    className="block py-2 text-sm text-gray-300 hover:bg-gray-700"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="px-4 py-2 border-t border-gray-700">
            {user ? (
              <Link to={`/profile-${user?.username}/shopping`} className="flex items-center space-x-2 text-white">
                <img 
                  className="rounded-full w-8 h-8 object-cover border-2 border-transparent" 
                  src={user.profilePicture ? `${import.meta.env.VITE_BASEURL}${user.profilePicture}` : "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg"}
                  alt="Profile"
                />
                <span>{user.firstname}</span>
              </Link>
            ) : (
              <Link to="/login" className="text-white font-medium">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;