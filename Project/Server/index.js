'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('../Route/routes');
const CookieAuth = require('hapi-auth-cookie');
const jwt = require('jsonwebtoken');
const Jwt = require('@hapi/jwt');
const Cookie = require('@hapi/cookie');
const basicAuth = require('hapi-auth-basic');
const {UserStrategy, adminStrategy, dumb, Validate, secretKey} = require('../Server/strategy');
const { registerUser } = require('../Handler/UserHandler');
// const Redis = require('ioredis');
const myRoute = require('../Route/routes');

const strategy = require('../Server/strategy').dumb;

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost',
        routes :{
            cors: {
                origin : ['*'],
            }
        }
    });

    // await server.register({
    //     plugin: CookieAuth,
    // });
    await server.register(Cookie);
    // await server.auth.strategy('admin', 'cookie', adminStrategy);
    server.auth.strategy('registered', 'cookie', UserStrategy);
    // server.auth.strategy('admin', 'cookie', adminStrategy);
    server.auth.default({
        strategy: 'registered',
        mode: 'try'
    });
    // server.auth.default('user');
    server.route(routes);

    // const redisClient = new Redis({
    //     host: '127.0.0.1', // Replace with your Redis server host
    //     port: 6379,        // Replace with your Redis server port
    // });
    // await server.register({ 
    //     plugin : require('ioredis'),
    //     options : redisClient,
    // });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();