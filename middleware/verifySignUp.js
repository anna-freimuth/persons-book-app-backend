const db = require("../models")
const User = db.users

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed, email is already in use."
            })
            return null
        }
        next()
    })

}

const verifySignUp = {
    checkDuplicateEmail
}

module.exports = verifySignUp
