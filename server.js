const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const { initializeDatabase, testConnection } = require('./database');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Routes
app.use('/users', usersRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '3MTT Backend API is running!',
    endpoints: {
      'GET /users': 'Get all users',
      'GET /users/:id': 'Get a specific user',
      'POST /users': 'Create a new user',
      'PUT /users/:id': 'Update a user',
      'DELETE /users/:id': 'Delete a user'
    }
  });
});

// Database connection test endpoint
app.get('/db-test', async (req, res) => {
  try {
    const isConnected = await testConnection();
    if (isConnected) {
      res.json({
        success: true,
        message: 'Database connection successful'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Database connection failed'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database test failed',
      error: error.message
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('❌ Cannot start server without database connection');
      process.exit(1);
    }

    // Initialize database (create tables and sample data)
    await initializeDatabase();

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 API Documentation: http://localhost:${PORT}`);
      console.log(`🔗 Database test: http://localhost:${PORT}/db-test`);
      console.log(`👥 Users API: http://localhost:${PORT}/users`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer(); 