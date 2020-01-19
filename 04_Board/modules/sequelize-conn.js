const Sequelize = require('sequelize'); // Object
const sequelize = new Sequelize({ // Instance
  host: "localhost",
  port: 3306,
  dialect: 'mysql',
  username: "root",
  password: "wkdtlgus",
  database: "node",
  pool: { max: 10, min: 0 }
});

// Immediately-invoked Function Expressions (IIFE)
(async () => (await sequelize.authenticate()))();

module.exports = {sequelize, Sequelize};
