const db = require("../models")
const config = require("../config/auth.config")
const User = db.users

let jwt = require("jsonwebtoken")
let bcrypt = require("bcryptjs")

const USERPASSWORDFAILED = "User  not found or invalid password"

exports.signup = (req, res) => {
    User.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(401).send({message: USERPASSWORDFAILED, accessToken: null})
            }
            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            )
            if (!passwordIsValid) {
                return res.status(401).send({message: USERPASSWORDFAILED, accessToken: null})
            }
            let token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 //24h
            })
            res.status(200).send({
                id: user.id,
                email: user.email,
                accessToken: token
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}
