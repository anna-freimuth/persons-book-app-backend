module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        f_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        l_name: {
            type: Sequelize.STRING,

        },
        age: {
            type: Sequelize.INTEGER,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
        },
        avatar: {
            type: Sequelize.STRING,
        }
    })
    return User
}
