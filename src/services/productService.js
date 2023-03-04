const Model = require('../models/productModel');

const getAll = async () => {
  const result = await Model.getAll();
  return { status: 200, message: result };
};

const getById = async (id) => {
  const [result] = await Model.getById(id);
  if (!result) return { isError: true, status: 404, message: 'Product not found' };
  return { isError: false, status: 200, message: result };
};

const registerProducts = async (name) => {
  await Model.registerProducts(name);
  const [product] = await Model.getByProductName(name);
  return { status: 201, message: product };
};

module.exports = {
  getAll,
  getById,
  registerProducts,
};
