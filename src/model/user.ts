import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
dotenv.config();

const userSchema = new mongoose.Schema({
    googleId: String,
    email: String,
    password: String,
});
userSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model("user", userSchema);
passport.use(userModel.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = userModel.findById(id);
        done(null, user);
    } catch (error: any) {
        console.log("error in the user.ts file " + error.message);
    }
});

export default userModel;
