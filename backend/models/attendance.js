// models/attendance.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Subject = require('./subject');
const Parent = require('./parent');

const Attendance = sequelize.define('Attendance', {
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Present', 'Absent'),
        allowNull: false,
    },
});

// Define relationships
Attendance.associate = (models) => {
    Attendance.belongsTo(models.Parent, { foreignKey: 'studentId' });
    Attendance.belongsTo(models.Subject, { foreignKey: 'subName' });
};

module.exports = Attendance;
