const express = require('express');
const cors = require('cors');
const usersController = require("./controllers/usersController");
const itemsController = require("./controllers/itemsController");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
    response.status(200).json({ message: 'Service is running'})
});

app.use("/users", usersController)

app.use("/items", itemsController);

module.exports = app;
