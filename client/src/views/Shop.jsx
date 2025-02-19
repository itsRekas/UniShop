import React, { useEffect, useState } from 'react';
import api from '../../axios';
import Loading from '../components/Loading';
import Item from '../components/Item';

const Shop = ({ user, filterItems, category, searchItem, search, setUser }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await api.get('/getItems');
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    getItems();
  }, []);

  useEffect(() => {
    if (items) {
      let itemsFiltered = items;
      if (filterItems) {
        itemsFiltered = items.filter((elem) => elem.category === category);
      } else if (searchItem) {
        itemsFiltered = items.filter((elem) => elem.name && elem.name.toLowerCase().includes(search.toLowerCase()));
      }
      setFilteredItems(itemsFiltered);
    }
  }, [filterItems, items, category, searchItem, search]);

  return (
    <div className="min-h-screen bg-gray-900 text-white shadow-2xl p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Shop Items</h1>
        {filteredItems ? (
          filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredItems.map((item, i) => (
                <div key={i} >
                  <Item item={item} shop={true} user={user} setUser={setUser} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p className="text-xl">No items found</p>
              <p className="mt-2">Try adjusting your search or filters</p>
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default Shop;