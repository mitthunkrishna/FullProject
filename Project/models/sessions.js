const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const sessions = sequelize.define("sessions", {
        Id : {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserId : {
            type: Sequelize.DataTypes.INTEGER,
            allowNull : false,
            validate : {
                notEmpty : true,
            }
        },
        token : {
            type : Sequelize.DataTypes.STRING,
            allowNull : true,
        },
    },
    {
        paranoid: true, // Enable soft deletion
        deletedAt: 'deletedAtColumn', // Customize the deletion timestamp column name
    });
    sessions.associate = models => {
        sessions.belongsTo(models.User, {
            foreignKey : 'UserId',
        });
    }
    return sessions;
};