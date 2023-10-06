import express from "express";
import ejs from "ejs";
import user from "../model/user";
const route1 = express.Router();

route1.get("/", (req, res) => {
    res.render("home.ejs");
});
route1.get("/login", (req, res) => {
    res.render("../views/login");
});
route1.get("/register", (req, res) => {
    res.render("../views/register");
});
route1.post("/register", async (req, res) => {
    try {
        const newUser = new user({
            email: req.body.username,
            password: req.body.password,
        });
        await newUser.save();
        res.render("secrets");
    } catch (error: any) {
        console.log(`cannot create new user ${error.message}`);
    }
});
route1.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user1 = await user.findOne({ email: username });
        if(user1.password!==password){
            console.log("incorrect password");
            res.render("login");
        }
        else{
            res.render("secrets");
        }
    } catch (error: any) {
        console.log(`cannot fetch user :${error.message}`);
    }
});
route1.get("/logout",(req,res)=>{
    res.render("home");
})
export default route1;