
module.exports = (sequelize, Sequelize) => {
    const Photo = sequelize.define("photo", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        album_id:  {
            type: Sequelize.INTEGER,
        },
        src: {
            type: Sequelize.STRING,
            allowNull: false
        },
        like: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        dislike: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    return Photo
}
