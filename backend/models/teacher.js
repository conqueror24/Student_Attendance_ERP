// models/teacher.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Teacher = sequelize.define('Teacher', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'Teacher',
    },
});

// Define relationships
Teacher.associate = (models) => {
    Teacher.belongsTo(models.Admin, { foreignKey: 'school' });
    Teacher.belongsTo(models.Sclass, { foreignKey: 'teachSclass' });
    Teacher.belongsTo(models.Subject, { foreignKey: 'teachSubject' });
};

module.exports = Teacher;
