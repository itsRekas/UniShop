import mongoose from 'mongoose';

console.log("Connecting to Database...");
await mongoose.connect(process.env.DATABASE);
console.log("Connected to Database");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    profilePicture: {type:String, required:false},
    school: { type: String, required: true },
    shopping: [{type: mongoose.Schema.Types.ObjectId, ref: 'Items'}],
    selling: [{type: mongoose.Schema.Types.ObjectId, ref: 'Items'}]
});

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    picture: { type: String, required: true },
    price: { type: Number, required: true },
    category: {type: String, required:true },
    description: { type: String, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required : true},
});

export const User = mongoose.model('Users', UserSchema);
export const Item = mongoose.model('Items', ItemSchema);
