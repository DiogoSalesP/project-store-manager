const connection = require('./db/connection');

const getAll = async () => {
  const query = `
  SELECT 
    sp.sale_id AS 'saleId',
    s.date AS 'date',
    sp.product_id AS 'productId',
    sp.quantity AS 'quantity'
  FROM
    StoreManager.sales as s
      INNER JOIN
    StoreManager.sales_products as sp ON sp.sale_id = s.id
  ORDER BY saleId, productId;`;
  const [sales] = await connection.execute(query);
  return sales;
};

module.exports = {
  getAll,
};
