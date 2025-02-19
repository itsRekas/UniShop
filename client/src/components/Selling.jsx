import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import SellingItems from './SellingItems';

const Selling = ({ add, setAdd, user }) => {
  const [name, setName] = useState('');
  const [itemPicture, setItemPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [sellingList, setSellingList] = useState(null);
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports & Outdoors'];
  const navigate = useNavigate();

  const handleReset = (sellingList) => {
    setAdd(false);
    setPrice('');
    setName('');
    setItemPicture(null);
    setPicturePreview(null);
    setDescription('');
    setSellingList(sellingList);
    navigate(`/profile-${user?.username}/selling`);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItemPicture(file);
      setPicturePreview(URL.createObjectURL(file));
    }
  };

  const handleAddItem = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('userId', user._id);
    formData.append('category', category);
    if (itemPicture) {
      formData.append('picture', itemPicture);
    }

    const item = await api.post('/addItem', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const sellingList = await api.post('/addUserSellingItem', {
      itemId: item.data._id,
      userId: user._id
    });
    
    return sellingList;
  };

  const validateForm = () => {
    let errors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!itemPicture) errors.picture = "Picture is required";
    if (!price.trim() || isNaN(Number(price))) errors.price = "Enter a valid price";
    if (!description.trim()) errors.description = "Description is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const List = await handleAddItem()
      handleReset(List.data.sellingItems);
    }
  };

  return (
    <div className="w-full bg-gray-900 text-white p-4 md:p-8">
      {add ? (
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Add New Item</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {picturePreview && (
                <img 
                  src={picturePreview} 
                  alt="Preview" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              <label className="block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center transition duration-300">
                Upload Picture
                <input 
                  name="picture"
                  type="file"
                  accept="image/*"
                  onChange={handlePictureChange}
                  className="hidden"
                />
              </label>
              {errors.picture && <p className="text-red-500 text-sm">{errors.picture}</p>}
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <input 
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                type="text" 
                name="itemname" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Item name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              
              <select 
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              
              <input 
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                type="text" 
                name="price" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                placeholder="Price"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
              
              <textarea 
                className="w-full bg-gray-700 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Description"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              
              <div className="flex justify-center gap-4">
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition duration-300">Add Item</button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition duration-300" onClick={() => setAdd(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <SellingItems user={user} sellingList={sellingList} setSellingList={setSellingList}/>
      )}
    </div>
  );
};

export default Selling;