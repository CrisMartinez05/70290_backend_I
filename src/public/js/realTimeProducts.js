// import ProductManager from "../../services/ProductManager.js";

// const productManager = new ProductManager();

const socket = io();

const form = document.getElementById('registerProducts');

form.addEventListener('submit', e =>{
    e.preventDefault();
    const data = new FormData(form);
    console.log(data);
    const product = {};
    data.forEach((key, value)=>product[key] = value)
    console.log("Producto formado");
    console.log(product);
    fetch('/api/products', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(product)
    })

    .then(response => {
        if(!response.ok){
            throw new Error('Error en la creación del producto');
        }
        return response.json();
    })
    .then(data => {
        console.log('Producto creado exitosamente: ', data);
        
    })
    .catch(error => {
        console.log('Error:', error);
        
    })    

    
})