import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import Item from './Item';
import api from '../../axios';

const SellingItems = ({ sellingList, setSellingList, user }) => {
  const [isLoading, setIsLoading] = useState(!sellingList);

  useEffect(() => {
    const handleGetSellingList = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/getSellingList?userId=${user._id}`);
        setSellingList(response.data.sellingList);
      } catch (error) {
        console.error('Error fetching selling list:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!sellingList) {
      handleGetSellingList();
    }
  }, [user._id, sellingList, setSellingList]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-900 p-4 sm:p-6 md:p-8">
      {/* <h1 className="text-2xl font-bold text-white mb-6">Your Selling Items</h1> */}
      {sellingList && sellingList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sellingList.map((item, index) => (
            <div key={index}>
              <Item
                item={item}
                index={index}
                user={user}
                selling={true}
                setSellingList={setSellingList}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">You don't have any items for sale.</p>
      )}
    </div>
  );
};

export default SellingItems;