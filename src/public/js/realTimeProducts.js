const socket = io();

const productsList = document.getElementById("products-list");

const productsForm = document.getElementById('productsForm');

// form.addEventListener('submit', e =>{
//     e.preventDefault();
//     const data = new FormData(form);
//     // console.log(data);
//     const product = {};
//     data.forEach((value, key)=>product[key] = value)
//     console.log("Producto creado");
//     console.log(product);
//     fetch('/api/products', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify(product)
//     })

//     .then(result => {
//         if(result.status === 201){
//             result.json();
//             alert("Producto creado con éxito!");
//             socket.emit('nuevoProducto', product)
//         }else{
//             alert("No se pudo crear el producto!")
//         }        
//     })
//     .then(json => {
//         console.log(json);
        
//     })
//     .catch(error => {
//         console.log('Error:', error);
        
//     })    

    
// })




// EVENTOS

productsForm.onsubmit = (event)=>{
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    form.reset();

    socket.emit('add-products', {
        title: formData.get("title"),
        description: formData.get("description"),
        code: formData.get("code"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        category: formData.get("category"),
        thumbnail: formData.get("thumbnail")
    });
};



socket.on('products-list', (data)=>{
    const products = data.products ?? [];
    console.log(products);
    productsList.innerText = "";

    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `<em><b>Id:</b></em> ${product.id} - <em><b>Cód:</b></em> ${product.code} - ${product.title} - <em><b>$</b></em> ${product.price}- <em><b>Stock:</b></em> ${product.stock}`;
        productsList.append(li);
    });
    
});