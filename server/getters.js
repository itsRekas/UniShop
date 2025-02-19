import * as auth from './auth.js';
import {User,Item} from './db.mjs';

export const handleGetUser = async (req, res) => {
  if(req.cookies.token){
    auth.verifyToken(req.cookies.token,req,res);
  }
  else{res.send(null);}
}

export const handleGetItems = async (req,res)=>{
  const items = await Item.find({}).populate('user');
  res.send(items);
}

export const handleGetSellingList = async (req,res)=>{
  try{
    const user = await User.findById(req.query.userId).populate({
      path: 'selling',
      populate: {
        path: 'user',
      },
    });
  if(!user)return res.status(404).json({error: "User not found!"});
  res.status(200).json({sellingList: user.selling});
  }
  catch(error){
    res.status(500).json({error: `Error in server: ${error}`});
  }
}

export const handleGetShoppingList = async (req,res)=>{
  try{
  const user = await User.findById(req.query.userId).populate({
    path: 'shopping',
    populate: {
      path: 'user',
    },
  });
  if(!user)return res.status(404).json({error: "User not found!"});
  res.status(200).json({shoppingList: user.shopping});
  }
  catch(error){
    res.status(700).json({error: `Error in server: ${error}`});
  }
}
