const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database.js'); // Import Sequelize database configuration
const Routes = require('./routes/route.js'); // Import routes
const dotenv = require('dotenv');

// Load environment variables (optional if you have .env file)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Sync Sequelize models with the database
sequelize.sync().then(() => {
    console.log('Database synced successfully!');
}).catch(err => {
    console.log('Error syncing database: ', err);
});

// Use routes
app.use('/', Routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
