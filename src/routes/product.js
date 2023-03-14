const { Router } = require('express');
const Controller = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation');

const router = Router();

router.delete('/:id', Controller.deleteProduct);
router.put('/:id', productValidation, Controller.updateProduct);
router.post('/', productValidation, Controller.registerProducts);
router.get('/search', Controller.search);
router.get('/:id', Controller.getById);
router.get('/', Controller.getAll);

module.exports = router;