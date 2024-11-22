// app.js
const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes'); // Import user routes
//const forgetPassword = require('./routes/forget-passwordRoutes'); // Import user routes
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const cors = require('cors');
const app = express();
const PORT = 4000;
require('dotenv').config();

// Middleware to parse JSON
app.use(express.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ScalableBook', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

//const User = require('../models/User');
app.use(cors());
// Use the user routes

app.use('/api/books', bookRoutes);

//app.use('/api/forget-password', forgetPassword);


// Sample route
app.get('/Test', (req, res) => {
  res.send('Hello, MongoDB with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
