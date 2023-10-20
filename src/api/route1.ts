import express from "express";
import ejs from "ejs";
import user from "../model/user";
import passport from "passport";


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
route1.get("/secrets", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.render("login");
    }
});



route1.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);
route1.get('/auth/google/secrets',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) =>{
    // Successful authentication, redirect secrets.
    res.redirect('/secrets');
});



route1.post("/register", async (req, res) => {
    try {
        await user.register({ username: req.body.username }, req.body.password);
        passport.authenticate("local")(req, res, () => {
            res.redirect("/secrets");
        });
    } catch (error) {
        console.log(`unable to register user : ${error.message}`);
        res.redirect("/register");
    }
});
route1.post("/login", async (req, res) => {
    try {
        const userVariable = new user({
            username: req.body.username,
            password: req.body.password,
        });
        req.login(userVariable, (err) => {
            if (!err) {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/secrets");
                });
            }
        });
    } catch (error: any) {
        console.log(`unable to login : ${error.message}`);
    }
});
route1.get("/logout", (req, res) => {
    req.logout((err)=>{
        console.log(err);
    });
    res.redirect("/");
});
export default route1;
