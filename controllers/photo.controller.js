const db = require('../models');
const Photo = db.photos;

exports.create = (req, res) => {
    Photo.create({
        ...req.body
    })
        .then(photo => {
            res.send(photo)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}


exports.findAll = (req, res) => {
    Photo.findAll()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving photos'
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Photo.findByPk(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Photo with id=${id} not found`
                })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Photo with id = " + id
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id
    Photo.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                Photo.findByPk(id)
                    .then(data => {
                        if(!data) {
                            res.status(404).send({
                                message: `Photo with id=${id} not found`
                            })
                        }
                        res.send(data)
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Error retrieving Photo with id = " + id
                        })
                    })
            } else {
                res.status(404).send({
                    message: `Cannot update Photo info with id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Photo info with id = " + id
            })
        })
}

exports.delete= (req, res) => {
    const id = req.params.id
    Photo.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({message: "Photo was successfully deleted"})
            } else {
                res.send({
                    message: `Cannot delete Photo with id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error deleting Photo with id = " + id
            })
        })
}

exports.findAllByAlbumId = (req, res) => {
    const albumId = req.params.id;

    Photo.findAll({ where: { album_id: albumId } })
        .then((data) => res.send(data))
        .catch((err) => {
            res
                .status(500)
                .send({ message: err.message || "Some error occurred while searching" });
        });
};
