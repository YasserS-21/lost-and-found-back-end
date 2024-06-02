const db = require('../db/dbConfig');
require('dotenv').config();

const getAllItems = async () => {
    const response = await db.any("SELECT * FROM items");
    return response;
}

const getItemById = async (id) => {
    const response = await db.any("SELECT * FROM items WHERE id = $1", [id]);
    return response;
}

const createItem = async (item) => {
    const {name, description, location, date_lost } = item;
    const response = await db.one("INSERT INTO items (name, description, location, date_lost) VALUES ($1, $2, $3, $4) RETURNING *", [name, description, location, date_lost]);
    return response;
}
const updateItem = async (id, item) => {
    const { name, description, location, date_lost } = item;
    const response = await db.any("UPDATE items SET name = $1 , description = $2 , location = $3 , date_lost= $4 WHERE id = $5 RETURNING *", [name, description, location, date_lost, id])
    return response;
}
const deleteItem = async (id) => {
    const response = await db.any("DELETE FROM items WHERE id = $1 RETURNING *", [id]);
    return response
}


module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
}
