import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';

const app = express();
const PORT = 8080;
const HOST = 'localhost';

// Inicializo el motor 
app.engine('handlebars', handlebars.engine());
// Indico donde estarán las vistas
app.set('views', __dirname + '/views');
// Indico el motor con que quiero renderizar
app.set('view engine', 'handlebars');

// Configuración del server para recibir objetos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ubicación de la carpeta 'public'
app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//     res.send(`<h1 style = "color:green">70290-Programación-Backend-I
//         2° preentrega - BIENVENIDOS!!</h1>`)
// });

// Prueba de Hbs
app.use('/', viewsRouter);

app.listen(PORT, () => {
    console.log(`Server listening in http://${HOST}:${PORT}.`);

});