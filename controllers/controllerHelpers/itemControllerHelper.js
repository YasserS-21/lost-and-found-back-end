function validateId(id) {

    // Negative or not an Integer, not valid
    if (id <= 0 || !Number.isInteger(id)) return false;
  
    return true;
  }
  
  function validateItem(item) {
    //our ideal object keys, value (data-types)
    const schema = new Map(
      Object.entries({
        name: "string",
        location: "string",
        description: "string",
        date_lost: "string",
      }),
    );

    const itemMap = new Map(Object.entries(item));
  
    //Check that item has all the keys we require for our object.
    //Also Checks that the item has the correct data.types
    for (const [key, value] of schema.entries()) {
      if (!itemMap.has(key) || typeof value !== typeof itemMap.get(key)) {
        return false;
      }
    }
  
    //Check that the item doesn't have any extra keys
    for (const key of itemMap.keys()) {
      if (!schema.has(key)) return false;
    }
  
    //valid item
    return true;
  }

  module.exports = {
    validateId,
    validateItem,
  };
  