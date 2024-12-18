// models/subject.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subject = sequelize.define('Subject', {
    subName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sessions: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Define relationships
Subject.associate = (models) => {
    Subject.belongsTo(models.Sclass, { foreignKey: 'sclassName' });
    Subject.belongsTo(models.Admin, { foreignKey: 'school' });
    Subject.belongsTo(models.Teacher, { foreignKey: 'teacher' });
};

module.exports = Subject;
