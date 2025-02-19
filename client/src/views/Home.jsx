import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../../axios';
import Shop from './Shop';

const Home = () => {
  const [user, setUser] = useState(null);
  const [filterItems, setFilterItems] = useState(false);
  const [category, setCategory] = useState('');
  const [searchItem, setSearchItem] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get('/getUser');
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar
        user={user}
        setFilterItems={setFilterItems}
        setCategory={setCategory}
        setSearchItem={setSearchItem}
        setSearch={setSearch}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <Shop
          user={user}
          setUser={setUser}
          filterItems={filterItems}
          setFilterItems={setFilterItems}
          category={category}
          searchItem={searchItem}
          search={search}
        />
      </main>
      <footer className="bg-gray-800 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          © 2024 UniShop. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;