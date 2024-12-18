// models/parent.js (Student converted to Parent)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sclass = require('./sclass');
const Admin = require('./admin');
const Subject = require('./subject');

const Parent = sequelize.define('Parent', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rollNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'Parent',
    },
});

// Define relationships
Parent.associate = (models) => {
    Parent.belongsTo(models.Admin, { foreignKey: 'school' });
    Parent.belongsTo(models.Sclass, { foreignKey: 'sclassName' });
    Parent.hasMany(models.ExamResult, { foreignKey: 'studentId' });
    Parent.hasMany(models.Attendance, { foreignKey: 'studentId' });
    Parent.belongsToMany(models.Subject, { through: 'StudentSubjects' });
};

module.exports = Parent;
