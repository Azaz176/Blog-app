import mongoose from "mongoose";
import bcrypt from 'bcrypt'
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


userSchema.pre('save', async function(next){
    const user= this;
    if(!user.isModified('password')) return next()

    try {
            //hash password generation
        const salt= await bcrypt.genSalt(8)
            // hash password
        const hashedPassword= await bcrypt.hash(user.password,salt);
        user.password= hashedPassword
        next()
    } catch (error) {
        return next(error)
    }
    
})

export const User= mongoose.model('User', userSchema)