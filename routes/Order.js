const express = require('express');
const controller = require('../controllers/order');
const router = express.Router();

router.post('/create', controller.create);

router.get('/fetchOne/:id', controller.getOne);

router.get('/fetchOrders', controller.getAll);

module.exports = router;