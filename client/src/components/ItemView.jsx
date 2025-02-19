import React, { useState } from 'react';
import api from '../../axios';
import { useNavigate } from 'react-router-dom';

const ItemView = ({ setShowItem, item, handleAddToCart, handleSellingDeleteItem, handleShoppingDeleteItem, shop, selling, user }) => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [url, setUrl] = useState(item.picture);
  const [description, setDescription] = useState(item.description);
  const [imageFile, setImageFile] = useState(null);
  const [temp, setTemp] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setTemp(imageUrl);
    }
  };

  const handleCancelEditItem = () => {
    setName(item.name);
    setPrice(item.price);
    setUrl(item.picture);
    setDescription(item.description);
    setImageFile(null);
    setEdit(false);
    setTemp('');
  };

  const handleEditSellingItem = async () => {
    try {
      const formData = new FormData();
      formData.append('itemId', item._id);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      if (imageFile) {
        formData.append('picture', imageFile);
      }
      const response = await api.post('/editItem', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUrl(response.data.item.picture);
      setTemp('');
      setEdit(false);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleBuyItem = async () => {
    try {
      const response = await api.post('/buyItem', {
        itemId: item._id,
        userId: user._id
      });
      if (response.data.success) {
        alert('Item purchased successfully!');
        setShowItem(false);
        handleShoppingDeleteItem();
        window.location.reload();
      } else {
        alert('Failed to purchase item. Please try again.');
      }
    } catch (error) {
      console.error('Error buying item:', error);
      alert('An error occurred while trying to purchase the item.');
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto'
         onClick={() => {
           setShowItem(false);
           if (selling) {
             window.location.reload();
           }
         }}>
      <div className='w-full max-w-4xl bg-gray-800 rounded-lg shadow-xl overflow-hidden'
           onClick={(e) => e.stopPropagation()}>
        <div className='flex flex-col md:flex-row'>
          <div className='w-full md:w-1/2 p-6'>
            <div className='relative aspect-w-1 aspect-h-1 mb-4'>
              {edit ? (
                <>
                  <img className='w-full h-full object-cover rounded-lg shadow-xl'
                       src={temp ? temp : `${import.meta.env.VITE_BASEURL}${url}`}
                       alt="item" />
                  <label htmlFor='item-pic'
                         className='mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition'>
                    Update Image
                  </label>
                  <input id='item-pic' type="file" accept="image/*" className='hidden' onChange={handleImageChange} />
                </>
              ) : (
                <img className='w-full h-full object-cover rounded-lg shadow-xl'
                     src={`${import.meta.env.VITE_BASEURL}${url}`}
                     alt="item" />
              )}
            </div>
            <div className='text-center text-gray-300'>
              <p className='font-semibold'>Seller: {item.user.firstname} {item.user.lastname}</p>
              <p>Email: {item.user.email}</p>
              <p>Location: {item.user.location}</p>
            </div>
          </div>
          <div className='w-full md:w-1/2 p-6 flex flex-col'>
            {edit ? (
              <>
                <input type="text" className='w-full p-2 mb-4 bg-gray-700 text-white rounded-lg'
                       value={name} placeholder='Enter Item Name' onChange={(e) => setName(e.target.value)} />
                <textarea className='w-full h-40 p-2 mb-4 bg-gray-700 text-white rounded-lg resize-none'
                          value={description} placeholder='Enter Item Description'
                          onChange={(e) => setDescription(e.target.value)} />
                <input type="number" className='w-full p-2 mb-4 bg-gray-700 text-white rounded-lg'
                       value={price} placeholder='Enter Item Price' onChange={(e) => setPrice(e.target.value)} />
              </>
            ) : (
              <>
                <h1 className='text-2xl font-bold mb-4 text-white'>{name}</h1>
                <div className='flex-grow overflow-y-auto mb-4'>
                  <h2 className='font-semibold mb-2 text-gray-300'>Item Description</h2>
                  <p className='text-gray-400'>{description}</p>
                </div>
                <p className='text-xl text-white mb-4'>Price: ${price}</p>
              </>
            )}
            <div className='mt-auto'>
              {shop ? (
                <button onClick={handleAddToCart}
                        className='w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition'>
                  Add to cart
                </button>
              ) : selling ? (
                edit ? (
                  <div className='flex gap-4'>
                    <button onClick={handleEditSellingItem}
                            className='flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'>
                      Save
                    </button>
                    <button onClick={handleCancelEditItem}
                            className='flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition'>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className='flex gap-4'>
                    <button onClick={() => setEdit(true)}
                            className='flex-1 bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition'>
                      Edit
                    </button>
                    <button onClick={handleSellingDeleteItem}
                            className='flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition'>
                      Delete
                    </button>
                  </div>
                )
              ) : (
                <div className='flex gap-4'>
                  <button onClick={handleShoppingDeleteItem}
                          className='flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition'>
                    Delete
                  </button>
                  <button onClick={handleBuyItem}
                          className='flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'>
                    Buy
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemView;