module.exports = (sequelize, Sequelize) => {
    const Album = sequelize.define('album', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        person_id:  {
            type: Sequelize.INTEGER,
        },

    });

    return Album
}
