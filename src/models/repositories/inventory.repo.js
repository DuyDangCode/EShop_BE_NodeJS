import inventoryModel from '../inventory.model.js';

const createInventory = async ({
  inven_productId,
  inven_stock,
  inven_location,
}) => {
  return await inventoryModel.create({
    inven_productId,
    inven_stock,
    inven_location,
  });
};

export default { createInventory };
