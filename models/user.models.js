import mongoose from "mongoose";
const userSchema= new mongoose.Schema({

    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImageURL:{
        type:String,
        default:'/images/default.png',
    },
    role:{
        type:String,
        enum:['USER', 'ADMIN'],
        default:"USER"
    }
}, {timestamps:true})

export const User= mongoose.model('User', userSchema)