import {User,Item} from './db.mjs';
import sanitize from 'mongo-sanitize';
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const handleAddItem = async (req,res) =>{
    const {name, price, description, userId, category, picture} = req.body;
    if (!name || !price || !description || !userId || !category || !picture) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try{
        const item = await Item.create({
            name: sanitize(name),
            picture: sanitize(picture),
            price:sanitize(price),
            description: sanitize(description),
            user: sanitize(userId),
            category: sanitize(category),
        });
        res.status(200).json(item);
    }
    catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ error: "Server error" });
    }
    
}

export const handleUpdateItem = async (req, res) => {
    try {
        const existingItem = await Item.findById(req.body.itemId);
        if (!existingItem) {
            return res.status(404).json({ error: "Item not found" });
        }

        if (existingItem.picture) {
            const oldPicturePath = path.join(__dirname, existingItem.picture);
            fs.unlink(oldPicturePath, (err) => {
                if (err) console.error(`Error deleting file: ${oldPicturePath}`, err);
                else console.log(`Old picture deleted: ${oldPicturePath}`);
            });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            req.body.itemId,
            {
                name: req.body.name,
                picture: req.body.picture,
                price: req.body.price,
                description: req.body.description
            },
            { new: true }
        ).populate('user');

        res.status(200).json({ item: updatedItem });
    } catch (error) {
        res.status(500).json({ error: `Error in server: ${error}` });
    }
};

export const handleUpdateUser = async (req, res) => {
    const { userId, firstname, lastname, email, location, school, profilePicture } = req.body;
    if (!userId || !firstname || !lastname || !email || !location || !school) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if (profilePicture && existingUser.profilePicture) {
            const oldPicturePath = path.join(__dirname, existingUser.profilePicture);
            fs.unlink(oldPicturePath, (err) => {
                if (err) {
                    console.error(`Error deleting old profile picture: ${oldPicturePath}`, err);
                }
            });
        }

        let updateData = { firstname, lastname, email, location, school };
        if (profilePicture) {
            updateData.profilePicture = profilePicture;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const handleAddSellingItem = async (req,res)=>{
    const {userId,itemId} = req.body;
    try{
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { selling: itemId } },
            {new:true}
        ).populate('selling');
        if(!updatedUser)return res.status(404).json({ error: "User not found" });
        res.status(200).json({sellingItems: updatedUser.selling});
    }
    catch(error){
        res.status(500).json({error: `server error: ${error}`});
    }
}

export const handleDeleteSellingItem = async (req,res)=>{
    try{
    const user = await User.findById(req.body.userId);
    if(!user)return res.status(404).json({error: "User not found!"});
        const itemId = user.selling[req.body.index];
        const updatedList = user.selling.filter((item,index)=>{
            return index!==req.body.index;
        });
        const updatedUser = await User.findByIdAndUpdate(
            req.body.userId,
            {selling: updatedList},
            {new:true}
        ).populate('selling');
        res.status(200).send(updatedUser.selling);

        const delitem = await Item.findById(itemId);
        if (delitem && delitem.picture) {
            const filePath = path.join(__dirname, delitem.picture);
            fs.unlink(filePath, (err) => {
                if (err) console.error(`Error deleting file: ${filePath}`, err);
            });
        }

        await Item.findByIdAndDelete(itemId);



        const users = await User.find({});
        users.forEach(async (user) => {
            const updatedList = user.shopping.filter((item) => {
                return item.toString() !== itemId.toString();
            });
            await User.findByIdAndUpdate(
                user._id,
                { shopping: updatedList },
                { new: true }
            );
        });
    }
    catch(error){
        res.status(500).json({error: `Error in server: ${error}`});
    }
}

export const handleDeleteShoppingItem = async (req,res)=>{
    try{
        const user = await User.findById(req.body.userId);
        if(!user)return res.status(404).json({error: "User not found!"});
            const updatedList = user.shopping.filter((item)=>{
                return item!=req.body.itemId;
            });
            
            const updatedUser = await User.findByIdAndUpdate(
                req.body.userId,
                {shopping: updatedList},
                {new:true}
            ).populate('shopping');
            res.status(200).send(updatedUser.shopping);
        }
    catch(error){
        res.status(500).json({error: `Error in server: ${error}`});
    }
}

export const handleAddToCart = async (req,res)=>{
    try{
        const user = await User.findById(req.body.userId);
        if (user.selling.includes(req.body.itemId)) {
            return res.status(400).json({ error: "Item exists in selling cart" });
        }
        if (user.shopping.includes(req.body.itemId)) {
            return res.status(400).json({ error: "Item exists in shopping cart already" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.body.userId,
            {$push: {shopping: req.body.itemId}},
            {new:true}
        ).populate('shopping');

        res.status(200).json({ user: updatedUser });
    }
    catch(error){
        res.status(500).json({error: `Error in server: ${error}`});
    }
}

export const handleBuyItem = async (req, res) => {
    try {
        const buyer = await User.findById(req.body.userId);
        if (!buyer) return res.status(404).json({error: "Buyer not found!"});

        const item = await Item.findById(req.body.itemId);
        if (!item) return res.status(404).json({error: "Item not found!"});

        const seller = await User.findById(item.user);
        if (!seller) return res.status(404).json({error: "Seller not found!"});
        let updatedSellerSelling = seller.selling.filter(sellingItem => 
            sellingItem.toString() !== item._id.toString()
        );
        await User.findByIdAndUpdate(
            item.user,
            {shopping: updatedSellerSelling},
            {new:true}
        );
        
        const users = await User.find({});
        users.forEach(async (user)=> {
            let updatedList = user.shopping.filter(shoppingItem => 
                shoppingItem.toString() !== item._id.toString()
            );
            await User.findByIdAndUpdate(
                user._id,
                {shopping: updatedList},
                {new:true}
            );
        });
        
        if (item.picture) {
            const filePath = path.join(__dirname, item.picture);
            fs.unlink(filePath, (err) => {
                if (err) console.error(`Error deleting file: ${filePath}`, err);
            });
        }
        
        await Item.findByIdAndDelete(req.body.itemId);

        res.status(200).json({success: "Item purchased successfully"});
    } catch (error) {
        res.status(500).json({error: `Error in server: ${error}`});
    }
};