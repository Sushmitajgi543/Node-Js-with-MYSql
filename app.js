const express = require("express")
const morgan = require("morgan")
const createError = require("http-error")
const userRouter = require('./api/users/user.router')
require('dotenv').config()


const app = express()

app.use(express.json())  //convert json abject into javascript object

app.use("/api/users",userRouter);



// port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server started");
})