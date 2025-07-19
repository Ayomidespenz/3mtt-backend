const { Pool } = require('pg');
require('dotenv').config({ path: './config.env' });

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Initialize database and create tables
const initializeDatabase = async () => {
  try {
    // Create users table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        age INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(createTableQuery);
    console.log('✅ Database initialized successfully');
    
    // Insert some sample data if table is empty
    const checkDataQuery = 'SELECT COUNT(*) FROM users';
    const result = await pool.query(checkDataQuery);
    
    if (parseInt(result.rows[0].count) === 0) {
      const insertSampleData = `
        INSERT INTO users (name, email, age) VALUES 
        ('John Doe', 'john@example.com', 30),
        ('Jane Smith', 'jane@example.com', 25),
        ('Bob Johnson', 'bob@example.com', 35)
        ON CONFLICT (email) DO NOTHING;
      `;
      await pool.query(insertSampleData);
      console.log('✅ Sample data inserted');
    }
    
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    throw error;
  }
};

// Test database connection
const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  initializeDatabase,
  testConnection
}; 