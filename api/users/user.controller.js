const { create, getUsers, update, deleteUser, getUserById, getUserByEmail } = require('./user.service')
// compare : compare the password
const { genSaltSync, hashSync ,compare} = require("bcrypt")
//sign will create json web token , it takes three parameter
//(object which we want to sign and we want to create json web token, key:encrpyting key, optional parameter  )
const { sign } = require('jsonwebtoken');
require('dotenv').config()


module.exports = {


    // login controller
    getUserByEmail: (req, res) => {
        const body = req.body;

        getUserByEmail(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    status: 0,
                    message: "invalid credentials"
                })
            }
            const result = compare(body.password, results.password)
            if (result) {
                results.password = undefined
                const jsonToken = sign({ resul: results }, process.env.SECRET_KEY, { expiresIn: "1h" });
                return res.status(200).json({
                    status: 1,
                    data: results,
                    message: "user login successfully",
                    token: jsonToken
                })
            }
            else {
                res.json({
                    success: 0,
                    message: "invalid email or password"
                })
            }


        })
    },

    // create user after resgistration
    createUser: (req, res) => {
        const body = req.body; //what ever user will pass ,save inside body
        //encrypting password{}
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        // }
        create(body, (err, results) => {
            if (err) {
                console.log("error occur", err)
                return res.status(500).json({
                    success: 0,
                    message: "database connection error"
                });
            }
            return res.status(200).json({
                status: 1,
                data: results,
                message: "user created successfully"
            })
        })
    },

    // get all users
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                res.json({
                    status: 0,
                    message: "No record Found"
                })
            }
            return res.status(200).json({
                status: 1,
                data: results,
                message: "Users data "
            })
        })
    },

    // get single users
    getUserById: (req, res) => {
        const id = req.params.id;

        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                res.json({
                    status: 0,
                    message: "no data found"
                })
            }
            return res.status(200).json({
                status: 1,
                data: results,
                message: "user data found"
            })
        })
    },

    // update user details
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        update(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                status: 1,
                data: results,
                message: "user data updated successfully"
            })
        })
    },

    // delete user
    deleteUser: (req, res) => {
        const body = req.body;

        deleteUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                status: 1,
                data: results,
                message: "user deleted successfully",
            })
        })
    }

}