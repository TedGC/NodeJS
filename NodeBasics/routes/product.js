import express from 'express';


import productController from '../controllers/product.js';


// Fix __dirname for ES modules


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', productController.getProduct)
// const products = adminData.products
// res.render('product', { products, docTitle: 'Product', path: '/' })
// console.log(adminData.products)
// res.sendFile(path.join(__dirname, '../', 'view', 'product.html'));

const productData = {
    router
}

export default productData