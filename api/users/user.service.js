const pool = require("../../Config/db")


module.exports = {

    //  login user
    getUserByEmail: (body, callback) => {
        pool.query(`select * from registration where email=?`, [body.email],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results[0])
            }
        )
    },

    // method create to user which recv data and callback from controller
    create: (data, callback) => {
        pool.query(
            `insert into registration(first_name,last_name,gender,email,password) values(?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
            ],
            // callback method
            (error, results, fields) => {
                if (error) {
                    return callback(error)

                }
                return callback(null, results)

            }
        )
    },

    // select all users
    getUsers: callback => {
        pool.query(`select id, first_name,last_name,gender,email from registration`, [],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results)
            })
    },

    // select single user
    getUserById: (id, callback) => {
        console.log(id);
        pool.query(`select id, first_name,last_name,gender,email from registration where id=?`, [id],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results[0])
            })
    },

    // update users
    update: (data, callback) => {
        pool.query(
            `update  registration set first_name =?,last_name=?,gender=?,email=?,password=? where id=?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.id
            ],
            // callback method
            (error, results, fields) => {
                if (error) {
                    return callback(error)

                }
                return callback(null, results[0])

            }
        )
    },

    // delete single user
    deleteUser: (body, callback) => {
        pool.query(`delete  from registration where id=?`, [body.id],
            (err, results, field) => {
                if (err)
                    return callback(err)
                return callback(null, results[0])
            })
    },



}
