const mysql = require("mysql")
// const {createPool} = require ("mysql")
// const pool = createPool({})
require('dotenv').config()

const Pool = mysql.createPool({
    port: process.env.DB_PORT, //default value is 3306
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.MYSQL_DB,
    connectionLimit: 10,  //no.of conncetion we can create

})

module.exports = Pool;