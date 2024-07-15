import express from 'express'
import path from 'path'
import userRoute from './routes/user.routes.js'
import db from './db.js'
import passport from 'passport'
const app= express()


const PORT= 8000

app.set('view engine', 'ejs')
app.set('views', path.resolve("./views") )
app.use(express.urlencoded({extended:false}))
//Now initialize the passport
app.use(passport.initialize())
//auth middleware
const localAuthMiddleware= passport.authenticate('local', {session:false})

app.get('/', (req, res)=>{
    res.render("home")
})


app.use("/user", userRoute)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
})