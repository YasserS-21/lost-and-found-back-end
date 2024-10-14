const db = require('../db/dbConfig');

// Get staff by email
const getStaffByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM staff WHERE email = $1';
    const result = await db.oneOrNone(query, [email]);
    return result;
  } catch (error) {
    console.error('Error in getStaffByEmail:', error);
    throw error;
  }
};

// Update staff
const updateStaff = async (id, staffData) => {
  try {
    const { first_name, last_name, email } = staffData;
    const query = `
      UPDATE staff 
      SET first_name = $1, last_name = $2, email = $3
      WHERE id = $4 
      RETURNING id, first_name, last_name, email, role
    `;
    const result = await db.one(query, [first_name, last_name, email, id]);
    return result;
  } catch (error) {
    console.error('Error in updateStaff:', error);
    throw error;
  }
};

// Create staff
const createStaff = async (staffData) => {
  try {
    const { first_name, last_name, email, password, role } = staffData;
    const query = `
      INSERT INTO staff (first_name, last_name, email, password, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, first_name, last_name, email, role
    `;
    const result = await db.one(query, [first_name, last_name, email, password, role]);
    return result;
  } catch (error) {
    console.error('Error in createStaff:', error);
    throw error;
  }
};

const getAllStaff = async () => {
  try {
    const query = 'SELECT * FROM staff';
    const result = await db.any(query);
    return result;
  } catch (error) {
    console.error('Error in getAllStaff:', error);
    throw error;
  }
};

module.exports = {
  getStaffByEmail,
  updateStaff,
  createStaff,
  getAllStaff
};
