import express, { json } from 'express'
import cors from 'cors'
import session from 'express-session'
import * as auth from './auth.js';
import * as getter from './getters.js'
import * as setter from './setters.js'
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import url from "url";

import './config.js'

import fs from 'fs';

const uploadFolder = 'Images';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Images/');
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const app = express();

const basePath = path.dirname(url.fileURLToPath(import.meta.url));

app.use(express.static(basePath));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: process.env.CLIENT,
  credentials: true
}));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(cookieParser());



app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});


app.post('/register', async (req,res)=>{
  auth.handleRegister(req,res);
});

app.post('/login',async (req,res)=>{
  auth.handleLogin(req,res);
});

app.post('/logout',(req,res)=>{
  auth.handleLogout(req,res);
});

app.get('/getUser',async (req,res) =>{
  getter.handleGetUser(req,res);
});

app.get('/getItems',async (req,res)=>{
  getter.handleGetItems(req,res);
});

app.get('/getSellingList',async (req,res)=>{
  getter.handleGetSellingList(req,res);
});

app.get('/getShoppingList',async (req,res)=>{
  getter.handleGetShoppingList(req,res);
});

app.post('/addItem', upload.single('picture') ,async (req,res)=>{
  try {
    if (req.file) {
      req.body.picture = req.file.path;
    }
    await setter.handleAddItem(req, res);
  } catch (error) {
    console.error('Error in /addItem route:', error);
    res.status(500).json({ error: "Server error during file upload" });
  }
})

app.post('/editItem', upload.single('picture') , async (req,res)=>{
  try {
    if (req.file) {
      req.body.picture = req.file.path;
    }
    await setter.handleUpdateItem(req, res);
  } catch (error) {
    console.error('Error in /editItem route:', error);
    res.status(500).json({ error: "Server error during file upload" });
  }
})

app.post('/updateUser', upload.single('profilePicture'), async (req, res) => {
  try {
    if (req.file) {
      req.body.profilePicture = req.file.path;
    }
    await setter.handleUpdateUser(req, res);
  } catch (error) {
    console.error('Error in /updateUser route:', error);
    res.status(500).json({ error: "Server error during file upload" });
  }
});

app.post('/addUserSellingItem',async (req,res)=>{
  setter.handleAddSellingItem(req,res);
});

app.post('/deleteSellingItem', async (req,res)=>{
  setter.handleDeleteSellingItem(req,res);
});

app.post('/deleteShoppingItem', async (req,res)=>{
  setter.handleDeleteShoppingItem(req,res);
});

app.post('/addToCart', async (req,res)=>{
  setter.handleAddToCart(req,res);
});

app.post('/buyItem', async (req,res)=>{
  setter.handleBuyItem(req,res);
})


app.listen(process.env.PORT);
