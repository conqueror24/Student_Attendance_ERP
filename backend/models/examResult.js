// models/examResult.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Subject = require('./subject');
const Parent = require('./parent');

const ExamResult = sequelize.define('ExamResult', {
    marksObtained: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

// Define relationships
ExamResult.associate = (models) => {
    ExamResult.belongsTo(models.Parent, { foreignKey: 'studentId' });
    ExamResult.belongsTo(models.Subject, { foreignKey: 'subName' });
};

module.exports = ExamResult;
