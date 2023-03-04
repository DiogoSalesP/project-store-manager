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

module.exports = {
  getAll,
  getById,
  registerProducts,
};
