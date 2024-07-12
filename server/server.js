const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const RecipeHiveRoutes = require('./routes/recipehive');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const connectMongoDB = require('./config/db');
const { authenticate } = require("./middleware/authMiddle");
const app = express();

app.use(express.json());

connectMongoDB();

const PORT = process.env.PORT || 8000;

app.use(cors({
    origin:[
        'http://localhost:3000'
    ],
    credentials:true
}));
app.use('/api/RecipeHive', authenticate, RecipeHiveRoutes);
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`RecipeHive app server is listening on port ${PORT}`);
});
