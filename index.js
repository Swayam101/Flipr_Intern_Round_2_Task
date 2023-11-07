const express = require('express')

const bodyParser=require('body-parser')
require('dotenv').config()

const courseRouter=require('./routes/course')
const studentRouter=require('./routes/students')
const { default: mongoose } = require('mongoose')



const app = express()
const port = process.env.port || 3000 

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/course',courseRouter)
app.use('/student',studentRouter)

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected To DB");
    app.listen(port, () => console.log(`App Successfully Listening @ ${port}!`))
}).catch((err)=>{
    console.log(err);
    console.log("Unable To Connect With DB");
})
