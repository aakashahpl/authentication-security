import express from "express";
import bodyParser from "body-parser";
import connectToDB from "./db";
import ejs from "ejs";
import route1 from "./api/route1";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
const app = express();


app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:"secret string",
    resave : false,
    saveUninitialized : false 
}));
app.use(passport.initialize());
app.use(passport.session());


app.use("/",route1);

connectToDB();
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is running on Port ${PORT}`);
})