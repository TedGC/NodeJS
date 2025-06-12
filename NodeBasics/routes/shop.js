import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';



// Fix __dirname for ES modules


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const router = express.Router();

router.get('/product', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'view', 'shop.html'));
});