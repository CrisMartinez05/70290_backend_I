import { Router } from "express";     
import ProductManager from '../services/filesystem/ProductManager.js';                                          
// import ProductManager from "../services/db/ProductManagers.js";
const router = Router();

// Instancia de la clase ProductManager
const productManager = new ProductManager();

// Configuración de endpoints
// GET

router.get('/', async (req, res) => {
    try {
        // limit
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

        const products = await productManager.getProducts(limit);
        res.json({ productos: products });
    } catch (error) {
        res.status(500).json({ error: 'Error al obener los productos' });
    }
});

// GET.pId

router.get('/:pId', async (req, res) => {
    try {
        let { pId } = req.params;
        
        const productPorId = await productManager.getProductById(parseInt(pId));
        if (productPorId) {
            res.json({Producto: productPorId});            
        }else{
            return res.status(404).json({ error: 'Error al obtener el producto solicitado. Por favor verifique que el Id del mismo sea correcto.' });
        }
    } catch (error) {
        console.log(error);        
    }
});

// POST

router.post('/', async(req, res)=>{
    try {
        const {title, description, code, price, stock, category, thumbnails} = req.body;

        // Validación de campos completos
        if(!title|| !description|| !code|| !price|| !stock|| !category){
            return res.status(400).json({error:'No se pudo ingresar el producto. Todos los campos son obligatorios.'});
        };

        // Validación de código único(code)        
        const product = {title, description, code, price, stock, category, thumbnails};
            
            if (productManager.validarCode(product.code)) {
                return res.status(400).json({error:"No se pudo ingresar el producto debido a que su código ya fue asignado."});               
            };          
        
        await productManager.addProduct(product);        
        res.status(201).json(product);
        
    } catch (error) {
        console.log(error);        
    };
    
});

// PUT.pId

router.put('/:pId', async(req, res)=>{
    try {
      let productId = parseInt(req.params.pId);
      const updatedProduct = await productManager.updateProduct(productId,req.body);
      if(updatedProduct){
        res.json(updatedProduct)
      }else{
        res.status(404),json({error: 'Producto no encontrado.'})
      }
    } catch (error) {
        console.log(error);        
    };
});

// DELETE.pId

router.delete('/:pId', async(req, res)=>{
    try {
        const productId = parseInt(req.params.pId);
        const deletedProduct = productManager.deleteProductById(productId);
        if(deletedProduct){
            res.json(deletedProduct);
        }else{
            res.status(404).json({error: 'Producto no encontrado.'})
        }
    } catch (error) {
        console.log(error);
        
    }
});



export default router;