const config = require("../config/db.config")
const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        port: config.PORT,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require("./user.model")(sequelize, Sequelize)
db.albums = require("./album.model")(sequelize, Sequelize);
db.photos = require("./photo.model")(sequelize, Sequelize);
db.posts = require("./post.model")(sequelize, Sequelize);

module.exports = db
