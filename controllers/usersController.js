const { Router } = require('express'); 
const { getAllUsers } = require('../queries/usersQueries');

const usersController = Router();

usersController.get("/", async (request, response) => {
    const users = await getAllUsers();
    response.status(200).json({ data: users });
  });

  module.exports = usersController;