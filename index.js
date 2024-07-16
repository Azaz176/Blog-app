import express from 'express'
import path from 'path'
import {Blog} from './models/blog.models.js'
import userRoute from './routes/user.routes.js'
import blogRoute from './routes/blog.routes.js'
import db from './db.js'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import checkForAuthenticationCookie from './middleware/auth.middleware.js'
const app= express()


const PORT= 8000

app.set('view engine', 'ejs')
app.set('views', path.resolve("./views") )
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
//Now initialize the passport
app.use(passport.initialize())
//auth middleware
const localAuthMiddleware= passport.authenticate('local', {session:false})
app.use(express.static(path.resolve('./public')))

app.get('/', async(req, res) => {
    const allBlogs= await Blog.find({})
    //console.log('User in homepage route:', req.user);
    res.render("home", {
        user: req.user,
        blogs:allBlogs
    })
})



app.use("/user", userRoute)
app.use('/blog', blogRoute)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
})