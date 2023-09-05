const utilities = require('../Utils/utility');
// const pool = require('../Database/db');
const sequelize = require('../Database/db');
const models = require('../models');

//Get Movies Running in theatres
async function getMoviesRunning(req, res) {
    // return movies;
    console.log("here");
    try {
        const result = await models.Movies.findAll();
        return result;
    } catch (err) {
        console.error('Error fetching Movies details', err);
        return res.response("Some error occured").code(401);
    }
}

async function getMovieDetails(req, res) {
    const {movieId} = req.params;
    try {
        const result = await models.Movies.findOne({
            where : {
                Id: movieId
            }
        });
        return res.response(result).code(200);
    } catch(err) {
        console.log(err);
        return res.response("some error occured fetching the details about the film", err);
    }
}

async function getshowDetails(req, res) {
    const {showId} = req.params;
    try {
        const result = await models.Shows.findOne({
            include:[{model : models.Theaters}, {model : models.Movies}],
            where : {
                Id : showId,
            }
        });
        return res.response(result).code(200);
    } catch(err) {
        console.log(err);
        return res.response("SomeThing happened").code(401);
    }
}

//Get showtimes provided the theater id and movie id.
async function getShowTimes(req, res) {
    const {theaterId, movieId} = req.params; //getting from the path params
    try {
        const flag = await utilities.checkForTheaterIdAndMovieId(theaterId, movieId);
        if(!flag) {
            return res.response("TheatreId or movieId not exists").code(404);
        }
        const result = await models.Shows.findAll({
            where :{
                MovieId : movieId,
                TheaterId : theaterId,
            }
        });
        console.log(result);
        return result;
    } catch(err) {
        console.log("Error occured fetching details ", err);
        throw err;
    }
}

//Adding new movie into the local store(DB).
async function addNewMovie (req, res) {
    const {Name, Description, Rating, ImageUrl} = req.payload;
    try {
        const ifMovieExist = await models.Movies.findAll({
            where : {
                Name : Name
            }
        });
        console.log(ifMovieExist);
        if(ifMovieExist.length != 0) {
            return res.response("Movie with same title is tried to put inside the DB").code(409);
        }
        //Inserting the movie.
        await models.Movies.create({
            Name : Name,
            Description : Description,
            Rating : Rating,
            Image : ImageUrl,
        });
        return res.response("Movie Details Updated").code(201);
    } catch(err) {
        console.log(err);
        return res.response("Cannot add the movie").code(400);
    }
}

async function addManyMovies(req, res) {
    const listOfMovies = req.payload;
    try {
        const existingMovies = await models.Movies.findAll({
            where: {
                Name: listOfMovies.map(movie => movie.title)
            }
        });
        if(existingMovies>0) {
            return res.response("Some movies are already present").code(409);
        }
        await models.Movies.bulkCreate(listOfMovies);
        return res.response("Added movies successfully").code(200);
    } catch(err) {
        console.log(err);
        return res.response("Cannot add movies").code(400);
    }
}

//Adding show Time into the local store for given movieId and theatreId.
async function addShowTimeForTheater(req, res) {
    const {theaterId, movieId} = req.params;
    const {startTime, seatsAvailable} = req.payload;
    try {
        const flag = await utilities.checkForTheaterIdAndMovieId(theaterId, movieId);
        if(!flag) {
            return res.response("TheatreId or movieId not exists").code(404);
        }
        //TODO: Add date check here.
        // if(isNaN(new Date(startTime).getTime())) {
        //     return res.response("Provide valid time").code(400);
        // }
        console.log(startTime);
        await models.Shows.create({
            MovieId : movieId,
            TheaterId : theaterId,
            showdate : startTime,
            TicketsAvailable : seatsAvailable,
        });
        return res.response("ShowTime Added Successfully").code(201);
    } catch(err) {
        console.log("Showtime cannot be added due to some error ",err);
    }
}

async function bookTicketsInTheaterForMovie(req, res) {
    const {theaterId, movieId} = req.params;
    const {showtimeReq, tickets} = req.payload;
    // if(isNaN(new Date(showtimeReq).getTime())) {
    //     return res.response("Provide valid time").code(400);
    // }
    //Checking if the movie exists
    const transaction = await sequelize.transaction();
    try {
        const flag = await utilities.checkForTheaterIdAndMovieId(theaterId, movieId);
        if(!flag) {
            return res.response("TheatreId or movieId not exists").code(404);
        }
        const result = await models.Shows.findAll({
            where : {
                MovieId : movieId,
                TheaterId : theaterId,
                showdate : showtimeReq
            }
        });
        if(result.length == 0) {
            return res.response('Requested show-time not available for the theater').code(404);
        }
        console.log(result);
        if(result[result.length-1].TicketsAvailable < tickets) {
            return res.response('Requested Seats not available').code(400);
        }
        const seatsAvailableAfterBooking = result[result.length-1].TicketsAvailable - tickets;
        await models.Shows.update(
            {
                TicketsAvailable : seatsAvailableAfterBooking
            },
            {
                where : 
                {
                    MovieId : movieId,
                    TheaterId : theaterId,
                    showdate : showtimeReq,
                },
                transaction
            },
        );
        await models.BookedTickets.create({
            UserId : 1,
            TheaterId : theaterId,
            MovieId : movieId,
            Tickets : tickets,
            ShowId : result[result.length-1].Id,
        },{
            transaction
        });
        await transaction.commit();
        return res.response("Booked Tickets").code(201);
    } catch(err) {
        await transaction.rollback();
        console.log("Error occured while booking tickets", err);
        return res.response("Some error occurred while booking tickets").code(400);
    }
}

async function getAllTheatersAlongWithShowTimes(req, res) {
    const { movieId } = req.params;
    try {
        const result = await models.Shows.findAll({
            include:[{model : models.Theaters}, {model : models.Movies}],
            where : {
                MovieId : movieId,    
            }
        });
        return res.response(result).code(201);
    } catch(err) {
        console.log(err);
        return res.response("Cannot fetch the details for the reuested movie.");
    }
}

module.exports = {getshowDetails, getMoviesRunning, getShowTimes,addNewMovie, addManyMovies, addShowTimeForTheater, bookTicketsInTheaterForMovie, getMovieDetails, getAllTheatersAlongWithShowTimes};