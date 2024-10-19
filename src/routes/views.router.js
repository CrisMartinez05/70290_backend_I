import express from 'express';
import ProductManager from '../services/ProductManager.js';

const router = express.Router();

const productManager = new ProductManager();

router.get('/', async(req, res)=>{
    
    const products = await productManager.getProducts();
        
    res.render('home', {products})
})

export default router;