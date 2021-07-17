const authJwt = require("../middleware/auth.jwt");

module.exports = (app) => {
    const albums = require("../controllers/album.controller");

    const router = require("express").Router();

    router.get("/", albums.findAll);

    router.get("/:id", albums.findOne);

    router.put("/:id", [authJwt.verifyToken], albums.update);

    router.delete(":id", [authJwt.verifyToken], albums.delete);

    router.post("/", [authJwt.verifyToken], albums.create);

    router.get("/person_id/:id", albums.findAllByPersonId);

    app.use("/api/albums", router);
}
