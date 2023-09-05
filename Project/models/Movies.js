const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const Movies = sequelize.define("Movies", {
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
        Description : {
            type : Sequelize.DataTypes.TEXT,
            allowNull : false,
            validate : {
                notEmpty : true,
            }
        },
        Rating : {
            type : Sequelize.DataTypes.FLOAT,
            allowNull : true,
        },
        Image: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true, 
            },
        }
    },
    {
        paranoid: true, // Enable soft deletion
        deletedAt: 'deletedAtColumn', // Customize the deletion timestamp column name
    });

    Movies.associate = models => {
        Movies.hasMany(models.Shows);
        Movies.hasMany(models.Shows);
        Movies.hasMany(models.Shows);
    };

    return Movies;
}