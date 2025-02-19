import jwt from 'jsonwebtoken';
import './config.js';
import bcrypt from 'bcryptjs';
import sanitize from 'mongo-sanitize';
import {User,Item} from './db.mjs';

export const verifyToken = (token,req,res)=>{
  jwt.verify(token, process.env.SECRET_TOKEN, async (err , user)=>{
    if(err){
      res.status(403);
      return;
    }
    const updatedUser = await User.findOne({username: sanitize(user.user.username)});    
    res.send({user: updatedUser});
  });

};

export const createToken = (res, user) => {
  const token = jwt.sign({ user },process.env.SECRET_TOKEN, {expiresIn: "1d"});
  return token;
};

export const handleLogin = async (req,res)=>{
  if(req.cookies.token){
    verifyToken(req.cookies.token,req,res);
  }
  else{
    const user = await User.findOne({username: sanitize(req.body.username)});
    if(!user){res.send({usere:true});return;}
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if(!isMatch){res.send({match:true});return;}
    const token = createToken(res, user);
    res.cookie("token", token, { httpOnly: false}).status(200).json(user);
  }
}


export const handleRegister = async (req,res)=>{
  let user = await User.findOne({username: req.body.username});
  if(user)res.send({exists:true});
  else{
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    user = await User.create({
      firstname: sanitize(req.body.firstname),
      lastname: sanitize(req.body.lastname),
      username: sanitize(req.body.username),
      email: sanitize(req.body.email),
      password:hashedPassword,
      location:sanitize(req.body.location),
      school:sanitize(req.body.school),
      shopping: [],
      selling: []
    })
    const token = createToken(res, user);
    res.cookie("token", token, { httpOnly: false}).status(200).json(user);
  }
}

export const handleLogout = (req,res) =>{
  res.clearCookie("token").status(200).json({message:'done'});
}