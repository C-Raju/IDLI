require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expresslayout = require('express-ejs-layouts')
const PORT= process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbstore = require('connect-mongo')
const passport = require('passport')

//Database connection
mongoose.Promise = global.Promise;
const connection = mongoose.Connection;
// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/idli', {
    useNewUrlParser: true,
    useUnifiedTopology:true,
}, 
 (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

 
//session store
//in progress later

//session config
app.use(session({
    secret: 'shekhar',
    resave: false,
    store: MongoDbstore.create({
        mongoUrl:'mongodb://localhost:27017/idli' 
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24  }
  }))

  // Passport config
 const passportInit = require('./app/config/passport')
 passportInit(passport)
 app.use(passport.initialize())
 app.use(passport.session())

app.use(flash());

// assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})
// set template engine
app.use(expresslayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app)

app.listen(PORT , () =>{
    console.log(`listening on port ${PORT}`)
})
