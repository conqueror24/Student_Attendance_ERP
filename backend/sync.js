// sync.js
const sequelize = require('./config/database');
const Admin = require('./models/admin');
const Parent = require('./models/parent');
const Sclass = require('./models/sclass');
const Subject = require('./models/subject');
const Teacher = require('./models/teacher');
const ExamResult = require('./models/examResult');
const Attendance = require('./models/attendance');
const Notice = require('./models/notice');
const Complain = require('./models/complain');

// Sync the models with the database
sequelize.sync({ force: false })  // Set `force: true` to drop and recreate tables on each startup
    .then(() => {
        console.log('Database synced');
    })
    .catch((err) => {
        console.log('Error syncing database:', err);
    });
