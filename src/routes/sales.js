const { Router } = require('express');
const Controller = require('../controllers/salesController');

const router = Router();

router.get('/:id', Controller.getById);
router.get('/', Controller.getAll);

module.exports = router;