import mongoose from "mongoose"
import encrypt from "mongoose-encryption";
import dotenv from "dotenv"
dotenv.config();

const userSchema = new mongoose.Schema({
    email : String,
    password : String
});

const secret = process.env.SECRET_KEY;
userSchema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});

const userModel = mongoose.model("user",userSchema);

export default userModel;


