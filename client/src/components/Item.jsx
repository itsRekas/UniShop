import React, { useState } from 'react';
import api from '../../axios';
import ItemView from './ItemView';
import { useNavigate } from 'react-router-dom';

const Item = ({ item, shop, index, user, setUser, selling, setSellingList, setShoppingList }) => {
  const [showItem, setShowItem] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const response = await api.post('/addToCart', {
      itemId: item._id,
      userId: user._id
    });
    setUser(response.data.user);
  };

  const handleSellingDeleteItem = async (e) => {
    e.stopPropagation();
    const response = await api.post('/deleteSellingItem', {
      index,
      userId: user._id
    });
    setSellingList(response.data);
  };

  const handleShoppingDeleteItem = async (e) => {
    e.stopPropagation();
    const response = await api.post('/deleteShoppingItem', {
      itemId: item._id,
      userId: user._id
    });
    setShoppingList(response.data);
  };

  return (
    <>
      {showItem && (
        <ItemView
          user={user}
          item={item}
          setShowItem={setShowItem}
          handleAddToCart={handleAddToCart}
          handleSellingDeleteItem={handleSellingDeleteItem}
          handleShoppingDeleteItem={handleShoppingDeleteItem}
          shop={shop}
          selling={selling}
        />
      )}
      <div
        onClick={() => setShowItem(true)}
        className="bg-gray-800 shadow-xl w-full sm:w-64 h-auto sm:h-96 flex flex-col items-center justify-between rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 overflow-hidden"
      >
        <div className="w-full h-48 overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            src={`${import.meta.env.VITE_BASEURL}${item.picture}`}
            alt={item.name}
          />
        </div>
        <div className="p-4 flex flex-col items-center flex-grow w-full">
          <h2 className="text-xl font-semibold text-white mb-2">{item.name}</h2>
          <p className="text-green-400 font-bold mb-2">$ {item.price}</p>
          <p className="text-gray-300 text-sm text-center mb-4 overflow-hidden line-clamp-3">{item.description}</p>
          {shop ? (
            <button
              onClick={(e) => handleAddToCart(e)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 w-full"
            >
              Add to cart
            </button>
          ) : selling ? (
            <button
              onClick={(e) => handleSellingDeleteItem(e)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 w-full"
            >
              Delete
            </button>
          ) : (
            <button
              onClick={(e) => handleShoppingDeleteItem(e)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 w-full"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Item;