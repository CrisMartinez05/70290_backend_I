import fs from "fs/promises";
import path from "path";

export default class CartManager {
  #carts;
  #path;


  constructor() {
    this.#carts = [];
    this.#path = path.join("data", "Carts.json");
    this.#init();
  }

  // Método de arranque
  #init = async () => {
    try {
      const data = await fs.readFile(this.#path, "utf-8");
      this.#carts = JSON.parse(data);
    } catch (error) {
      this.#carts = [];
    }
  };

  // Método para guardar en el archivo
  saveToFile() {
    fs.writeFile(this.#path, JSON.stringify(this.#carts, null, "\t"));
  }

  // Método para generar un nuevo ID (autoincrementable)
  #generarId = () => {
    let idMayor = 0;

    this.#carts.forEach((cart) => {
      if (cart.id > idMayor) {
        idMayor = cart.id;
      }
    });
    return idMayor + 1;
  };

  // // Método para mostrar la lista completa de carritos.
  getCarts() {
    return this.#carts;
  }

  // // Método para buscar en la lista un carrito por "Id" y mostrarlo...
  getCartById(cId) {
    const cartPorId = this.#carts.find((cart) => cart.id === cId);

    return cartPorId;
  }

  // // Método para agregar un producto al array "carts" y mostrar por consola junto con una leyenda de "creado correctamente".

  createCart = (prod) => {
    const products = [];

    // Estructura del carrito
    const newCart = {
      id: this.#generarId(),
      products
    };

    // Agrego el producto al array "products" del nuevo carrito
    products.push(prod);

    // Agrego el nuevo carrito al array Carritos
    this.#carts.push(newCart);

    // Escribo el archivo
    this.saveToFile();

    //Muestro el carrito por consola para controlar
    console.log(newCart);
    console.log("Carrito creado correctamente.");
    // retorno el nuevo producto
    return newCart;
  };

  addProdToCart (cartId, id, quantity) {
    const cart = this.#carts.find((c) => c.id === cartId);
    if (!cart) return null;

    cart.products.find(p=>p.id===id) ? cart.products.find(p=>p.id===id).quantity += quantity : cart.products.push({id, quantity});

    this.saveToFile();

    return cart;
  }
  // // Método para modificar un producto
  // // updateProduct(id, updatedFields) {
  // //   const updateProduct = this.#products.find((p) => p.id === id);

  // //   if (!updateProduct) return null;

  // //   const updatedProduct = {
  // //     ...updateProduct,
  // //     ...updatedFields,
  // //     id: updateProduct.id
  // //   };

  // //   updateProduct = updatedProduct;

  // //   this.saveToFile();

  // //   return updateProduct;
  // // }
  // updateProduct(id, updatedFields){
  //   const productIndex = this.#products.findIndex(p =>p.id === id);
  //   if(productIndex === -1) return null;

  //   const updatedProduct = {
  //     ...this.#products[productIndex],
  //     ...updatedFields,
  //     id: this.#products[productIndex].id,
  //   };
  //   this.#products[productIndex] = updatedProduct;
  //   this.saveToFile();
  //   return updatedProduct;
  // }

  // // Método  para eliminar un producto de la lista.
  // deleteProductById(id) {
  //   const productIndex = this.#products.findIndex((p) => p.id === id);

  //   if (productIndex === -1) return null;

  //   const deletedProduct = this.#products.splice(productIndex, 1);

  //   this.saveToFile();

  //   return deletedProduct[0];
  // }
}
