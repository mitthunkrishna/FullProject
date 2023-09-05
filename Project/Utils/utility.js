// const pool = require('../Database/db');
const sequelize = require('../Database/db');
const models = require('../models');
// const Movies = require('../models/Movies')(sequelize);
// const Theatres = require('../models/Theaters')(sequelize);

async function checkForTheaterIdAndMovieId(theaterId, movieId) {
    try {
        const Movie = await models.Movies.findAll({
            where : {
                Id : movieId
            }
        });
        console.log(Movie);
        const Theater = await models.Theaters.findAll({
            where : {
                Id : theaterId
            }
        });
        console.log(Theater);
        return Movie.length != 0 && Theater.length != 0;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {checkForTheaterIdAndMovieId};