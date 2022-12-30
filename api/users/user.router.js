const router = require("express").Router()
const {createUser,getUsers,getUserById,updateUser,deleteUser,getUserByEmail} = require("./user.controller")
const {checkToken}= require("../../auth/token_validation")

// login api
router.post("/login",getUserByEmail)

//create post api for user
router.post('/',checkToken,createUser)

// get all user details
router.get('/',checkToken,getUsers)

// get single users
router.get('/:id',checkToken,getUserById)

// update user data
router.patch('/',checkToken,updateUser)

// delete user
router.delete('/',checkToken,deleteUser)

module.exports=router