import React, { useEffect, useState } from 'react';
import Details from '../components/Details';
import api from '../../axios';
import Inventory from './Inventory';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const Profile = ({shopping}) => {
    const [user, setUser] = useState(null);
    const [show,setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await api.get('/getUser');
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate('/login');
            }
        };
        getUser();
    }, []);

    return (
        <>
            <div className='flex w-full h-full'>
                {user ? (
                    <>
                        <Details user={user} setUser={setUser} show={show}/>
                        <Inventory user ={user} shopping={shopping} setShow={setShow} show={show}/>
                    </>
                    
                ) : (
                    <Loading/>
                )}
            </div>
            <footer className="bg-gray-800 py-4 mt-0">
            <div className="container mx-auto px-4 text-center text-gray-400">
            © 2024 UniShop. All rights reserved.
            </div>
        </footer>
      </>
    );
};

export default Profile;
