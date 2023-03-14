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

const updateProduct = async (name, id) => {
  const product = await Model.updateProduct(name, id);
  if (product.affectedRows === 0) {
    return { isError: true, status: 404, message: 'Product not found' };
  } 
  return { isError: false, status: 200, message: { id, name } };  
};

const deleteProduct = async (id) => {
  const { affectedRows } = await Model.deleteProduct(id);
  if (affectedRows === 0) return { isError: true, status: 404, message: 'Product not found' };
  return { isError: false, status: 204 };
};

module.exports = {
  getAll,
  getById,
  registerProducts,
  updateProduct,
  deleteProduct,
};
