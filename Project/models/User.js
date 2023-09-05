const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const User = sequelize.define("User", {
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
        Phone : {
            type : Sequelize.DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
            }
        },
        Email : {
            type : Sequelize.DataTypes.STRING,
            allowNull : false,
            unique : true,
        },
        username : {
            type : Sequelize.DataTypes.STRING,
            allowNull : true,
            unique : true,
        },
        password : {
            type : Sequelize.DataTypes.STRING,
            allowNull : true,
        },
        TypeOfUser : {
            type: Sequelize.DataTypes.ENUM("guest", "registered", "admin"),
            allowNull: false,
            defaultValue: "guest",
        },
        TheaterId : {
            type: Sequelize.DataTypes.INTEGER,
            allowNull : true,
        },

    },
    {
        paranoid: true, // Enable soft deletion
        deletedAt: 'deletedAtColumn', // Customize the deletion timestamp column name
    });
    User.associate = models => {
        User.hasMany(models.BookedTickets,{
            foreignKey:'UserId',
        });
        User.belongsTo(models.Theaters, {
            foreignKey : 'TheaterId'
        });
        User.hasMany(models.sessions);
    }
    return User;
}