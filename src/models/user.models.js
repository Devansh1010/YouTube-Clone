import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    avtar: {
        type: String,
        default: ""
    },
    coverImage: {
        type: String,
        default: ""
    },
    refreshToken: {
        type: String,
        default: ""
    },
}, {timestamps: true});

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function() {
    return jwt.sign(
        {
            id: this._id
        },
        process.env.ACCESS_TOKEN_SERECT,
        {
            expiresIn: "1d"
        });
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            id: this._id
        },
        process.env.REFRESH_TOKEN, 
        {
            expiresIn: "7d"
        });
}
export const User =  mongoose.model("User", userSchema);