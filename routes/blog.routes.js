import express from 'express'
import {Blog} from '../models/blog.models.js'
import multer from 'multer'
import path from 'path'
const router= express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const fileName= `${Date.now()}- ${file.originalname}`
      cb(null, fileName)
    }
  })
  
  const upload = multer({ storage: storage })


router.get('/add-new', (req, res)=>{
    return res.render('addBlog', {
        user:req.user,
    })
})

router.post('/', upload.single('coverImage'), async(req, res)=>{
    const {title, content}= req.body
    const blog=await Blog.create({
        content,
        title,
        createdBy:req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
})
export default router