const connection = require('./db/connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [product] = await connection.execute(query, [id]);
  return product;
};

const getByProductName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?;';
  const [product] = await connection.execute(query, [name]);
  return product;
};

const registerProducts = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?);';
  await connection.execute(query, [name]);
  return name;
};

module.exports = {
  getAll,
  getById,
  registerProducts,
  getByProductName,
};
