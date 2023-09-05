const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const Shows = sequelize.define("Shows", {
        Id : {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        showdate : {
            type : Sequelize.DataTypes.DATE,
            allowNull : true,
        },
        TicketsAvailable : {
            type : Sequelize.DataTypes.INTEGER,
            allowNull : false,
            validate : {
                notEmpty : true,
            }
        }
    },
    {
        paranoid: true, // Enable soft deletion
        deletedAt: 'deletedAtColumn', // Customize the deletion timestamp column name
    });
    Shows.associate = models => {
        Shows.belongsTo(models.Movies, {
            foreignKey: 'MovieId'
        });
        Shows.belongsTo(models.Theaters, {
            foreignKey: 'TheaterId'
        });
        Shows.hasMany(models.BookedTickets, {
            foreignKey : {
                allowNull: true, // Make the foreign key nullable
            }
        });
    };
    return Shows;
}