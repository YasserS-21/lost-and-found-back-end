const { Router } = require("express");
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../queries/itemsQueries");
const {
  validateId,
  validateItem,
} = require("./controllerHelpers/itemControllerHelper.js");

const itemsController = Router();

itemsController.get("/", async (request, response) => {
  try {
    const items = await getAllItems();
    response.status(200).json({ data: items });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

itemsController.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    
    // Check if the id is valid
    if (!validateId(Number(id))) {
      return response.status(404).json({ error: "Invalid id" });
    }

    // This will return the all items that have the specified id (we should only have one item)
    const item = await getItemById(Number(id))

    // Check if the item exists
    if (!item.length) {
      return response.status(404).json({ error: "Item not found" });
    }

    // send the only first item which should be the only item
    response.status(200).json({ data: item[0] });

  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

itemsController.post("/", async (request, response) => {
  try {
    const item = request.body;

    // Check if the item is valid
    if (!validateItem(item)) {
      return response.status(400).json({ error: "Invalid item" });
    }

    // create the item
    const createdItem = await createItem(item);

    response.status(201).json({ data: createdItem });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

itemsController.put("/:id", async (request, response) => {
  try {

    const { id } = request.params;

    // validate the request id
    if (!validateId(Number(id))) {
      return response.status(404).json({ error: "Invalid id" });
    }
    
    const item = request.body;
    // validate the update request
    if (!validateItem(item)) {
      return response.status(400).json({ error: "Invalid item" });
    }

    // This will return the all items that have the specified id (we should only have one item)
    const updatedItem = await updateItem(Number(id), item);

    // If the item has not been updated then the item does not exist with that id
    if (!updatedItem.length) {
      return response.status(404).json({ error: "Item not found" });
    }

    response.status(200).json({ data: updatedItem[0] });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

itemsController.delete("/:id", async (request, response) => {
  try {

    const { id } = request.params;

    // Check if the id is valid
    if (!validateId(Number(id))) {
      return response.status(404).json({ error: "Invalid id" });
    }
    // This will return the all items that have the specified id (we should only have one item)
    const deletedItem = await deleteItem(Number(id));
    // If the item has not been deleted then the item does not exist with that id
    if (!deletedItem.length) {
      return response.status(404).json({ error: "Item not found" });
    }
    response.status(200).json({ data: deletedItem });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

module.exports = itemsController;
