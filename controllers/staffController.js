const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getStaffByEmail, updateStaff, createStaff, getAllStaff } = require('../queries/staffQueries');
const { authenticateStaff } = require('../middlewares/authMiddleware');

const staffController = express.Router();

// Get all staff members
staffController.get('/', async (req, res) => {
  try {
    // Fetch all staff members
    const allStaff = await getAllStaff();

    // Remove sensitive information (passwords) from the response
    const sanitizedStaff = allStaff.map(staff => {
      const { password, ...staffWithoutPassword } = staff;
      return staffWithoutPassword;
    });

    res.json(sanitizedStaff);
  } catch (error) {
    console.error('Error fetching all staff:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

staffController.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find staff by email
    const staff = await getStaffByEmail(email);
    if (!staff) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create and sign JWT
    const payload = {
      staff: {
        id: staff.id,
        email: staff.email,
        role: staff.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

staffController.get('/profile', authenticateStaff, async (req, res) => {
  try {
    const staff = await getStaffByEmail(req.staff.email);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    // Remove sensitive information
    delete staff.password;
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

staffController.put('/profile', authenticateStaff, async (req, res) => {
  try {
    const updatedStaff = await updateStaff(req.staff.id, req.body);
    if (!updatedStaff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    // Remove sensitive information
    delete updatedStaff.password;
    res.json(updatedStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

staffController.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    // Check if staff with this email already exists
    const existingStaff = await getStaffByEmail(email);
    if (existingStaff) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new staff member
    const newStaff = await createStaff({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: role || 'staff' // Default to 'staff' if no role is provided
    });

    // Remove password from the response
    delete newStaff.password;

    res.status(201).json(newStaff);
  } catch (error) {
    console.error('Error in staff registration:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ... other staff-related routes ...

module.exports = staffController;
