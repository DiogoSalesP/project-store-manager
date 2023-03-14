const Service = require('../services/salesService');

const getAll = async (_req, res) => {
  const { status, message } = await Service.getAll();
  return res.status(status).json(message);
};

const getById = async (req, res) => {
  const { isError, status, message } = await Service.getById(req.params.id);
  if (isError) return res.status(status).json({ message });
  return res.status(status).json(message);
};

const deleteSales = async (req, res) => {
  const { isError, status, message } = await Service.deleteSales(req.params.id);
  if (isError) return res.status(status).json({ message });
  return res.status(status).send();
};

module.exports = {
  getAll,
  getById,
  deleteSales,
};