import { Router } from "express";
import CartManager from "../services/filesystem/CartManager.js";


const router = Router();

// Instancia de la clase CartManager
const cartManager = new CartManager();

// Configuración de endpoints
// GET

router.get('/', async (req, res) => {
    try {        
        const carts = await cartManager.getCarts();
        res.json({ Carritos: carts });
    } catch (error) {
        res.status(500).json({ error: 'Error al obener los carritos' });
    }
});

// GET.pId

router.get('/:cId', async (req, res) => {
    try {
        let { cId } = req.params;
        
        const cartPorId = await cartManager.getCartById(parseInt(cId));
        if (cartPorId) {
            res.json({Carrito: cartPorId});            
        }else{
            return res.status(404).json({ error: 'Error al obtener el carrito solicitado. Por favor verifique que el Id del mismo sea correcto.' });
        }
    } catch (error) {
        console.log(error);        
    }
});

// POST

router.post('/', async(req, res)=>{
    try {
        const {id, quantity = 1} = req.body;

        // Validación de Id
        if(!id){
            return res.status(400).json({error:'No se puede ingresar un producto sin especificar su Id.'});
        };
            
        const product = {id, quantity};                
        
        const newCart = await cartManager.createCart(product);        
        res.status(201).json(newCart);
        
    } catch (error) {
        console.log(error);        
    };
    
});



// PUT.pId

router.put('/:cId', async(req, res)=>{
    try {
      let cartId = parseInt(req.params.cId);

      const {id, quantity = 1} = req.body;

      // Validación de Id
      if(!id){
          return res.status(400).json({error:'No se puede ingresar un producto sin especificar su Id.'});
      };
          
    //   const product = {id, quantity};                
      
      const updatedCart = await cartManager.addProdToCart(cartId, id, quantity);        
      res.status(201).json(updatedCart);
    } catch (error) {
        console.log(error);        
    };
});

export default router;