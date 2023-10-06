import express from "express";
import ejs from "ejs";
import user from "../model/user";
import bcrypt from "bcrypt";
const saltRounds: number = 10;
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
        bcrypt.hash(
            req.body.password,
            saltRounds,
            async (err: any, hash: any) => {
                if(err){
                    throw new Error(err);
                }
                const newUser = new user({
                    email: req.body.username,
                    password: hash,
                });
                await newUser.save();
                res.render("secrets");
            }
        );
    } catch (error: any) {
        console.log(`cannot create new user ${error.message}`);
    }
});
route1.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const user1 = await user.findOne({ email: username });
        bcrypt.compare(
            req.body.password,
            user1.password,
            function (err: any, result: boolean) {
                if (result === true) {
                    res.render("secrets");
                }
                else{
                    console.log("incorrect password");
                    res.render("login");
                }
                if (err) {
                    throw new Error(err);
                }
            }
        );

    } catch (error: any) {
        console.log(`cannot fetch user :${error.message}`);
    }
});
route1.get("/logout", (req, res) => {
    res.render("home");
});
export default route1;
