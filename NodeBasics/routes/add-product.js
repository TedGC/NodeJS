import express from 'express'
import path from 'path';
import { fileURLToPath, } from 'url';


export const router = express.Router()

// Show product input form
// router.get('/add-product', (req, res, next) => {
//     res.send(`
//     <form action="/add-product" method="POST">
//       <input type="text" name="title" />
//       <button type="submit">Add Product</button>
//     </form>
//   `);
// });

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'view', 'add-product.html'))
})

// Handle form submission
router.post('/add-product', (req, res, next) => {
    console.log(req.body); // logs { title: 'whatever user typed' }
    res.redirect('/');
});


