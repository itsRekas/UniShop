import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const ProfileNav = ({ shopping, setAdd, user, show, setShow }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md w-full">
      <div className="container mx-auto px-4 py-3 w-4/5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex justify-center items-center h-full gap-4 min-w-10">
              <img 
              className={`block sm:hidden rounded-full w-8 h-8 object-cover border-2 border-transparent group-hover:border-blue-500 transition-all cursor-pointer`} 
              src={user.profilePicture ? `${import.meta.env.VITE_BASEURL}${user.profilePicture}` : "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg"}
              alt="Profile"
              onClick={()=>setShow(!show)}
              />
            <Link
              to={`/profile-${user?.username}/shopping`}
              className={`${show?"hidden":"block"} text-gray-300 hover:text-white transition duration-300 focus:outline-none ${
                isActive('shopping') ? 'underline' : 'hover:underline'
              }`}
            >
              Shopping Bag
            </Link>
            <Link
              to={`/profile-${user?.username}/selling`}
              className={`${show?"hidden":"block"} text-gray-300 hover:text-white transition duration-300 focus:outline-none ${
                isActive('selling') ? 'underline' : 'hover:underline'
              }`}
            >
              Selling Bag
            </Link>
          </div>
          <div className={`${show?"hidden":"flex"} flex-col sm:flex-row gap-2 sm:gap-4`}>
            {!shopping && (
              <button
                onClick={() => setAdd(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 flex-grow-0 flex-shrink-0"
              >
                Add
              </button>
            )}
            <Link to="/" className="flex-grow-0 flex-shrink-0">
              <button className={`${show?"hidden":"block"} bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 w-full`}>
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProfileNav;