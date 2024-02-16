import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { USERNAME_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../utils/config";
import IUser from "../interfaces/IUser";

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: USERNAME_MAX_LENGTH,
        validate(value: string): boolean {
            return validator.isAlphanumeric(value);
        }
    },
    password: {
        type: String,
        required: true,
        minlength: PASSWORD_MIN_LENGTH,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.methods.createToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET || "secret");

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async(username: string, password: string) => {
    const user = await User.findOne({ username });

    if(!user) {
        console.log(`${username} couldn't log in because there wasn't a user with that username`)

        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        console.log(`${username} couldn't log in because the password they introduced was incorrect`);

        return null;
    }

    return user;
}

// Hashes the password
userSchema.pre("save", async function(next) {
    const user = this;

    if(user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model("User", userSchema);

export default User;