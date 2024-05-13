const db = require('../db/dbConfig');
require('dotenv').config();

const getAllUsers = async () => {
    const response = await db.any("SELECT * FROM users");
    return response;
}

module.exports = {
    getAllUsers
}
