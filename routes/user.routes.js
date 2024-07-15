import express from 'express'
import {User} from '../models/user.models.js'
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
      return res.status(401).json({err:"Invalid email and Password"})
      else{
        return res.status(200).json({...user._doc, password:undefined, salt:undefined}) 
      }
  
    }catch(err){
        res.status(500).json({msg:"internal Server Error"})
    } 

    
    return res.redirect("/")
})





export default router