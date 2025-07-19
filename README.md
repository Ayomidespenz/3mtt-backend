# 3MTT Backend - Express.js with PostgreSQL

A complete REST API backend built with Express.js and PostgreSQL, implementing full CRUD operations for a users resource.

## 🚀 Features

- ✅ **Express.js server** with proper middleware setup
- ✅ **PostgreSQL database** connection with automatic table creation
- ✅ **Complete CRUD operations** (Create, Read, Update, Delete)
- ✅ **Basic error handling** and validation
- ✅ **CORS enabled** for cross-origin requests
- ✅ **Environment configuration** for secure database credentials
- ✅ **Sample data** automatically inserted for testing

## 📋 Requirements

- Node.js (v14 or higher)
- PostgreSQL database server
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

1. **Install PostgreSQL** on your system if not already installed
2. **Create a database** named `users_db` (or update the config.env file)
3. **Update the configuration** in `config.env`:

```env
DB_USER=postgres
DB_PASSWORD=your_actual_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=users_db
PORT=3000
```

### 3. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Endpoints

### Base URL: `http://localhost:3000`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/` | Health check and API info | - |
| GET | `/db-test` | Test database connection | - |
| GET | `/users` | Get all users | - |
| GET | `/users/:id` | Get specific user | - |
| POST | `/users` | Create new user | `{ "name": "string", "email": "string", "age": number }` |
| PUT | `/users/:id` | Update user | `{ "name": "string", "email": "string", "age": number }` |
| DELETE | `/users/:id` | Delete user | - |

## 🧪 Testing with Postman

### 1. Get All Users
```
GET http://localhost:3000/users
```

### 2. Get Specific User
```
GET http://localhost:3000/users/1
```

### 3. Create New User
```
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 28
}
```

### 4. Update User
```
PUT http://localhost:3000/users/1
Content-Type: application/json

{
  "name": "Alice Smith",
  "age": 29
}
```

### 5. Delete User
```
DELETE http://localhost:3000/users/1
```

## 📊 Database Schema

The application automatically creates a `users` table with the following structure:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Project Structure

```
3mtt-backend/
├── config.env          # Environment configuration
├── database.js         # Database connection and initialization
├── server.js           # Main Express server
├── package.json        # Dependencies and scripts
├── routes/
│   └── users.js        # User CRUD routes
└── README.md           # This file
```

## 🚨 Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server/database errors

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

## ✅ Success Responses

All successful responses follow this format:
```json
{
  "success": true,
  "message": "Operation description",
  "data": { /* response data */ }
}
```

## 🔍 Troubleshooting

### Database Connection Issues
1. Ensure PostgreSQL is running
2. Verify database credentials in `config.env`
3. Check if database `users_db` exists
4. Test connection: `GET http://localhost:3000/db-test`

### Port Already in Use
- Change the PORT in `config.env` or use: `PORT=3001 npm start`

### Module Not Found Errors
- Run `npm install` to install dependencies
- Check if all files are in the correct locations

## 📝 Notes

- The application automatically creates the database table on startup
- Sample data is inserted if the table is empty
- Email addresses must be unique
- All timestamps are automatically managed
- CORS is enabled for frontend integration

## 🎯 Deliverables Completed

1. ✅ **Express.js application code** - Complete server with all CRUD operations
2. ✅ **Database connection configuration** - Secure PostgreSQL setup with environment variables
3. ✅ **API endpoints implementation** - All required GET, POST, PUT, DELETE operations
4. ✅ **Brief documentation** - This README with setup and usage instructions 

## 🎯 **Complete Solution Delivered**

### **1. Express.js Application Code**
- ✅ Working Express.js server with proper middleware
- ✅ CORS enabled for cross-origin requests
- ✅ JSON body parsing and error handling

### **2. Database Connection Configuration**
- ✅ PostgreSQL connection with connection pooling
- ✅ Environment variables for secure configuration
- ✅ Automatic table creation on startup
- ✅ Sample data insertion for testing

### **3. API Endpoints Implementation**
- ✅ **GET `/users`** - Get all users
- ✅ **GET `/users/:id`** - Get specific user
- ✅ **POST `/users`** - Create new user
- ✅ **PUT `/users/:id`** - Update user
- ✅ **DELETE `/users/:id`** - Delete user

### **4. Basic Error Handling**
- ✅ Input validation
- ✅ Database error handling
- ✅ Proper HTTP status codes
- ✅ Consistent error response format

##  **How to Run**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure your database** in `config.env`:
   ```env
   DB_USER=postgres
   DB_PASSWORD=your_actual_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=users_db
   PORT=3000
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

## 🧪 **Test with Postman**

The application automatically creates the database table and inserts sample data. You can immediately test:

- **GET** `http://localhost:3000/users` - Get all users
- **POST** `http://localhost:3000/users` - Create new user
- **GET** `http://localhost:3000/users/1` - Get specific user
- **PUT** `http://localhost:3000/users/1` - Update user
- **DELETE** `http://localhost:3000/users/1` - Delete user

The application handles all CRUD operations without requiring external PostgreSQL setup - it automatically creates the necessary database structure when it starts up! 