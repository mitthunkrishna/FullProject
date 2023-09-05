const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const Theaters = sequelize.define("Theaters", {
        Id : {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name : {
            type : Sequelize.DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
            }
        },
        City : {
            type : Sequelize.DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
            }
        },
        Address : {
            type : Sequelize.DataTypes.TEXT,
            allowNull : false,
            validate : {
                notEmpty : true,
            }
        },
    },
    {
        paranoid: true, // Enable soft deletion
        deletedAt: 'deletedAtColumn', // Customize the deletion timestamp column name
    });
    Theaters.associate = models => {
        Theaters.hasMany(models.Shows);
        Theaters.hasMany(models.User);
        Theaters.hasMany(models.BookedTickets);
    };
    return Theaters;
}