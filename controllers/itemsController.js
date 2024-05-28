const { Router } = require('express'); 
const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require('../queries/itemsQueries');

const itemsController = Router();

itemsController.get("/", async (request, response) => {
    const items = await getAllItems();
    response.status(200).json({ data: items });
});

itemsController.get("/:id", async (request, response) => {
    const { id } = request.params;
    const item = await getItemById(Number(id));
    response.status(200).json({ data: item });
  });
  
itemsController.post("/", async (request,response) => {
  const item = request.body;
  const createdItem = await createItem(item);
  response.status(200).json({data: createdItem})
})

itemsController.put("/:id", async (request,response) => {
  const {id} = request.params;
  const item = request.body;
  const updatedItem = await updateItem(Number(id), item);
  response.status(200).json({data: updatedItem})
})

itemsController.delete("/:id", async (request,response) => {  
  const {id} = request.params;
  const deletedItem = await deleteItem(Number(id));
  response.status(200).json({data: deletedItem})
})


module.exports = itemsController;
