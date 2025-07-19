const express = require('express');
const router = express.Router();
const { query, get, run } = require('../database');

// GET /users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await query('SELECT * FROM users ORDER BY created_at DESC');
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// GET /users/:id - Get a specific user
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await get('SELECT * FROM users WHERE id = ?', [id]);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
});

// POST /users - Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    // Basic validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }
    
    // Check if email already exists
    const existingUser = await get('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    const result = await run(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age]
    );
    
    // Get the created user
    const newUser = await get('SELECT * FROM users WHERE id = ?', [result.id]);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
});

// PUT /users/:id - Update a user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    
    // Check if user exists
    const existingUser = await get('SELECT * FROM users WHERE id = ?', [id]);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if email is being changed and if it already exists
    if (email && email !== existingUser.email) {
      const emailExists = await get('SELECT id FROM users WHERE email = ? AND id != ?', [email, id]);
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }
    
    // Build update query dynamically
    const updates = [];
    const params = [];
    
    if (name !== undefined) {
      updates.push('name = ?');
      params.push(name);
    }
    if (email !== undefined) {
      updates.push('email = ?');
      params.push(email);
    }
    if (age !== undefined) {
      updates.push('age = ?');
      params.push(age);
    }
    
    updates.push('updated_at = datetime("now")');
    params.push(id);
    
    const updateQuery = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    await run(updateQuery, params);
    
    // Get the updated user
    const updatedUser = await get('SELECT * FROM users WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
});

// DELETE /users/:id - Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const existingUser = await get('SELECT * FROM users WHERE id = ?', [id]);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    await run('DELETE FROM users WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
});

module.exports = router; 