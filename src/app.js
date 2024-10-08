import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';


const app = express();
const PORT = 8080;
const HOST = 'localhost';

// Configuración del server para recibir objetos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.get('/', (req, res) => {
    res.send(`<h1 style = "color:green">70290-Programación-Backend-I
        1° preentrega - BIENVENIDOS!!</h1>`)
});
app.listen(PORT, () => {
    console.log(`Server listening in http://${HOST}:${PORT}.`);

});