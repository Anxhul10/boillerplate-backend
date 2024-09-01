import mongoose  from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,
        required:true
    },
    coverImage:{
        type:String
    },
    // watch history is dependent on videos
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true, "password is  required"]
    },
    refreshToken:{
        type:String
    }
},{
    timestamps:true
})
// this logic encrypt the password
/*
userSchema.pre middleware it runs before the save operation is performed 
async function is called
*/
userSchema.pre("save",async function(next){
    if(!this.isModified(this.password)) return next();// if password has not been modified then it calls the next 
    this.password = bcrypt.hash(this.password, 10);// if not then password is encrypted with salt round of 10
    next();
})

// checking he password is correct or not
userSchema.method.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// setting up the access tokes jwt
userSchema.method.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            username:this.username,
            fullname:this.fullname,
            email:this.email
        },
        process.env.ACESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACESS_TOKEN_EXPIRY
        }

    )
}
// setting up the refresh tokens
userSchema.method.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKE_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema);