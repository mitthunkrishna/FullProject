const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const BookedTickets = sequelize.define("BookedTickets", {
        Id : {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserId : {
            type: Sequelize.DataTypes.INTEGER,
            allowNull : true,
        },
        MovieId : {
            type : Sequelize.DataTypes.INTEGER,
            allowNull : false,
            validate : {
                notEmpty : true,
            }
        },
        TheaterId : {
            type : Sequelize.DataTypes.INTEGER,
            allowNull : false,
            validate : {
                notEmpty : true,
            }
        },
        Tickets : {
            type : Sequelize.DataTypes.INTEGER,
            allowNull : false,
            validate : {
                notEmpty : true,
            }
        },
        ShowId : {
            type : Sequelize.DataTypes.INTEGER,
            allowNull : true,
        }
    },
    {
        paranoid: true, // Enable soft deletion
        deletedAt: 'deletedAtColumn', // Customize the deletion timestamp column name
    });
    BookedTickets.associate = models => {
        BookedTickets.belongsTo(models.Shows, {
            foreignKey : 'ShowId',
        });
        BookedTickets.belongsTo(models.Movies, {
            foreignKey : 'MovieId'
        });
        BookedTickets.belongsTo(models.Theaters, {
            foreignKey : 'TheaterId',
        });
        BookedTickets.belongsTo(models.User, {
            foreignKey : 'UserId',
    })
    };
    return BookedTickets;
}