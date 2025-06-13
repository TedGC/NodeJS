import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import adminData from './add-product.js';


// Fix __dirname for ES modules


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const router = express.Router();

router.get('/', (req, res, next) => {
    const products = adminData.products
    res.render('product', { products, docTitle: 'Product' })
    // console.log(adminData.products)
    // res.sendFile(path.join(__dirname, '../', 'view', 'product.html'));
});