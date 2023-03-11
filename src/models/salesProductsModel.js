const connection = require('./db/connection');

const getById = async (id) => {
  const query = `
    SELECT
      s.date AS date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM
      StoreManager.sales_products AS sp
        INNER JOIN
      StoreManager.sales AS s ON sp.sale_id = ?
    GROUP BY date, productId, quantity
    ORDER BY date, product_id, quantity;`;
  const [saleId] = await connection.execute(query, [id]);
  return saleId;
};

module.exports = {
  getById,
};