const { Router } = require('express'); 
const { getAllItems } = require('../queries/itemsQueries');

const itemsController = Router();

itemsController.get("/", async (request, response) => {
    const items = await getAllItems();
    response.status(200).json({ data: items });
  });

  module.exports = itemsController;
