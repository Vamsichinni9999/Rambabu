const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());  // Parses incoming requests with JSON payloads
app.use(bodyParser.json());  // Parses incoming request bodies
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));  // Serves static files from 'uploads' directory

// Root route
app.get('/', (req, res) => {
    res.status(200).send("hello world!");  // Set status 200 (OK) and send the message
});


// Routes
app.use('/user', require('./routes/useRouter.js'));
app.use('/api', require('./routes/categoryRouter.js'));
app.use('/api/upload', require('./routes/upload.js'));
app.use('/api', require('./routes/productRouter.js'));

// MongoDB connection
const MONGO_URI = process.env.MANGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI is not defined. Please check your .env file.');
    process.exit(1);  // Exit the server if MONGO_URI is missing
}

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);  // Exit the server if MongoDB connection fails
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
