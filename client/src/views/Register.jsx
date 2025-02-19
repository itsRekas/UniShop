import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../axios';

const Register = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    location: '',
    school: '',
    password: '',
    email: '',
  });
  const [exists, setExists] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (name === 'username') setExists(false);
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/logout');
      const response = await api.post("/register", formData);
      if (response.data.exists) {
        setExists(true);
        setFormData(prevState => ({ ...prevState, username: '' }));
      } else {
        setUser(response.data.user);
        navigate('/');
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 shadow-2xl p-10 rounded-2xl">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-white">UniShop</h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-white">Create your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={registerSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {['firstname', 'lastname', 'email', 'username', 'location', 'school', 'password'].map((field, index) => (
              <div key={field}>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800 ${
                    index === 0 ? 'rounded-t-md' : index === 6 ? 'rounded-b-md' : ''
                  }`}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              </div>
            ))}
          </div>

          {exists && <p className="text-red-500 text-sm">Username already exists</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link to="/login" className="font-medium text-blue-400 hover:text-blue-500">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;