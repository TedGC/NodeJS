import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { __dirname as rootDir } from '../util/path.js';


// Fix __dirname for ES modules


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'view', 'shop.html'));
});