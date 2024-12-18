// models/notice.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Admin = require('./admin');

const Notice = sequelize.define('Notice', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    details: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

// Define relationships
Notice.associate = (models) => {
    Notice.belongsTo(models.Admin, { foreignKey: 'school' });
};

module.exports = Notice;
