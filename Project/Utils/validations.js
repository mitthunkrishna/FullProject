const Joi = require('joi');

function theaterMovieParamsSchema() {
    return Joi.object({
        theaterId: Joi.number().integer().min(1).required(),
        movieId: Joi.number().integer().min(1).required(),  
    });
}

function newMoviePayloadSchema() { 
    return Joi.object({
        Name : Joi.string().max(20).required(),
        Description : Joi.string().max(50).required(),
        Rating : Joi.number().precision(1),
        ImageUrl : Joi.string().uri().required(),
    });
}

function startTimeAndSeatsAvailablePayloadCheck() {
    return Joi.object({
        startTime : Joi.date().iso().required(),
        seatsAvailable : Joi.number().integer().min(1).required(),
    });
}

function movieShowTimeAndTicketsValidators() { 
    return Joi.object({
        showtimeReq : Joi.date().iso().required(),
        tickets : Joi.number().integer().required(),
    });
}

function theaterDetailsValidators() {
    return Joi.object({
        Name : Joi.string().min(1).max(20).required(),
        City : Joi.string().min(1).max(20).required(),
        Address : Joi.string().min(1).max(50).required(),
    });
}
function registerUserPayloadValidator() {
    return Joi.object({
        Name : Joi.string().min(3).max(20).required(),
        Phone : Joi.string().pattern(/^[0-9]{10}$/).required(),
        Email : Joi.string().email().required(),
        username : Joi.string().alphanum().min(3).max(20).required(),
        password : Joi.string().min(8).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });
}

function loginUserPayloadValidator() {
    return Joi.object({
        username : Joi.string().alphanum().min(3).max(20).required(),
        password : Joi.string().min(8).max(40).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    })
}

function newBulkMoviePayloadSchema() {
    return Joi.array().items(Joi.object({
        Name : Joi.string().max(20).required(),
        Description : Joi.string().max(50).required(),
        Rating : Joi.number().precision(1),
    }));
}

module.exports = {
    theaterMovieParamsSchema,
    newMoviePayloadSchema,
    startTimeAndSeatsAvailablePayloadCheck,
    movieShowTimeAndTicketsValidators,
    theaterDetailsValidators,
    registerUserPayloadValidator,
    loginUserPayloadValidator,
    newBulkMoviePayloadSchema,
};