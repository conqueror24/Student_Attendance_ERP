// models/student.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
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
        defaultValue: 'Student',
    },
});

// Define relationships
Student.associate = (models) => {
    Student.belongsTo(models.Admin, { foreignKey: 'school' });
    Student.belongsTo(models.Sclass, { foreignKey: 'sclassName' });
    Student.hasMany(models.ExamResult, { foreignKey: 'studentId' });
    Student.hasMany(models.Attendance, { foreignKey: 'studentId' });
};

module.exports = Student;
