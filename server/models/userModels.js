import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.schema({
    name: String,
    email: String,
    password: {
        type: String,
        minLength: [8, "password must have at least 8 character."],
        maxLength: [32, "password cannot have more than 32 character."],

    },
    phone: String,
    accountVerified: {type: boolean, default: false},
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt:{
        type: Date,
        default: Date.now,
    },
})

userSchema.pre("save", async function (next){
    if (!this.isModified("password")){
        next();
    }
});