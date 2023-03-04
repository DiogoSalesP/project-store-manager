const { Router } = require('express');
const Controller = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation');

const router = Router();

router.get('/:id', Controller.getById);
router.get('/', Controller.getAll);
router.post('/', productValidation, Controller.registerProducts);

module.exports = router;