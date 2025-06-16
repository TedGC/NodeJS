const path = require('path');

const express = require('express');



const productsController = require('../controllers/products');

const router = express.Router();



router.get('/products ', productsController.getProducts);

router.get('/products/:productId', productsController.getProduct)

router.get('/cart', productsController.getCart)

router.post('/cart', productsController.postCart)





router.post('/cart-delete-item', productsController.postCartDeleteProduct)

module.exports = router;


// const productController = { 
// router 
// }

