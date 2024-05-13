const db = require('../db/dbConfig');
require('dotenv').config();

const getAllItems = async () => {
    const response = await db.any("SELECT * FROM items");
    return response;
}

module.exports = {
    getAllItems
}
