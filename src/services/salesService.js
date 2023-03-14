const ModelSales = require('../models/salesModel');
const ModelSalesProducts = require('../models/salesProductsModel');

const getAll = async () => {
  const sales = await ModelSales.getAll();
  return { status: 200, message: sales };
};

const getById = async (id) => {
  const [saleId] = await ModelSalesProducts.getById(id);
  if (!saleId) return { isError: true, status: 404, message: 'Sale not found' };
  const salesProducts = await ModelSalesProducts.getById(id);
  return { isError: false, status: 200, message: salesProducts };
};

const deleteSales = async (id) => {
  const { affectedRows } = await ModelSales.deleteSales(id);
  if (affectedRows === 0) return { isError: true, status: 404, message: 'Sale not found' };
  return { isError: false, status: 204 };
};

module.exports = {
  getAll,
  getById,
  deleteSales,
};