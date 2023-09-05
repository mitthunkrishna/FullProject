const { sequelize } = require('../models/index');

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync all models with the database
    await sequelize.sync({ force: true });

    console.log('Tables created and synchronized successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Unable to connect to the database or sync tables:', error);
    process.exit(1);
  }
};

init();