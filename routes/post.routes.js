const authJwt = require("../middleware/auth.jwt");

module.exports = (app) => {
    const posts = require("../controllers/post.controller");

    const router = require("express").Router();

    router.get("/", posts.findAll);

    router.get("/:id", posts.findOne);

    router.put("/:id", [authJwt.verifyToken], posts.update);

    router.delete(":id", [authJwt.verifyToken], posts.delete);

    router.post("/", [authJwt.verifyToken], posts.create);

    router.get("/person_id/:id", posts.findAllByPersonId);

    app.use("/api/posts", router);
}
