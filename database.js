const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config({ path: './config.env' });

// Create database connection
const dbPath = process.env.DB_PATH || './database.sqlite';
const db = new sqlite3.Database(dbPath);

// Initialize database and create tables
const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    // Create users table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        age INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

    db.run(createTableQuery, (err) => {
      if (err) {
        console.error('❌ Database initialization error:', err.message);
        reject(err);
        return;
      }
      
      console.log('✅ Database initialized successfully');
      
      // Check if table has data
      db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
        if (err) {
          console.error('❌ Error checking data:', err.message);
          reject(err);
          return;
        }
        
        if (row.count === 0) {
          // Insert sample data
          const insertSampleData = `
            INSERT INTO users (name, email, age) VALUES 
            ('John Doe', 'john@example.com', 30),
            ('Jane Smith', 'jane@example.com', 25),
            ('Bob Johnson', 'bob@example.com', 35)
          `;
          
          db.run(insertSampleData, (err) => {
            if (err) {
              console.error('❌ Error inserting sample data:', err.message);
              reject(err);
              return;
            }
            console.log('✅ Sample data inserted');
            resolve();
          });
        } else {
          resolve();
        }
      });
    });
  });
};

// Test database connection
const testConnection = () => {
  return new Promise((resolve) => {
    db.get('SELECT datetime("now") as now', (err, row) => {
      if (err) {
        console.error('❌ Database connection failed:', err.message);
        resolve(false);
      } else {
        console.log('✅ Database connected successfully:', row.now);
        resolve(true);
      }
    });
  });
};

// Helper function for database queries
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Helper function for single row queries
const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Helper function for insert/update/delete operations
const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
};

module.exports = {
  db,
  query,
  get,
  run,
  initializeDatabase,
  testConnection
}; 