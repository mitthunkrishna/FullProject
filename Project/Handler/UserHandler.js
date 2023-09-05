const sequelize = require('../Database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secretKey} = require('../Server/strategy');
const models = require('../models');
const saltRounds = 10;

async function registerUser(req, res) {
    const {Name, Phone, Email, username, password} = req.payload;
    try {
        const isEmailExist = await models.User.findOne({
            where :{
                Email : Email 
            }
        });
        if(isEmailExist) {
            return res.response({success: false, message :"Email already Exists "}).code(401);
        }
        const isUserNameUsed = await models.User.findOne({
            where : {
                username : username
            }
        });
        if(isUserNameUsed) {
            return res.response({success: false, message: "Already the username is in use. Please use something different"}).code(401);
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await models.User.create({
            Name : Name,
            Phone : Phone,
            Email : Email,
            username : username,
            password : hashedPassword,
            TypeOfUser : "registered",
        });
        return res.response({success: true, message: "Successfully registered."}).code(201);
    } catch(err) {
        console.log("Not able to register User ", err);
    }
}

async function loginUser(req, res) {
    const {username, password} = req.payload;
    try {
        const isUserNamePresent = await models.User.findOne({
            where : {
                username : username
            }
        });
        if(!isUserNamePresent) {
            return res.response({message: "Invalid username or password "}).code(401);
        }
        const passwordMatch =  bcrypt.compareSync(password, isUserNamePresent.password);

        if (!passwordMatch) {
            return res.response({ message: 'Invalid username or password.' }).code(401);
        }
        const token = jwt.sign({ userId: isUserNamePresent.Id, role: isUserNamePresent.TypeOfUser }, secretKey, { expiresIn: '1h' });
        const response = res.response({message : 'Successful Login'});
        await models.sessions.create({
            UserId : isUserNamePresent.Id,
            token : token,
        });
        response.state('jwtToken', token, { ttl: 60 * 60 * 1000 });
        return response.code(201);
    } catch(err) {
        console.log("Cannot login at the moment.", err);
        return res.response(err).code(401);
    }
}

async function logoutUser(req, res) {
    const token = req.state.jwtToken;
    try {
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;
        await models.sessions.destroy(
            {
                where : 
                {
                    UserId : userId,
                },
            },
        );
        return res.response("Successfully Logged out").code(200);
    } catch(err) {
        console.log(err);
        return res.response("Some Error occured ", err).code(401);
    }
}
async function getTicketBookedForUsers(req, res) {
    const token = req.state.jwtToken;
    try {
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;
        const tickets = await models.BookedTickets.findAll({
            include:[{model : models.Theaters}, {model : models.Movies}, {model : models.Shows}],
            where :{
                UserId : userId,
            }
        });
        // const tickets=await Users.findOne({
        //       include:[{model: bookedTickets}],
        // });
        console.log(tickets);
        return res.response({message :'success', data : tickets}).code(200);
    } catch(err) {
        console.log(err);
        return  res.response("Some Error occured in fetching the details", err).code(401);
    }
}

async function SignedInOrNot(req, res) {
    const state = req.state;
    if(Object.keys(state).length === 0) {
        return res.response({validate:false}).code(201);
    }
    const token = state.jwtToken

    if(token.length == 0) {
        return res.response({validate:false}).code(201);
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;
        const validSession = await models.sessions.findOne({
            where :{
                UserId : userId,
                token : token,
            }
        });
        if(!validSession) {
            return res.response({validate:false}).code(201);
        }
        return res.response({validate:true}).code(201);
    } catch(err) {
        console.log(err);
        return res.response("Some Error occured checking logged in or not").code(401);
    }
}

module.exports = {registerUser, loginUser, logoutUser, getTicketBookedForUsers, SignedInOrNot};