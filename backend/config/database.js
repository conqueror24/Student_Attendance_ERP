const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',  // Fixed the issue here (removed the extra 'S' and space)
    username: 'root', // Use your MySQL username
    password: '12345', // Use your MySQL password
    database: 'school_db', // The database name
});

module.exports = sequelize;
