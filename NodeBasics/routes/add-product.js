import express from 'express'
import path from 'path';
import { fileURLToPath, } from 'url';


const router = express.Router()

// Show product input form
// router.get('/add-product', (req, res, next) => {
//     res.send(`
//     <form action="/add-product" method="POST">
//       <input type="text" name="title" />
//       <button type="submit">Add Product</button>
//     </form>
//   `);
// });

const products = []

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'view', 'add-product.html'))
})

// Handle form submission
router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title })
    res.redirect('/');
});


const adminData = {
    router,
    products
}

export default adminData


