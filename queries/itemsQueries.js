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
    const {name, description, location, date_found, image_url, status, added_by_id } = item;
    const response = await db.one("INSERT INTO items (name, description, location, date_found, image_url, status, added_by_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [name, description, location, date_found, image_url, status, added_by_id]);
    return response;
}

const updateItem = async (id, item) => {
    const { name, description, location, date_found, image_url, status, date_claimed, claimed_by } = item;
    const response = await db.any("UPDATE items SET name = $1, description = $2, location = $3, date_found = $4, image_url = $5, status = $6, date_claimed = $7, claimed_by = $8 WHERE id = $9 RETURNING *", [name, description, location, date_found, image_url, status, date_claimed, claimed_by, id])
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
