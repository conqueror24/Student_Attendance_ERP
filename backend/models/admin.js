const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Admin = sequelize.define('Admin', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'Admin',
  },
  schoolName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true, // Use Sequelize's automatic timestamps for createdAt and updatedAt
});

module.exports = Admin;
