const authJwt = require("../middleware/auth.jwt");
module.exports = app => {
    const users = require("../controllers/user.controller")

    const router = require("express").Router()

    router.get("/",users.findAll)

    router.get("/:id", users.findOne)

    router.put("/:id",[authJwt.verifyToken], users.update)

    router.delete("/:id",[authJwt.verifyToken] ,users.delete)

    app.use("/api/users", router)
}

