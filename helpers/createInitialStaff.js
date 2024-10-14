const bcrypt = require('bcrypt');
const { createStaff } = require('../queries/staffQueries');

async function createInitialStaff() {
  try {
    const hashedPassword = await bcrypt.hash('initialPassword', 10);
    const newStaff = {
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    };
    await createStaff(newStaff);
    console.log('Initial staff member created successfully');
  } catch (error) {
    console.error('Error creating initial staff member:', error);
  }
}

createInitialStaff();