import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import Item from './Item';
import api from '../../axios';

const Shopping = ({ user }) => {
  const [shoppingList, setShoppingList] = useState(null);

  useEffect(() => {
    const handleGetShoppingList = async () => {
      try {
        const response = await api.get(`/getShoppingList?userId=${user._id}`);
        setShoppingList(response.data.shoppingList);
      } catch (error) {
        console.error('Error fetching shopping list:', error);
      }
    };
    handleGetShoppingList();
  }, [user._id]);

  if (!shoppingList) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-900 w-full p-4 sm:p-6 md:p-8 ">
      {/* <h1 className="text-2xl font-bold text-white mb-6">Your Shopping List</h1> */}
      {shoppingList.length === 0 ? (
        <p className="text-gray-400 text-center">Your shopping list is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {shoppingList.map((item, index) => (
            <div key={index} >
              <Item item={item} user={user} setShoppingList={setShoppingList} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shopping;