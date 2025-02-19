import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import api from '../axios'
import Profile from './views/Profile'
import NotFound from './views/NotFound'


function App() {
  const [user,setUser] = useState(null);
  const navigate = useNavigate();

  useEffect( () => {
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
    <div className='h-full w-full'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login user= {user} setUser={setUser}/>}/>
        <Route path='/register' element={<Register user = {user} setUser = {setUser}/>}/>
        <Route path={`/:slug/selling`} element={<Profile shopping={false} />} />
        <Route path={`/:slug/shopping`} element={<Profile shopping={true} />} />
        <Route path={`/*`} element={<NotFound/>} />
      </Routes>
    </div>
  )
}

export default App
