import React, { useState } from 'react';
import ProfileNav from '../components/ProfileNav';
import Shopping from '../components/Shopping';
import Selling from '../components/Selling';

const Inventory = ({ user, shopping, show, setShow }) => {
  const [add, setAdd] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-gray-900 text-white">
      <ProfileNav setAdd={setAdd} shopping={shopping} user={user} setShow={setShow} show={show}/>
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        onClick={(e)=>{
          e.stopPropagation();
          if(show)setShow(!show);
        }}
      >
        <h1 className={`${show?"hidden":"block"} sm:block text-3xl font-bold mb-6`}>
          {shopping ? 'Your Shopping List' : 'Your Selling Items'}
        </h1>
        <div className={`${show?"hidden":"block"} sm:block w-full h-full overflow-y-auto`}>
          {shopping ? (
            <Shopping user={user} />
          ) : (
            <Selling add={add} setAdd={setAdd} user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;