import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../axios';

const Login = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usere, setUsere] = useState(false);
  const [match, setMatch] = useState(false);

  const loginSubmit = async (e) => {
    e.preventDefault();
    const data = { username, password };
    try {
      await api.post('/logout');
      const response = await api.post("/login", data);
      if (response.data.usere) {
        setUsere(true);
        setUsername('');
      } else if (response.data.match) {
        setMatch(true);
        setPassword('');
      } else {
        setUser(response.data.user);
        navigate('/');
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 shadow-2xl p-10 rounded-2xl">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-white">UniShop</h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-white">Login to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={loginSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setUsere(false); }}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Username"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setMatch(false); }}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Password"
              />
            </div>
          </div>

          {usere && <p className="text-red-500 text-sm">Username does not exist</p>}
          {match && <p className="text-red-500 text-sm">Incorrect password</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center">
        
          <Link to="/register" className="font-medium text-blue-400 hover:text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;