import express from 'express'
import {User} from '../models/user.models.js'
import {createTokenForUser, validateToken} from "../utils/authentication.js"

const router= express.Router()

router.get('/signin', (req, res)=>{
    return res.render("signin")
})

router.get('/signup', (req, res)=>{
    return res.render("signup")
})

router.post("/signup", async (req, res)=>{
    const {fullName, email, password}= req.body
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/")
})

router.post('/signin', async(req, res)=>{
    try{
        //Extract email and password from req.body
      const {email, password}= req.body;

      const user= await User.findOne({email:email})
      
      if(!user || !(await user.comparePassword(password))) 
      return res.render("signin",{
        error:"Incorrect Email or Password"
    })
      else{
        const token= createTokenForUser(user)
        return res.cookie('token', token).redirect("/")
      }
  
    }catch(err){
        res.status(500).json({msg:"internal Server Error"})
    } 

    
    return res.redirect("/")
})


router.get('/logout', (req, res)=>{
    res.clearCookie('token').redirect("/")
})


export default router