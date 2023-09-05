const handler = require('../Handler/Moviehandler');
const theaterHandler = require('../Handler/TheaterHandler');
const validators = require('../Utils/validations');
const UserHandler = require('../Handler/UserHandler');
const strategy = require('../Server/strategy');

const routes = [
    {
        method : 'GET',
        path : '/theatres',
        handler : theaterHandler.getTheatresHandler
    },
    {
        method : 'GET',
        path : '/movies',
        handler : handler.getMoviesRunning,
    },
    {
        method : 'GET',
        path : '/movies/{movieId}',
        handler : handler.getMovieDetails,
    },
    {
        method : 'GET',
        path : '/theaters/{theaterId}/movies',
        handler : theaterHandler.getMoviesDetailsFromTheatreIdHandler,
    },
    {
        method: 'GET',
        path : '/movie/{movieId}/FetchAllDetails',
        handler : handler.getAllTheatersAlongWithShowTimes,
    },
    {
        method : 'GET',
        path : '/theaters/{theaterId}/movies/{movieId}/showTimes',
        handler : handler.getShowTimes,
        options: {
            // auth: 'admin',
            validate : {
                params : validators.theaterMovieParamsSchema(),
                failAction: (req, res, err) =>{
                    throw err;
                }
            }
        }
    },
    {
        method : 'GET',
        path : '/shows/{showId}',
        handler : handler.getshowDetails,
    },
    {
        method : 'POST',
        path : '/newMovie',
        handler : handler.addNewMovie,
        options: {
            validate : {
                payload : validators.newMoviePayloadSchema(),
                failAction : (req, res, err) => {
                    throw err;
                }
            },
        },
    },
    {
        method : 'POST',
        path : '/addManyMovies',
        handler : handler.addManyMovies,
        options : {
            validate : {
                payload : validators.newBulkMoviePayloadSchema(),
                failAction :(req, res, err) => {
                    throw err;
                }
            },
        },
    },
    {
        method : 'POST',
        path : '/newTheater',
        handler : theaterHandler.addNewTheater,
        options : {
            validate : {
                payload : validators.theaterDetailsValidators(),
                failAction : (req, res, err) => {
                    throw err;
                }
            },
        },
    },
    {
        method : 'POST',
        path : '/theaters/{theaterId}/movies/{movieId}/addShows',
        handler : handler.addShowTimeForTheater,
        options: {
            validate : {
                params : validators.theaterMovieParamsSchema(),
                payload : validators.startTimeAndSeatsAvailablePayloadCheck(),
                failAction : (req, res, err) => {
                    throw err;
                }
                
            },
        },
    },
    {
        method : 'POST',
        path : '/theaters/{theaterId}/movies/{movieId}/book-ticket',
        handler : handler.bookTicketsInTheaterForMovie,
        options: {
            validate : {
                params : validators.theaterMovieParamsSchema(),
                payload : validators.movieShowTimeAndTicketsValidators(),
                failAction : (req, res, err) => {
                    throw err;
                }
            }
        }
    },
    {
        method : 'POST',
        path : '/register/User',
        handler : UserHandler.registerUser,
        options : {
            validate : {
                payload : validators.registerUserPayloadValidator(),
                failAction : (req, res, err) => {
                    throw err;
                }
            }
        }
        
    },
    {
        method : 'POST',
        path : '/login',
        handler : UserHandler.loginUser,
        options : {
            validate : {
                payload : validators.loginUserPayloadValidator(),
                failAction : (req, res, err) => {
                    throw err;
                }
            }
        }
    },
    {
        method : 'POST',
        path : '/logout',
        handler : UserHandler.logoutUser,
    },
    {
        method : 'GET',
        path : '/user/moviesBooked',
        handler : UserHandler.getTicketBookedForUsers,
    },
    {
        method : 'GET',
        path : '/SignedInOrNot',
        handler : UserHandler.SignedInOrNot,
    },
]
module.exports = routes;