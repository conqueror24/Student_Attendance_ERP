// models/complain.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./parent');
const Admin = require('./admin');

const Complain = sequelize.define('Complain', {
    complaint: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

// Define relationships
Complain.associate = (models) => {
    Complain.belongsTo(models.Student, { foreignKey: 'user' });
    Complain.belongsTo(models.Admin, { foreignKey: 'school' });
};

module.exports = Complain;
