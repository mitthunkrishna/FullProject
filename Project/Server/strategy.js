const jwt = require('jsonwebtoken');
const sequelize = require('../Database/db');
const Users = require('../models/User')(sequelize);

const secretKey = 'password-should-be-32-characters';

const Validate = async (decoded, request, h) => {
    // console.log(JSON.stringify(artifact)+ " Mitthun\n");
    // console.log(request);
    // const userId = artifact.decoded.payload.userId;
    console.log("Mitthun");
    // console.log(artifact);
    console.log(request);
    // const something = request.Cookie.split('=')[1];
    const decoded1 = jwt.verify(request, secretKey);
    // console.log(something);
    console.log(decoded1);
    const user = await getUserById(decoded1.userId);
    if (!user) {
        return { isValid: false };
    }
    // if(user.TypeOfUser == decoded.payload.role) {
    //     return { isValid: true, credentials: {userId} };
    // }
    if(user.TypeOfUser == decoded1.role) {
        return { isValid: true, credentials: {user}};
    }
    return { isValid: false };
}

async function getUserById(userId) {
    const user = await Users.findOne({
        where : {
            Id : userId
        }
    });
    return user;
}

//User authentication strategy
const UserStrategy = {
    // scheme: 'jwt',
    // options: {
        // keys: secretKey, // Replace with your secret key
        // verify: {
        //     aud: false,
        //     iss: false,
        //     sub: false,
        //     // algorithms: ['HS256']
        // },
        // scheme: 'cookie',
        cookie: {
            name: 'jwtToken',
            password: secretKey, // Change this to a strong password
            isSecure: false, // Set to true in production to require HTTPS
            ttl: 24 * 60 * 60 * 1000, // Cookie expiration time (in milliseconds)
        },
        validate: Validate 
        // redirectTo: '/login'
    // }
};

// Admin authentication strategy
const adminStrategy = {
    // scheme: 'jwt',
    // options: {
        // keys: secretKey, // Replace with your secret key
        // verify: {
        //     aud: false,
        //     iss: false,
        //     sub: false,
        //     // algorithms: ['HS256']
        // },
        // validate: Validate // Use the validateAdmin function for validation
    // },
    // scheme: 'cookie',
    cookie: {
        name: 'adminJwtToken',
        password: secretKey, // Change this to a strong password
        isSecure: false, // Set to true in production to require HTTPS
        ttl: 24 * 60 * 60 * 1000 // Cookie expiration time (in milliseconds)
    },
    // redirectTo: '/login',
    validate: Validate 
}

const dumb = ()=>{return {authenticate:(request, reply) => 
    {
    // const token = request.cookieAuth;
    try{
    console.log("token");
    const result=true;
    // await models.session.findAll({where:{
    //   token:token
    // }});
    if (result) {
      return reply.authenticated({ credentials: {} });
    } else {
        return reply.unauthenticated();
    }}
    catch(err)
    {
        console.log(err);
        return reply.authenticated();

    }
  }}
}

module.exports = {UserStrategy, adminStrategy, secretKey, Validate};
