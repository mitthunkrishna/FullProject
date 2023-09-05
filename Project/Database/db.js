// const { Pool } = require('pg');

// const pool = new Pool({
//     user : 'mitthunkrishna',
//     host : 'localhost',
//     database : 'postgres',
//     password : '',
//     port : 5432
// });

// pool.on('connect', ()=>{
//     console.log('Connected to database');
// });

// module.exports = pool;

const { Sequelize } = require('sequelize');
const config = require('../config/config.json'); // Import the config JSON file

const environment = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[environment]);

module.exports = sequelize;
