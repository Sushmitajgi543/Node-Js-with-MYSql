const express = require("express")
const morgan = require("morgan")
const createError = require("http-error")
require('dotenv').config()


const app = express()



app.get("/api", (req, res) => {
    res.json({
        message: "server connected ",
        status: "true",

    })
})



// port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server started");
})