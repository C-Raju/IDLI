const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expresslayout = require('express-ejs-layouts')
const res = require('express/lib/response')
const PORT= process.env.PORT || 3000
// assets
app.use(express.static('public'))

app.get('/' , (req,res) =>{
    res.render('home')
})
// set template engine
app.use(expresslayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine','ejs')

app.listen(PORT , () =>{
    console.log(`listening on port ${PORT}`)
})
