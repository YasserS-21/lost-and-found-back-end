const express = require('express');
const cors = require('cors');

const itemsController = require("./controllers/itemsController");
const staffController = require('./controllers/staffController');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
    response.status(200).json({ message: 'Service is running'})
});
app.use("/staff", staffController);
app.use("/items", itemsController);


module.exports = app;
