import React, { useState } from 'react';
import api from '../../axios';
import { useNavigate } from 'react-router-dom';

const Details = ({ user, setUser, show }) => {
  const [edit, setEdit] = useState(false);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [location, setLocation] = useState(user.location);
  const [school, setSchool] = useState(user.school);
  const [email, setEmail] = useState(user.email);
  const [profile, setProfile] = useState(user.profilePicture ? `${import.meta.env.VITE_BASEURL}${user.profilePicture}` : "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg");
  const [profileFile, setProfileFile] = useState(null);
  const navigate = useNavigate();

  const updateDetail = async () => {
    try {
      const formData = new FormData();
      formData.append('firstname', firstname);
      formData.append('lastname', lastname);
      formData.append('location', location);
      formData.append('school', school);
      formData.append('email', email);
      formData.append('userId', user._id);
      if (profileFile) {
        formData.append('profilePicture', profileFile);
      }
      const response = await api.post('/updateUser', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.user) {
        setUser(response.data.user);
        setEdit(false);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    setProfileFile(file);
    const profilePath = URL.createObjectURL(file);
    setProfile(profilePath);
  };

  return (
    <div className={`${show ? "block" : "hidden"} md:block w-full max-w-full sm:max-w-[90%] md:max-w-md mx-auto p-6 bg-gray-800`}>
        {edit ? (
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <img className="w-40 h-40 object-cover rounded-full shadow-lg mb-4" src={profile} alt="Profile" />
            <label htmlFor="profile-pic" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300">
              Update Profile
            </label>
            <input name="profilePicture" className="hidden" type="file" id="profile-pic" accept="image/*" onChange={handleProfileChange} />
          </div>
          <input className="w-full bg-gray-700 text-white rounded-lg py-2 px-3" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="Firstname" />
          <input className="w-full bg-gray-700 text-white rounded-lg py-2 px-3" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Lastname" />
          <input className="w-full bg-gray-700 text-white rounded-lg py-2 px-3" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
          <input className="w-full bg-gray-700 text-white rounded-lg py-2 px-3" type="text" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="School" />
          <input className="w-full bg-gray-700 text-white rounded-lg py-2 px-3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <div className="flex justify-between">
            <button onClick={updateDetail} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">Save</button>
            <button onClick={async () => { await api.post('/logout'); navigate('/'); }} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">Logout</button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <img className="w-40 h-40 object-cover rounded-full shadow-lg mb-4" src={profile} alt="Profile" />
            <h2 className="text-2xl font-bold text-white">{user.firstname} {user.lastname}</h2>
          </div>
          <div className="space-y-2 text-gray-300">
            <p><span className="font-semibold">School:</span> {user.school}</p>
            <p><span className="font-semibold">Location:</span> {user.location}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
          </div>
          <div className="flex justify-between">
            <button onClick={() => setEdit(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">Edit</button>
            <button onClick={async () => { await api.post('/logout'); navigate('/'); }} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;