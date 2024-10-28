import express from "express";
import ProductManager from "../services/ProductManager.js";

const router = express.Router();

const RESPONSE_MESSAGE_500 = 'Hubo un error en el servidor HTTP';

const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
        
          res.status(200).render("home", {
            products,
            title: "Inicio",
            style: "products.css"
          });    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({status: false, message: RESPONSE_MESSAGE_500});    
  }

      });


router.get('/realTimeProducts', async (req, res) => {
  try {
    res.status(200).render('realTimeProducts', {title: "Tiempo real"});
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({status: false, message: RESPONSE_MESSAGE_500}); 
  }
  

})

export default router;
