const db = require("../models");
const Post = db.posts;

exports.create = (req, res) => {
    Post.create({
        ...req.body,
    })
        .then((post) => {
            res.send(post);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            });
        });
};

exports.findAll = (req, res) => {
    Post.findAll()
        .then((data) => res.send(data))
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving posts",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Post.findByPk(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Post with id=${id} not found`,
                });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error retrieving Post with id = " + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Post.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                Post.findByPk(id)
                    .then((data) => {
                        if (!data) {
                            res.status(404).send({
                                message: `Post with id=${id} not found`,
                            });
                        }
                        res.send(data);
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: err.message || "Error retrieving Post with id = " + id,
                        });
                    });
            } else {
                res.status(404).send({
                    message: `Cannot update Post info with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error updating Post info with id = " + id,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Post.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({ message: "Post was successfully deleted" });
            } else {
                res.send({
                    message: `Cannot delete Post with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error deleting Post with id = " + id,
            });
        });
};

exports.findAllByPersonId = (req, res) => {
    const personId = req.params.id;

    Post.findAll({ where: { person_id: personId } })
        .then((data) => res.send(data))
        .catch((err) => {
            res
                .status(500)
                .send({ message: err.message || "Some error occurred while searching" });
        });
};
