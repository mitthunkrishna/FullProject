const sequelize = require('../Database/db');
const utilities = require('../Utils/utility');
const models = require('../models');

// Get Theatres available
async function getTheatresHandler(req, res) {
    // return theaters;
    try {
        const result = await models.Theaters.findAll();
        return result;
    } catch (err) {
        console.error('Error fetching theatre details', err);
        throw err;
    }
}

// Getting Movie details for a theatre given the Id for the theatre.
async function getMoviesDetailsFromTheatreIdHandler(req, res) {
    const theaterId = req.params.theaterId;  // getting from the path parameter
    try {
        const showtimesForTheater = await models.Shows.findAll({
            where : {
                TheaterId : theaterId,
            }
        });
        console.log(showtimesForTheater);
        console.log(showtimesForTheater.map((showtime) => showtime.MovieId));
        const movieIds = [...new Set(showtimesForTheater.map((showtime) => showtime.MovieId))]; // Getting movieIds and storing it in Hash-Set and putting the hashset in array.
        const movies = await models.Movies.findAll();
        const moviesInTheater = movies.filter((movie) => movieIds.includes(movie.Id));
        return moviesInTheater;
    } catch(err) {
        console.log("Can't fetch details ", err);
    }
}

async function addNewTheater(req, res) {
    const {Name, City, Address} = req.payload;
    try {
        const ifTheaterExist = await models.Theaters.findAll({
            where : {
                Name : Name
            }
        });
        // console.log(ifTheaterExist);
        if(ifTheaterExist.length != 0) {
            return res.response("Theater with same name is tried to put inside the DB").code(409);
        }
        await models.Theaters.create ({
            Name : Name,
            City : City,
            Address : Address,
        });
        return res.response("Theater Details Updated").code(201);
    } catch(err) {
        console.log("Can't insert the theater ", err);
    }
}


module.exports = {getTheatresHandler, getMoviesDetailsFromTheatreIdHandler, addNewTheater};