const db = require("../models");
const User = db.users;

exports.findAll = (req, res) => {
    User.findAll()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    User.findByPk(id)
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: "User not found with id = " + id
                })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving user with id=" + id
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id
    User.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({message: "User's info was successfully updated"})
            } else {
                res.send({
                    message: `Cannot update user's info with id=${id}.Maybe Todo was not found or req.body is empty`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating user's info with id=" + id
            })
        })

}

exports.delete = (req, res) => {
    const id = req.params.id
    User.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({message: "User was successfully deleted"})
            } else {
                res.send({
                    message: `Cannot delete user with id=${id}. Maybe user was not found.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error deleting user with id=" + id
            })
        })
}

