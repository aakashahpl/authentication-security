import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import mongoose from "mongoose";
import user from "./model/user";

passport.use(
    new GoogleStrategy.Strategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/secrets",
        },
        async function (accessToken, refreshToken, profile, cb) {
            try {
                console.log(profile);
                const tempUser = await user.findOne({ googleId: profile.id });
                if (!tempUser) {
                    const newUser = new user({ googleId: profile.id });
                    await newUser.save();
                    return cb(null, newUser);
                }
                return cb(null,tempUser);
            } catch (error: any) {
              console.log("error in the auth.ts file "+error.message);
              cb(error,null);
            }
        }
    )
);
