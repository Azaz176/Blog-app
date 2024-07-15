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
        this.salt= salt
        const hashedPassword= await bcrypt.hash(user.password,salt);
        user.password= hashedPassword
        next()
    } catch (error) {
        return next(error)
    }
    
})


//Compare login password with original password; extract salt from original and add it to login pass then hash it then compare it
userSchema.methods.comparePassword= async function(candidatePassword){
    try {
        //comapre the provided password with the orginal hashed+salt password
        const isMatch= await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (error) {
        throw error
    }
  }


    

export const User= mongoose.model('User', userSchema)