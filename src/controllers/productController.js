const Service = require('../services/productService');

const getAll = async (_req, res) => {
  const { status, message } = await Service.getAll();
  return res.status(status).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { isError, status, message } = await Service.getById(id);
  if (isError) return res.status(status).json({ message });

  return res.status(status).json(message);
};

const registerProducts = async (req, res) => {
  const { status, message } = await Service.registerProducts(req.body.name);
  return res.status(status).json(message);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { isError, status, message } = await Service.updateProduct(name, Number(id));
  if (isError) return res.status(status).json({ message });
  return res.status(status).json(message);
};

const deleteProduct = async (req, res) => {
  const { isError, status, message } = await Service.deleteProduct(req.params.id);
  if (isError) return res.status(status).json({ message });
  return res.status(204).send();
};

const search = async (req, res) => {
  const { q } = req.query;
  const result = await Service.search(q);
  return res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
  registerProducts,
  updateProduct,
  deleteProduct,
  search,
};
