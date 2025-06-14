const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct)

// this is a router to pass along the function fetched from other controllers to the 
// path defined in each router described above



module.exports = router;
