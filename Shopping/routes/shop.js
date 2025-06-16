const path = require('path');

const express = require('express');



const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/cart-delete-item',)

router.post('/cart-delete-item', productsController.postCartDeleteProduct)

module.exports = router;


// const productController = { 
// router 
// }

